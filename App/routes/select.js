var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});



router.get('/', function(req, res, next) {
	/* SQL Query */
	var sql_query = 'SELECT * FROM ' + req.query.table || "restaurants"
	pool.query(sql_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Table \"" + req.query.table + "\" not found", error: {status: "", stack: ""}})
		} else {
			res.render('select', { title: 'View Table', data: data.rows, fields: data.fields, test: 123 });
		}
	});
});

module.exports = router;
