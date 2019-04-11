var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

router.get('/', function(req, res, next) {
  	/* SQL Query */
          var sql_query = 'SELECT p.promoid as "Promo Number", r.rname as "Restaurant Name", p.discount as "Discount (%)" FROM promotion p inner join restaurant r on p.rid = r.rid'
          pool.query(sql_query, (err, data) => {
              if (err) {
                  res.render('error', {message: "Restaurant table not found", error: {status: "", stack: ""}})
              } else {
                  res.render('promotion', {
                      title: 'View Table',
                      data: data.rows,
                      fields: data.fields,
                      isLoggedIn: req.user ? true:false
                  });
              }
          });
});

module.exports = router;
