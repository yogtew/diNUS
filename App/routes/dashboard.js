var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});


/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res, next) {
	console.log(req);
    var uid = req.user.custid
    var user_query = "select * from customer where customer.custid = " + uid;
    pool.query(user_query, (err, user_data) => {
        console.log(user_data)
        if (err || user_data.rows.length == 0) {
            res.render("error", {
                message: "User " + uid + " not found",
                error: {status: "", stack: ""}
            });
        } else {
            console.log(req.query.table);
            var user = user_data.rows[0];
            var sql_query = 'SELECT Restaurant.rname as "Restaurant Name", to_char(Reserves.restime, \'HH12:MI\') as "Time", resid FROM Reserves natural join Restaurant where Reserves.custid = ' + uid
        	pool.query(sql_query, (err, reservations) => {
        		if (err) {
        			res.render('error', {message: "Table \"" + req.query.table + "\" not found", error: {status: "", stack: ""}})
        		} else {
					var pref_query = "select * from "
                    console.log(reservations.fields);
					// db.query()
        			res.render('dashboard', {
                        title: 'View Table',
                        data: reservations.rows,
                        fields: reservations.fields,
                        username: user.custname,
                        points: user.points,
						typePrefs: [],
						isLoggedIn: req.user ? true:false
                    });
        		}
        	});
        }
    })
});

router.post('/', function (req, res, next) {
    res.redirect('reservation-edit');

});

module.exports = router;
