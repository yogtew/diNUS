const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

function verify(username, password, cb) {
    var query = "select * from customer where username = '" + username + "'";
    pool.query(query, (err, user_data) => {
        if (err) {
            return cb(err)
        }
        if (user_data == false) {
            return cb(null, false);
        }
        return cb(null, user_data);
    })
}

module.exports = {verify: verify}
