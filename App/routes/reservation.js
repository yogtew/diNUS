var express = require('express');
var router = express.Router();

const {Pool} = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

var custid;

// GET
router.get('/', function (req, res, next) {
    custid = req.query.user;
    console.log(req.query.user);
    res.render('reservation', {title: 'Making Reservation'});
});

/*
--normal consideration:
-- opening hour:0800 closing hour:0000 (+2400) reservation time: 2300
--opening hour:0800 closing hour: 0400 (+2400) reservation time: 0300 (+2400)
select 1 from restaurants r
where 3 = r.rid
and (('0200'>= r.openTime and '0200'<= r.closeTime)
or ('0200'>= r.openTime and r.closeTime <= r.openTime and '0200' <= cast((cast(r.closeTime as integer) + 2400) as char(4)))
or('0200' <= r.openTime and r.closeTime <= r.openTime and cast((cast('0200' as integer) + 2400) as char(4)) <= cast((cast(r.closeTime as integer) + 2400) as char(4))));
 */
var check_query = "select 1 from restaurants r where ";
var insert_query = "insert into reserves (resid, restime, restpax, rid, custid) values ";


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var rname = req.body.rName;
    var resdate = req.body.resDate;
    var restime = req.body.resTime;
    var respax = req.body.resNum;


    //conversion of date and time into sql's date and time format yyyy-mm-dd
    var resdatetime = String(resdate).concat(" " + restime);
    console.dir(resdate);
    console.dir(restime);
    console.dir(resdatetime);
    restime = String(restime).replace(':', '');

    //rid_query checks if restaurant name can be found in existing restaurant table
    var rid_query = "select r.rid from restaurants r where r.rname = '" + rname + "';";
    console.log(rid_query);

    pool.query(rid_query, (err, rest_data) => {
        if(err) {
            res.render("error", {
                message: "Restaurant " + rname + " not found" + error,
                error: {status: "", stack: ""}
            });
        } else {
            var restaurant = rest_data.rows[0];
            var check_if_valid_timing_query = check_query + restaurant.rid + "= r.rid and (('" + restime + "'>= r.openTime and '" + restime + "'<= r.closeTime) or('"
    + restime + "'>= r.openTime and r.closeTime <= r.openTime and '" + restime + "'<= cast((cast(r.closeTime as integer) + 2400) as char(4))) or('"
    + restime + "'<= r.openTime and r.closeTime <= r.openTime and cast((cast('" + restime + "' as integer) + 2400) as char(4)) <= cast((cast(r.closeTime as integer) + 2400) as char(4))));";
            pool.query(check_if_valid_timing_query, (err, opening_hours_data) => {
                console.log(check_if_valid_timing_query);
    if(err || opening_hours_data.rows.length == 0) {
                 res.render("error", {
                     message: "Booking timing for " + rname + " not within opening hours." + err,
                    error: {status: "", stack: ""}
        });
    } else {
        //insert_into_reserves_query inserts into reserves table
        var insert_into_reserves_query = insert_query +  "(" + "DEFAULT, '" + resdatetime + "'," + respax + "," + restaurant.rid + "," + custid + ");";
        pool.query(insert_into_reserves_query, (err, data) => {
            console.log(insert_into_reserves_query);
        if (err) {
            res.render('error', {message: err, error: {status: "", cstack: ""}});
        } else {
            //res.redirect('/select?table=reserves')
            res.redirect('/dashboard?user=' + custid);
        }
        });
    }
    });

        }
    });
});

module.exports = router;