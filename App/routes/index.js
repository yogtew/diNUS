/* GET home page. */
var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});


var query = "select table_name from information_schema.tables where table_schema = 'public';"
// var query = "select * from restaurants limit 3";
router.get('/', function(req, res, next) {
	pool.query(query, (err, data) => {
	    console.log(data)
		if (err) {
			res.render('error', {message: "Something went wrong", error: {status: "", stack: ""}})
		} else {
			res.redirect('login');
		}

	});
});

module.exports = router;
