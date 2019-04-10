var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});



router.get('/', function(req, res, next) {
	/* SQL Query */
	var sql_query = 'SELECT rname as "Name", rLocation as "Location", rrating as "Rating", opentime as "Opening Time", closetime as "Closing Time" FROM restaurants'
	pool.query(sql_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Restaurant table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', {
				title: 'View Table',
				data: data.rows,
				fields: data.fields,
				isLoggedIn: req.user ? true:false
			});
		}
	});
});

router.post('/', function(req, res, next) {
    /* SQL Query */
    var num_conditions = 0

    var search_rName = req.body.search_rName
    search_rName = search_rName.toLowerCase();
    var search_rRating = req.body.search_rRating;
    var search_rLocation = req.body.search_rLocation.toLowerCase();
    search_rLocation = search_rLocation.toLowerCase();
    var search_rTag = req.body.search_rTag;
    search_rTag = search_rTag.toLowerCase();

	var search_query = 'SELECT distinct rname as "Name", rLocation as "Location", rrating as "Rating", opentime as "Opening Time", closetime as "Closing Time" '
	 + ' FROM (restaurants r inner join cuisinetags ct ON r.rid = ct.rid) as r'
	if (search_rName === "") {
	} else {
	    search_query = search_query + " where LOWER(r.rname) like '%" + search_rName + "%'"
	    num_conditions++
	}

	if (search_rRating === "") {
	} else {
	    if (num_conditions == 0) {
	        search_query = search_query + " where r.rrating >= '" + search_rRating + "'"
	        num_conditions++
	    } else {
	        search_query = search_query + " and r.rrating >= '" + search_rRating + "'"
	        num_conditions++
	    }
	}

	if (search_rLocation === "") {
	} else {
	    if (num_conditions == 0) {
        	search_query = search_query + " where LOWER(r.rlocation) = '" + search_rLocation + "'"
        	num_conditions++
        } else {
            search_query = search_query + " and LOWER(r.rlocation) = '" + search_rLocation + "'"
            num_conditions++
        }
	}

	if (search_rTag === "") {
	} else {
	    if (num_conditions == 0) {
        	search_query = search_query + " where LOWER(r.tag) = '" + search_rTag + "'"
        	num_conditions++
        } else {
            search_query = search_query + " and LOWER(r.tag) = '" + search_rTag + "'"
            num_conditions++
        }
	}

	//search_query = search_query + ' group by rname'

	pool.query(search_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields});
		}
	});
});

module.exports = router;
