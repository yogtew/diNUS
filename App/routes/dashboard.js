var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});


/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res, next) {
	console.log(req)
    var uid = req.user.custid
    var user_query = "select * from customers where customers.custid = " + uid;
    pool.query(user_query, (err, user_data) => {
        console.log(user_data)
        if (err || user_data.rows.length == 0) {
            res.render("error", {
                message: "User " + uid + " not found",
                error: {status: "", stack: ""}
            });
        } else {
            var user = user_data.rows[0];
            var sql_query = 'SELECT Restaurants.rname, to_char(Reserves.restime, \'HH12:MI\') FROM Reserves natural join Restaurants where Reserves.custid = ' + uid
        	pool.query(sql_query, (err, data) => {
        		if (err) {
        			res.render('error', {message: "Table \"" + req.query.table + "\" not found", error: {status: "", stack: ""}})
        		} else {
                    console.log(data)
        			res.render('dashboard', {
                        title: 'View Table',
                        data: data.rows,
                        fields: data.fields,
                        username: user.name,
                        points: user.points,
						isLoggedIn: req.user ? true:false
                    });
        		}
        	});
        }
    })
});

module.exports = router;
