var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require("../db");

router.post('/',
	function(req, res) {
		console.log(req.body)
		db.checkUserExists(req.body.username, () => {
			res.render('login', {
				msg: "Username already taken",
				isError: true,
				isLoggedIn: req.user ? true : false
			});
		}, () => {
			var query = "insert into Customer (custid, custname, phone, points, username, pw) VALUES (default, '" + req.body.custname + "', " + req.body.phone * 1 + ", 0, '" +req.body.username+"', '"+req.body.password+"')"
			console.log(query)
			db.query(query, (err, data) => {
				if (err) {
					res.render('login', {
						msg: err,
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
