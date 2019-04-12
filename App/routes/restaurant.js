var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

/* GET all the restaurants */
router.get('/', function(req, res, next) {
  // i want it to display the specific restaurant page when user selects a restaurant from the browse page
  var sql_query = 'select * from restaurant where rid = $1'
  pool.query(sql_query, [req.query.rid], (err, data) => {
        console.log(data);
  		if (err) {
  			res.render('error', {message: "Table \"" + req.query.table + "\" not found",
  			                     error: {status: "", stack: ""}})
  		} else {
  		    console.log(data);
  			res.render('restaurant', { title: 'restaurant', data: data.rows[0], fields: data.fields});
  		}
  	});
});

module.exports = router;
