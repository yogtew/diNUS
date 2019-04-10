var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

/* GET all the restaurants */
router.get('/', function(req, res, next) {
  // i want it to display the specific restaurant page when user selects a restaurant from like the dashboard
  var sql_query = 'select * from restaurants'
  pool.query(sql_query, (err, data) => {
        console.log(data);
  		if (err) {
  			res.render('error', {message: "Table \"" + req.query.table + "\" not found",
  			                     error: {status: "", stack: ""}})
  		} else {
  			res.render('restaurant', { title: 'restaurant', data: data.rows, fields: data.fields});
  		}
  	});
});

module.exports = router;
