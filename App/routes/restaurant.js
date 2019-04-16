var express = require('express');
var router = express.Router();
const db = require("../db")

const queries = require('../queries');

/* GET all the restaurants */
router.get('/', function(req, res, next) {
	// i want it to display the specific restaurant page when user selects a restaurant from the browse page
	var rid = req.query.rid
	db.query(queries.getRestaurantById, [rid], (err, data) => {
		// console.log(data);
		if (err || data.rowCount == 0) {
			res.render('error', {
				message: "restaurant not found",
				error: { status: "", stack: "" }
			})
			return;
		}

		db.query(queries.getAvgReservations, [data.rows[0].rid], (err, avgReservations) => {
			if (!db.handleError(err)) {
				db.query(queries.getMenu, [rid], (err, menu) => {
					if (!db.handleError(err)) {
						console.log(menu)
						var menuItems = menu.rows
						var finalItems = {}
				        for (var i in menuItems) {
				            var item = menuItems[i]
				            var fid = menuItems[i].foodid
				            if (!finalItems[fid])
				                finalItems[fid] = {
				                    name: item.foodname,
				                    price: item.price,
				                    tags: []
				                }
				           	finalItems[fid].tags.push(item.tagtype)
				        }
						res.render('restaurant', { title: 'restaurant', data: data.rows[0], fields: data.fields, avgData: avgReservations.rows, avgFields: avgReservations.fields, finalItems: finalItems });
					}
				})
			}
		})
	});
});

module.exports = router;
