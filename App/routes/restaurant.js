var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

const queries = require('../queries');

/* GET all the restaurants */
router.get('/', function(req, res, next) {
  // i want it to display the specific restaurant page when user selects a restaurant from the browse page
  var sql_query = 'select * from restaurant where rid = $1'
  pool.query(sql_query, [req.query.rid], (err, data) => {
        console.log(data);
  		if (err || data.rowCount == 0) {
  			res.render('error', {message: "Table \"" + req.query.table + "\" not found",
  			                     error: {status: "", stack: ""}})
  			return;
  		}

  		pool.query(queries.getAvgReservations, [data.rows[0].rid], (err, avgReservations) => {
  		    if (err) {
  		        res.render('error', {message: "Table \"" + req.query.table + "\" not found",
                  			                     error: {status: "", stack: ""}})
                  			return;
  		    }
  		    res.render('restaurant', { title: 'restaurant', data: data.rows[0], fields: data.fields, avgData: avgReservations.rows, avgFields: avgReservations.fields});

  		})
  	});
});

module.exports = router;
