var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
const queries = require('../queries');

var data;
var fields;
var custid;
router.get('/', function(req, res, next) {
  	/* SQL Query */
            custid = req.user.custid;
          pool.query(queries.getPromotions, (err, returned_data) => {
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

    var check_promotion_query = "drop trigger if exists check_valid_promotion on promotion;\n create or replace function check_valid_promotion() returns trigger as $$ declare present integer; begin select 1 into present from Reserves res where res.rid = old.rid and res.restime > now()" + "and res.custid = " + custid
        + "; if present is null then raise exception 'You have not made a reservation for this restaurant, you cannot claim this promotion'; end if; return old; end; $$ language plpgsql; create trigger check_valid_promotion before delete on promotion for each row execute procedure check_valid_promotion();";

    pool.query(check_promotion_query, (err, data) => {
        console.log(check_promotion_query);
        if (err) {
            res.render("error", {
                message: err,
                error: { status: "", stack: "" }
            });
        } else {

            var delete_promotion_query = "delete from promotion where promoid = " + promoid + ";";
            pool.query(delete_promotion_query, (err, data) => {
                console.log(delete_promotion_query);
            if (err) {
                res.render('reservation',
                    {
                        title: 'Making Reservation',
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
        })
            ;
        }});
});





module.exports = router;
