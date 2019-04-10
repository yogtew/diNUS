var express = require('express');
var router = express.Router();
var db = require('../db')


/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res, next) {
	console.log(req)
    var uid = req.user.custid
    var user_query = "select * from customers where customers.custid = " + uid;
    db.query(user_query, (err, user_data) => {
        console.log(user_data)
        if (err || user_data.rows.length == 0) {
            res.render("error", {
                message: "User " + uid + " not found",
                error: {status: "", stack: ""}
            });
        } else {
            var user = user_data.rows[0];
            var res_query = 'SELECT Restaurants.rname, to_char(Reserves.restime, \'HH12:MI\') FROM Reserves natural join Restaurants where Reserves.custid = ' + uid
        	db.query(res_query, (err, reservations) => {
        		if (err) {
        			res.render('error', {message: "Table \"" + req.query.table + "\" not found", error: {status: "", stack: ""}})
        		} else {
					var pref_query = "select * from "
					// db.query()
        			res.render('dashboard', {
                        title: 'View Table',
                        data: reservations.rows,
                        fields: reservations.fields,
                        username: user.name,
                        points: user.points,
						typePrefs: typePrefs,
						isLoggedIn: req.user ? true:false
                    });
        		}
        	});
        }
    })
});

module.exports = router;
