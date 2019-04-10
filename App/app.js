var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
require('dotenv').load();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
var selectRouter = require('./routes/select');
var formsRouter = require('./routes/forms');
var insertRouter = require('./routes/insert');

var restaurantRouter = require('./routes/restaurant');
var dashboardRouter = require('./routes/dashboard');
var browseRouter = require('./routes/browse');
var reservationRouter = require('./routes/reservation');
var restaurantAdminRouter = require('./routes/restaurantAdmin');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

passport.use(new Strategy(
    function (username, password, cb) {
        console.log("user logging in with ", username, password)
        var query = "select * from customer where username = '" + username + "'";
        pool.query(query, (err, user_data) => {
            console.log("query result", err, user_data)
            if (err) {
                // error
                return cb(err)
            }
            if (user_data == false || user_data.rows.length == 0) {
                // no such user
                return cb(null, false);
            }

            var user = user_data.rows[0]
            if (password != user.pw) return cb(null, false)
            return cb(null, user);
        })
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.custid);
    // cb(null, user.custid);
});

passport.deserializeUser(function(id, cb) {
    // return cb(null, id);
    var query = "select * from customer where custid = '" + id + "'";
    pool.query(query, (err, user_data) => {
        console.log("query result", err, user_data.rows)
        if (err) {
            // error
            return cb(err)
        }
        if (user_data == false || user_data.rows.length == 0) {
            // no such user
            return cb(null, false);
        }
        return cb(null, user_data.rows[0]);
    })
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'cs2102', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
app.use('/select*', selectRouter);
app.use('/forms', formsRouter);
app.use('/restaurant', restaurantRouter);
app.use('/dashboard', dashboardRouter);
app.use('/browse', browseRouter);
app.use('/reservation', reservationRouter);
app.use('/restaurantAdmin', restaurantAdminRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/insert', insertRouter);
/* ---------------------------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
