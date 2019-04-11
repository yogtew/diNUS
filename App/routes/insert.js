var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/*SQL Query */
var sql_query = 'INSERT INTO Restaurants (rname) VALUES ';

// GET
router.get('/', function(req, res, next) {
    res.render('insert', { title: 'Modifying Database' });
});

// POST
router.post('/', function(req, res, next) {
    // Retrieve Information
    var rName  = req.body.rName;
    var resTime = req.body.resTime;
    var resNum = req.body.resNum;

    // Construct Specific SQL Query
    var insert_query = sql_query + "('" + rName + "');";

    pool.query(insert_query, (err, data) => {
        console.log(insert_query);
        if (err) {
            res.render('error', {
                message: err,  error: {status: "", cstack: ""}
            })
        } else {
            res.redirect('/users');
    }
});
});


module.exports = router;
