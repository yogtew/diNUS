var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});



router.get('/', function(req, res, next) {
	/* SQL Query */
	var sql_query = 'SELECT * FROM restaurants'
	pool.query(sql_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Restaurant table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields});
		}
	});
});

router.post('/', function(req, res, next) {
    /* SQL Query */
    var s_rName = req.body.s_rName;
	var rName_query = "SELECT * FROM restaurants r where r.rname = '" + s_rName + "';"
	pool.query(rName_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Restaurant table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields});
		}
	});
});

module.exports = router;
