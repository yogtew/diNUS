/*
TODO: make error message more apparent, highlight field that is incorrect
TODO: non-trivial trigger
TODO: add opening hours in error message when inputted is non-opening hours
 */
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
    res.render('reservation',
        {title: 'Making Reservation',
            displayErrorMsg: false,
            message:"",
            defaultrName: "",
            defaultresDate: "",
            defaultresTime: "",
            defaultresNum: ""
        });
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

/*
select rt.tableid
from rtable rt
where rt.rid = 1
and rt.tableid not in(
	select distinct r.tableid
	from reserves r
	where r.restime = '2019-03-19 18:00:00'
	and r.rid = 1
)
limit 1;
 */
var tableid_query = "select rt.tableid from rtable rt where rt.rid = ";
var insert_query = "insert into reserves values ";


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
    editedrestime = String(restime).replace(':', '');

    // change rname to lower case
    lowerrname = String(rname).toLowerCase();

    //rid_query checks if restaurant name can be found in existing restaurant table
    var rid_query = "select r.rid from restaurants r where LOWER(r.rname) = '" + lowerrname + "';";
    console.log(rid_query);

    pool.query(rid_query, (err, rest_data) => {
        console.log(err);
        if(err || rest_data.rows.length == 0) {
        res.render('reservation', {
            displayErrorMsg: true,
            message: "Restaurant " + rname + " does not exist",
            defaultrName: "",
            defaultresDate: resdate,
            defaultresTime: restime,
            defaultresNum: respax
        });
        } else {
            var restaurant = rest_data.rows[0];
    //check_if_valid_timing_query checks if inserted time is within opening hours
    var check_if_valid_timing_query = check_query + restaurant.rid + "= r.rid and (('" + editedrestime + "'>= r.openTime and '" + editedrestime + "'<= r.closeTime) or('"
        + editedrestime + "'>= r.openTime and r.closeTime <= r.openTime and '" + editedrestime + "'<= cast((cast(r.closeTime as integer) + 2400) as char(4))) or('"
        + editedrestime + "'<= r.openTime and r.closeTime <= r.openTime and cast((cast('" + editedrestime + "' as integer) + 2400) as char(4)) <= cast((cast(r.closeTime as integer) + 2400) as char(4))));";
    pool.query(check_if_valid_timing_query, (err, opening_hours_data) => {
        console.log(check_if_valid_timing_query);
    if (err || opening_hours_data.rows.length == 0) {
        res.render("reservation", {
            displayErrorMsg: true,
            message: "Booking timing for " + rname + " not within opening hours.",
            defaultrName: rname,
            defaultresDate: resdate,
            defaultresTime: "",
            defaultresNum: respax
        });
    } else {
        //get_table_id_query returns the first tableid that is available for the new booking
        var get_table_id_query = tableid_query + restaurant.rid + " and rt.tableid not in (select distinct r.tableid from reserves r"
        + " where r.restime = '" + resdatetime +"' and r.rid = " + restaurant.rid + ") limit 1;"
        pool.query(get_table_id_query, (err, table_data) => {
            console.log(get_table_id_query);
        if (err || table_data.rows.length == 0) {
            res.render('reservation', {
                displayErrorMsg: true,
                message: "Booking for " + rname + " at " + resdatetime + " is full. Enter in another timing",
                defaultrName: rname,
                defaultresDate: resdate,
                defaultresTime: "",
                defaultresNum: respax
                });
        } else {
            var table = table_data.rows[0];
            //insert_into_reserves_query inserts into reserves table
            var insert_into_reserves_query = insert_query + "(" + "DEFAULT, '" + resdatetime + "'," + respax + "," + table.tableid + "," + restaurant.rid + "," + custid + ");";
            pool.query(insert_into_reserves_query, (err, data) => {
                console.log(insert_into_reserves_query);
            if (err) {
                res.render('error', {message: err, error: {status: "", cstack: ""}});
            } else {
                //res.redirect('/select?table=reserves')
                res.redirect('/dashboard?user=' + custid);
            }
        })
            ;
        }
    })
        ;

    }
})
    ;
}
});
});

module.exports = router;