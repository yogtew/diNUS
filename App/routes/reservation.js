/*
TODO: Add test data.,
TODO: Interesting query to show another franchise is available at that timing
TODO: Interesting query to find the next available timing for the particular outlet
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
    custid = req.user.custid;
    res.render('reservation',
        {title: 'Making Reservation',
            displayErrorMsg: false,
            displayAlternatives: false,
            message:"",
            defaultrName: "",
            defaultresDate: "",
            defaultresTime: "",
            defaultresNum: "",
            defaultcardid: ""
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
var check_query = "select 1 from restaurant r where ";

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

/*
with sameRestaurantOpeningHours as(
	select substring(closeTime from 1 for 2) || ':' || substring(closeTime from 3 for 2)
	from OpeningHours
	where rid = 7
), sameRestaurantNextAvaiableTime as (
select (select r.rname from Restaurant r where r.rid = res.rid), res.restime + interval '1h'
from Reserves res
where res.rid = 7
and res.restime >= '2019-03-19 19:30:00'
and res.restime <= '2019-03-19 23:30:00'
and exists (
		select 1
		from RTable rt
		where rt.rid = res.rid
		and rt.tableid = res.tableid
		and rt.numSeats >= 2
		and rt.tableid not in(
		select distinct res1.tableid
		from reserves res1
		where (res1.restime <= cast(res.restime as timestamp) + interval '1h'
		and cast(res1.restime as timestamp) + interval '1h' > cast(res.restime as timestamp) + interval '1h')
		or (res1.restime >  cast(res.restime as timestamp) + interval '1h'
		and cast(res1.restime as timestamp) - interval '1h' <= cast(res.restime as timestamp) + interval '1h')
		and res1.rid = res.rid
		)
		)),
franchisedRestaurants as(
	select r.rid
	from Restaurant r
	where r.franchiseid = (select r2.franchiseid from Restaurant r2 where r2.rid = 7)
),
franchisedRestaurantSameTime as (
	select r.rname, cast('2019-03-19 19:30:00' as timestamp)
	from Restaurant r
	where r.rid in (select * from franchisedRestaurants)
	and exists (
		select 1
		from RTable rt
		where rt.rid = r.rid
		and rt.numSeats >= 2
		and (r.rid not in(select res1.rid from Reserves res1)
		or rt.tableid not in(
		select distinct res.tableid
		from reserves res
		where (res.restime <= '2019-03-19 19:30:00'
		and cast(res.restime as timestamp) + interval '1h' > '2019-03-19 19:30:00')
		or (res.restime >  '2019-03-19 19:30:00'
		and cast(res.restime as timestamp) - interval '1h' <= '2019-03-19 19:30:00')
		and r.rid = res.rid))
		)
	)
select *
from franchisedRestaurantSameTime
union
select *
from sameRestaurantNextAvaiableTime;
 */

var get_franchise_restaurants = "with franchisedRestaurants as(select r.rid from Restaurant r where r.franchiseid = (select r2.franchiseid from Restaurant r2 where r2.rid = ";
var check_franchise_query = ")), franchisedRestaurantSameTime as (select r.rname, cast('";
var check_franchise_query2 = "' as timestamp)from Restaurant r where r.rid in (select * from franchisedRestaurants) and exists (select 1 from RTable rt where rt.rid = r.rid and rt.numSeats >=";
var check_franchise_query3 = " and (r.rid not in(select res1.rid from Reserves res1) or rt.tableid not in( select distinct res.tableid from reserves res where (res.restime <= '";
var check_franchise_query4 = "' and cast(res.restime as timestamp) + interval '1h' > '";
var check_franchise_query5 = "') or (res.restime >  '";
var check_franchise_query6 = "' and cast(res.restime as timestamp) - interval '1h' <= '";
var check_franchise_query7 = "') and r.rid = res.rid))))\n" +
    "select *\n" +
    "from franchisedRestaurantSameTime;";


var insert_query = "insert into reserves (resid, cardid, restime,respax, rid, custid) values";
var openTime_query = "(select openTime from openingHours where dayInWeek = ";
var closeTime_query = "(select closeTime from openingHours where dayInWeek = ";
var cardid_query = "select 1 from PaymentMode pm where pm.cardid = '";

// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var rname = req.body.rName;
    var resdate = req.body.resDate;
    var restime = req.body.resTime;
    var respax = req.body.resNum;
    var cardid = req.body.cardid;


    //conversion of date and time into sql's date and time format yyyy-mm-dd
    var resdatetime = String(resdate).concat(" " + restime);
    console.dir(resdate);
    console.dir(restime);
    console.dir(resdatetime);
    editedrestime = String(restime).replace(':', '');

    // change rname to lower case
    lowerrname = String(rname).toLowerCase();

    //rid_query checks if restaurant name can be found in existing restaurant table
    var rid_query = "select * from restaurant r where LOWER(r.rname) = '" + lowerrname + "';";
    console.log(rid_query);

    pool.query(rid_query, (err, rest_data) => {
        console.log(err);
        if(err || rest_data.rows.length == 0) {
        res.render('reservation', {
            displayErrorMsg: true,
            displayAlternatives: false,
            message: "Restaurant " + rname + " does not exist",
            defaultrName: "",
            defaultresDate: resdate,
            defaultresTime: restime,
            defaultresNum: respax,
            defaultcardid: cardid
        });
        } else {
            var restaurant = rest_data.rows[0];
            var date = new Date(resdate);
            console.log(date.getDay());

            check_open_time_query = openTime_query + date.getDay() + " and rid = " + restaurant.rid + ")";
            console.log(check_open_time_query);
            check_close_time_query = closeTime_query + date.getDay() + " and rid = " + restaurant.rid + ")";
            console.log(check_close_time_query);


            var check_if_valid_timing_query = check_query + restaurant.rid + "= r.rid and (('" + editedrestime + "'>= " + check_open_time_query + " and '" + editedrestime + "'<= " + check_close_time_query + ") or('"
                + editedrestime + "'>= " + check_open_time_query + " and " + check_close_time_query +" <= " + check_open_time_query +  " and '" + editedrestime + "'<= cast((cast(" + check_close_time_query + " as integer) + 2400) as char(4))) or('"
                + editedrestime + "'<= " + check_open_time_query + " and " + check_close_time_query + " <= " + check_open_time_query + " and cast((cast('" + editedrestime + "' as integer) + 2400) as char(4)) <= cast((cast(" + check_close_time_query + " as integer) + 2400) as char(4))));";

            //check_if_valid_timing_query checks if inserted time is within opening hours
    console.log(check_if_valid_timing_query);
    pool.query(check_if_valid_timing_query, (err, opening_hours_data) => {
        console.log(check_if_valid_timing_query);
    if (err || opening_hours_data.rows.length == 0) {
        res.render("reservation", {
            displayErrorMsg: true,
            displayAlternatives: false,
            message: "Booking timing for " + rname + " not within opening hours.",
            defaultrName: rname,
            defaultresDate: resdate,
            defaultresTime: "",
            defaultresNum: respax,
            defaultcardid: cardid
        });
    } else {
            //insert_into_reserves_query inserts into reserves table
            var check_valid_card_id_query = cardid_query + cardid + "' and pm.custid = " + custid + ";";
            console.log(check_valid_card_id_query);
            pool.query(check_valid_card_id_query, (err, card_id_data) => {
            if (isNaN(custid) || err || card_id_data.rows.length == 0) {
                    res.render('reservation', {
                    displayErrorMsg: true,
                    displayAlternatives: false,
                    message: "Your card details are wrong, please fill up again. Ensure that the card ID is one entered in your user Preferences." + err,
                    defaultrName: rname,
                    defaultresDate: resdate,
                    defaultresTime: restime,
                    defaultresNum: respax,
                    defaultcardid: ""
            });
            } else {
                //res.redirect('/select?table=reserves')
                var insert_into_reserves_query = insert_query + "(" + "DEFAULT, '" + cardid + "','" + resdatetime + "'," + respax + "," + restaurant.rid + "," + custid + ");";
                console.log(insert_into_reserves_query);
                pool.query(insert_into_reserves_query, (err, data) => {
                if (err ) {

                    var check_alternative_reserves_query = get_franchise_restaurants + restaurant.rid + check_franchise_query + resdatetime + check_franchise_query2 + respax + check_franchise_query3 + resdatetime + check_franchise_query4 + resdatetime + check_franchise_query5 + resdatetime + check_franchise_query6 + resdatetime + check_franchise_query7;
                    console.log(check_alternative_reserves_query);
                    pool.query(check_alternative_reserves_query, (err, data) => {
                        if (err || data.rows.length == 0) {
                        res.render('reservation', {
                            displayErrorMsg: true,
                            displayAlternatives: false,
                            message: "Booking is already full at " + resdatetime + ", for restaurant " + restaurant.rname,
                            defaultrName: rname,
                            defaultresDate: resdate,
                            defaultresTime: "",
                            defaultresNum: respax,
                            defaultcardid: cardid
                        });
                    } else {
                        res.render('reservation', {
                            displayErrorMsg: true,
                            displayAlternatives: true,
                            message: "Booking is already full at " + resdatetime + ", for restaurant " + restaurant.rname,
                            defaultrName: rname,
                            defaultresDate: resdate,
                            defaultresTime: "",
                            defaultresNum: respax,
                            defaultcardid: cardid,
                            title: 'Alternative reservations',
                            data: data.rows,
                            fields: data.fields
                        });
                    }
                    });


                } else {
                    res.redirect('/dashboard');

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