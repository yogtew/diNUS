const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
    checkUserExists: function(username, callIfTrue, callOtherwise) {
        var query = "select * from customers where username = '" + username + "'"
        pool.query(query, (err, data) => {
            if (err) return callOtherwise();
            if (!data) return callOtherwise();
            if (data.rows.length != 0) {
                return callIfTrue();
            } else {
                return callOtherwise();
            }
        })
    },
    test: function() {
        console.log("DB Test")
    },
    query: function(query, cb) {
        pool.query(query, cb)
    }
}
