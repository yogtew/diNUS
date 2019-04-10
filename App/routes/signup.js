var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require("../db");

router.post('/',
	function(req, res) {
		console.log(req.body)
		console.log(req.body)
		db.checkUserExists(req.body.username, () => {
			res.render('login', {
				msg: "Username already taken",
				isError: true,
				isLoggedIn: req.user ? true : false
			});
		}, () => {
			var query = "insert into Customers (name, phone, points, username, password) VALUES ('" + req.body.custname + "', " + req.body.phone * 1 + ", 0, '" +req.body.username+"', '"+req.body.password+"')"
			db.query(query, (err, data) => {
				if (err) {
					res.render('login', {
						msg: "Error: " + err,
						isError: true,
						isLoggedIn: req.user ? true : false
					});
				} else {
					res.render('login', {
						msg: "Successfully created account " + req.body.username,
						isError: false,
						isLoggedIn: req.user ? true : false
					});
				}
			})
		});
	});

module.exports = router;
