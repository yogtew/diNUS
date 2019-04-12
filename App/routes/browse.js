var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
const queries = require('../queries');

router.get('/', function(req, res, next) {
    if (req.user && !(req.query.usePref && req.query.usePref == "false")) {
        var uid = req.user.custid
        pool.query(queries.browseBasedonUserPreference, [uid], (err, data) => {
                    if (err) {
                        res.render('error', {message: "Restaurant table not found 1" + err, error: {status: "", stack: ""}})
                    } else {
                        res.render('browse', {
                            title: 'View Table',
                            data: data.rows,
                            fields: data.fields,
                            isLoggedIn: req.user ? true:false
                        });
                    }
                });
    } else {
	/* SQL Query */
        pool.query(queries.browseAll, (err, data) => {
            if (err) {
                res.render('error', {message: "Restaurant table not found 2", error: {status: "", stack: ""}})
            } else {
                res.render('browse', {
                    title: 'View Table',
                    data: data.rows,
                    fields: data.fields,
                    isLoggedIn: req.user ? true:false
                });
            }
        });
    }
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
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields, isLoggedIn: req.user ? true:false});
		}
	});
});

module.exports = router;
