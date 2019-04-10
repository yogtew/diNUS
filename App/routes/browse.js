var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});



router.get('/', function(req, res, next) {
	/* SQL Query */
	var sql_query = 'SELECT distinct rname as "Name", rLocation as "Location", rRating as "Rating" FROM restaurant r'
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
    var num_conditions = 0
    var search_rName = req.body.search_rName
    search_rName = search_rName.toLowerCase();
    var search_rRating = req.body.search_rRating;
    var search_rLocation = req.body.search_rLocation.toLowerCase();
    search_rLocation = search_rLocation.toLowerCase();

    /* SQL Query */
	var search_query = 'SELECT distinct rname as "Name", rLocation as "Location", rrating as "Rating" FROM restaurant r'
	if (search_rName === "") {
	} else {
	    search_query = search_query + " where LOWER(r.rname) like '%" + search_rName + "%'"
	    num_conditions++
	}

	if (search_rRating === "") {
	} else {
	    if (num_conditions == 0) {
	        search_query = search_query + " where"
	    } else {
	        search_query = search_query + " and"
	    }
	    search_query = search_query + " r.rrating >= '" + search_rRating + "'"
	    num_conditions++
	}

	if (search_rLocation === "") {
	} else {
	    if (num_conditions == 0) {
	        search_query = search_query + " where"
	    } else {
	        search_query = search_query + " and"
	    }
	    search_query = search_query + " LOWER(r.rlocation) = '" + search_rLocation + "'"
        num_conditions++
	}

	pool.query(search_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields});
		}
	});
});

module.exports = router;
