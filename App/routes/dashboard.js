var express = require('express');
var router = express.Router();

const db = require('../db');
const queries = require('../queries');

/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res, next) {
	var uid = req.user.custid
	db.query(queries.getUserById, [uid.toString()], (err, user_data) => {
		if (err || user_data.rows.length == 0) {
			res.render("error", {
				message: "User " + uid + " not found" + err,
				error: { status: "", stack: "" }
			});
		} else {
			var user = user_data.rows[0];
			db.query(queries.getReservations, [uid.toString()], (err, reservations) => {
				if (err) {
					res.render('error', { message: "Table \"" + req.query.table + "\" not found" + err, error: { status: "", stack: "" } })
				} else {
					db.query(queries.getCombinedFoodPreferences, [user.custid.toString()], (err, foodPrefs) => {
						db.query(queries.getCombinedLocPreferences, [user.custid.toString()], (err, locationPrefs) => {
							// console.log(locationPrefs)
                            db.query(queries.getCardNo, [uid], (err, data) => {
                                if (handleError(err, res)) return;
                                var cardNo = data.rows[0].cardid
                                res.render('dashboard', {
                                    title: 'View Table',
                                    data: reservations.rows,
                                    fields: reservations.fields,
                                    username: user.custname,
                                    points: user.points,
                                    foodPrefs: foodPrefs.rows,
                                    locPrefs: locationPrefs.rows,
                                    storedNo: cardNo,
                                    isLoggedIn: req.user ? true : false
                                });
                            })

						})
					});
				}
			});
		}
	})
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	var foodTags = [];
	var locTags = [];
	for (var i in req.body) {
		var key = i.substr(0, 3)
		if (key == "tag")
			foodTags.push(i.substr(3))
		if (key == "loc")
			locTags.push(i.substr(3))
	}

	if (!req.user) {
		res.redirect("login");
		return;
	}

	var cardNo = req.body.cardNo;

	var uid = req.user.custid.toString();
	db.query(queries.clearFoodPrefsForUser, [uid], (err, data) => {
		if (handleError(err, res)) return;
		var foodPrefs = [];
		foodTags.forEach(x => {
			foodPrefs.push(uid)
			foodPrefs.push(x)
		})
		console.log(queries.setFoodPrefsForUser + expand(foodTags.length, 2), foodPrefs)
		db.queryOrPass(foodTags.length > 0, queries.setFoodPrefsForUser + expand(foodTags.length, 2), foodPrefs, (err, data) => {
			if (handleError(err, res)) return;
			db.query(queries.clearLocPrefsForUser, [uid], (err, data) => {
				if (handleError(err, res)) return;
				var locPrefs = [];
				locTags.forEach(x => {
					locPrefs.push(uid)
					locPrefs.push(x)
				})
				console.log(queries.setLocPrefsForUser + expand(locTags.length, 2), locPrefs)
				db.queryOrPass(locTags.length > 0, queries.setLocPrefsForUser + expand(locTags.length, 2), locPrefs, (err, data) => {
					if (handleError(err, res)) return;
					    console.log(queries.updateCardNoForUser, [cardNo,uid])
                        db.query(queries.updateCardNoForUser, [cardNo,uid], (err, data) => {
                            console.log(foodPrefs, locPrefs)
                            res.redirect("dashboard");
                        })
				})
			})
		})
	})
});

function expand(x, y) {
	var index = 1;
	var out = [];
	for (var i = 0; i < x; i++) {
		out.push([])
		for (var j = 0; j < y; j++) {
			out[i].push(index++);
		}
	}
	return out.map(x => "(" + x.map(x => "$" + x).join(", ") + ")").join(", ");
}

function handleError(err, res) {
	if (err) {
		res.render("error", { message: err, error: {} })
		return true;
	}
	return false;
}

module.exports = router;
