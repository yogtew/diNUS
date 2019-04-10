var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('login', {
		title: 'Login',
		isLoggedIn: req.user ? true:false
	});
});

router.post('/',
	passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		console.log("login success")
		res.redirect('/dashboard');
	});

module.exports = router;
