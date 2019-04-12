var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});



router.get('/', function(req, res, next) {
    if (req.user && !(req.query.usePref && req.query.usePref == "false")) {
        var uid = req.user.custid
        var user_query =
        'with RestaurantMenu as (select r.rid, r.rname, r.rrating, r.rlocation, m.foodid from Restaurant r inner join Menu m on r.rid = m.rid), ' +
        'RestaurantMenuTags as (select rm.rid, rm.rname, rm.rrating, rm.rlocation, rm.foodid, t.tagid from RestaurantMenu rm inner join Tags t on rm.foodid = t.foodid), ' +
        'RestaurantMenuTagsTagType as (select rmt.rid, rmt.rname, rmt.rrating, rmt.rlocation, rmt.foodid, rmt.tagid, tt.tagtype from RestaurantMenuTags rmt inner join TagType tt on rmt.tagid = tt.tagid), ' +
        'RestaurantTagTypeCount as (select rid, rname, rlocation, tagtype, count(*) from RestaurantMenuTagsTagType group by rid, rname, rlocation, tagtype order by count(*) desc), ' +
        'RestaurantFilteredForLocation as (select * from RestaurantTagTypeCount a where a.rlocation in (select plocation from LocationPreferences where custid=' + uid + ')), ' +
        'CustFoodPreference as (select custid, fp.tagid, tagtype from FoodPreferences fp inner join TagType tt on (fp.custid=' + uid + ' and fp.tagid = tt.tagid))' +
        'select rname as "Name", rlocation as "Location", tagtype as "Tag", count as "No. of Items" from RestaurantFilteredForLocation b where b.tagtype  in (select tagtype from CustFoodPreference where custid=' + uid + ')'
        pool.query(user_query, (err, data) => {
                    if (err) {
                        res.render('error', {message: "Restaurant table not found 1" + err, error: {status: "", stack: ""}})
                    } else {
                        res.render('browse', {
                            title: 'View Table',
                            data: data.rows,
                            fields: data.fields,
                            isLoggedIn: req.user ? true:false
                        });
                    }
                });
    } else {
	/* SQL Query */
        var sql_query = 'SELECT distinct rname as "Name", rLocation as "Location", rRating as "Rating", rid FROM restaurant r'
        pool.query(sql_query, (err, data) => {
            if (err) {
                res.render('error', {message: "Restaurant table not found 2", error: {status: "", stack: ""}})
            } else {
                res.render('browse', {
                    title: 'View Table',
                    data: data.rows,
                    fields: data.fields,
                    isLoggedIn: req.user ? true:false
                });
            }
        });
    }
});

router.post('/', function(req, res, next) {
    var num_conditions = 0
    var search_rName = req.body.search_rName
    search_rName = search_rName.toLowerCase();
    var search_rRating = req.body.search_rRating;
    var search_rLocation = req.body.search_rLocation.toLowerCase();
    search_rLocation = search_rLocation.toLowerCase();

    /* SQL Query */
	var search_query = 'SELECT distinct rname as "Name", rLocation as "Location", rrating as "Rating" FROM restaurant r'
	if (search_rName === "") {
	} else {
	    search_query = search_query + " where LOWER(r.rname) like '%" + search_rName + "%'"
	    num_conditions++
	}

	if (search_rRating === "") {
	} else {
	    if (num_conditions == 0) {
	        search_query = search_query + " where"
	    } else {
	        search_query = search_query + " and"
	    }
	    search_query = search_query + " r.rrating >= '" + search_rRating + "'"
	    num_conditions++
	}

	if (search_rLocation === "") {
	} else {
	    if (num_conditions == 0) {
	        search_query = search_query + " where"
	    } else {
	        search_query = search_query + " and"
	    }
	    search_query = search_query + " LOWER(r.rlocation) = '" + search_rLocation + "'"
        num_conditions++
	}

	pool.query(search_query, (err, data) => {
		if (err) {
			res.render('error', {message: "Table not found", error: {status: "", stack: ""}})
		} else {
			res.render('browse', { title: 'View Table', data: data.rows, fields: data.fields, isLoggedIn: req.user ? true:false});
		}
	});
});

module.exports = router;
