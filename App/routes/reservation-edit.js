/*
TODO: Interesting query to show another franchise is available at that timing
TODO: Interesting query to find the next available timing for the particular outlet
 */
var express = require('express');
var router = express.Router();

const {Pool} = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});



// GET
var custid;
var resid;
router.get('/', function (req, res, next) {
    custid = req.user.custid;
    console.log("custid" + custid);
    resid = req.query.resid;

    var get_reservation_query = "select r.rname, res.restime, res.respax, res.cardid from Reserves res inner join Restaurant r on r.rid = res.rid where res.resid = " + resid + ";";
    console.log(get_reservation_query);
    pool.query(get_reservation_query, (err, data) => {

        var oldresdatetime = new Date(data.rows[0][data.fields[1].name]);
        console.log(data.rows[0][data.fields[1].name]);

        var dd = oldresdatetime.getDate();
        var mm = oldresdatetime.getMonth()+1; //January is 0!
        var yyyy = oldresdatetime.getFullYear();
        if(dd<10){
        dd='0'+dd
        }
        if(mm<10){
        mm='0'+mm
        }
        var resdate = yyyy+'-'+mm+'-'+dd;
        var minutes = oldresdatetime.getMinutes();
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        var restime = oldresdatetime.getHours() + ':' + minutes;
        console.log(resdate);
        console.log(restime);
        res.render('reservation-edit',
        {title: 'Editing Reservation',
            displayErrorMsg: false,
            message:"",
            defaultrName: data.rows[0][data.fields[0].name],
            defaultresDate: resdate,
            defaultresTime: restime,
            defaultresNum: data.rows[0][data.fields[2].name],
            defaultcardid: data.rows[0][data.fields[3].name]
        });

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

var update_query = "update Reserves set rid = ";
var delete_query = "delete from Reserves where resid = ";
var openTime_query = "(select openTime from openingHours where dayInWeek = ";
var closeTime_query = "(select closeTime from openingHours where dayInWeek = ";
var cardid_query = "select 1 from PaymentMode pm where pm.cardid = '";

// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var clicked = req.body.choice;
    var rname = req.body.rName;
    var resdate = req.body.resDate;
    var restime = req.body.resTime;
    var respax = req.body.resNum;
    var cardid = req.body.cardid;

    if (clicked === "delete") {
        delete_reservation = delete_query + resid + ";";
        pool.query(delete_reservation, (err, rest_data) => {

            if (err) {
                res.render("error", {
                    message: "Reservation cannot be deleted." ,
                    error: {status: "", stack: ""}
                });
            }  else {
                res.redirect('/dashboard');
            }


        });
    } else {


        console.log(clicked);
        console.log("custid" + custid);
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
        if (err || rest_data.rows.length == 0) {
            res.render('reservation-edit', {
                displayErrorMsg: true,
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
                + editedrestime + "'>= " + check_open_time_query + " and " + check_close_time_query + " <= " + check_open_time_query + " and '" + editedrestime + "'<= cast((cast(" + check_close_time_query + " as integer) + 2400) as char(4))) or('"
                + editedrestime + "'<= " + check_open_time_query + " and " + check_close_time_query + " <= " + check_open_time_query + " and cast((cast('" + editedrestime + "' as integer) + 2400) as char(4)) <= cast((cast(" + check_close_time_query + " as integer) + 2400) as char(4))));";

            //check_if_valid_timing_query checks if inserted time is within opening hours
            console.log(check_if_valid_timing_query);
            pool.query(check_if_valid_timing_query, (err, opening_hours_data) => {
                console.log(check_if_valid_timing_query);
            if (err || opening_hours_data.rows.length == 0) {
                res.render("reservation-edit", {
                    displayErrorMsg: true,
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
                    if(isNaN(custid) || err || card_id_data.rows.length == 0
            )
                {
                    res.render('reservation-edit', {
                        displayErrorMsg: true,
                        message: "Your card details are wrong, please fill up again",
                        defaultrName: rname,
                        defaultresDate: resdate,
                        defaultresTime: restime,
                        defaultresNum: respax,
                        defaultcardid: ""
                    });
                }
            else
                {
                    //res.redirect('/select?table=reserves')
                    var update_reservation_query = update_query + restaurant.rid + ", restime = '" + resdatetime + "', respax = " + respax + ", cardid = " + cardid
                        + " where resid = " + resid + ";";
                    console.log(update_reservation_query);
                    pool.query(update_reservation_query, (err, data) => {
                        if(err) {
                            res.render('reservation-edit', {
                                displayErrorMsg: true,
                                message: "Booking is already full at " + resdatetime + ", for restaurant " + restaurant.rname,
                                defaultrName: rname,
                                defaultresDate: resdate,
                                defaultresTime: "",
                                defaultresNum: respax,
                                defaultcardid: cardid
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
    })
        ;
    }
});

module.exports = router;
