var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

var data;
var fields;
router.get('/', function(req, res, next) {
  	/* SQL Query */
          var sql_query = 'SELECT p.promoid as "Promo Number", r.rname as "Restaurant Name", p.discount as "Discount (%)" FROM promotion p inner join restaurant r on p.rid = r.rid'
          pool.query(sql_query, (err, returned_data) => {
                  data = returned_data.rows;
                  fields = returned_data.fields;
                  console.log(data.fields);
                  res.render('promotion', {
                      title: 'View Table',
                      data: returned_data.rows,
                      fields: returned_data.fields,
                      isLoggedIn: req.user ? true:false,
                      message: "hi"
                  });
          });
});


router.post('/', function (req, res, next) {
    var promoid = req.body.promoid;
    console.log("Promoid" + promoid);

    var delete_promotion_query = "delete from promotion where promoid = " + promoid + ";";
    pool.query(delete_promotion_query, (err, data) => {
        console.log(delete_promotion_query);
        if(err){
            res.render('reservation',
                {title: 'Making Reservation',
                    displayDetailedErrorMsg: false,
                    displayErrorMsg: true,
                    displayAlternatives: false,
                    message: err,
                    defaultrName: "",
                    defaultresDate: "",
                    defaultresTime: "",
                    defaultresNum: "",
                    defaultcardid: ""
                });
        } else {
            res.redirect('/promotion');
        }
        });
    });




module.exports = router;
