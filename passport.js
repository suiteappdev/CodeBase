var mongoose = require('mongoose');
var User = mongoose.model('User');

var permissions = require('./models/constants/permissions')
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

var SETTINGS = require('./config');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	passport.use(new TwitterStrategy({
		consumerKey		 : SETTINGS.auth['twitter'].key,
		consumerSecret	 : SETTINGS.auth['twitter'].secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function(){
			User.findOne({'twitter.id': profile.id}, function(err, user) {
				if(err) throw(err);
				if(!err && user!= null) return done(null, user.twitter);

				var userTwitter = new User();

				userTwitter.twitter.id = profile.id;
				userTwitter.twitter.provider = profile.provider,
				userTwitter.twitter.username = profile.displayName,
				
				userTwitter.twitter.role = permissions.userType;
				
				userTwitter.twitter.photo = profile.photos[0].value
				userTwitter.twitter.provider = profile.provider;

				userTwitter.save(function(err) {
					if(err) throw err;
					done(null, userTwitter.twitter);
				});
			});			
		});
	}));

	passport.use(new FacebookStrategy({
		clientID			: SETTINGS.auth['facebook'].id,
		clientSecret	: SETTINGS.auth['facebook'].secret,
		callbackURL	 : '/auth/facebook/callback',
		profileFields : ['id', 'displayName', 'photos']
	}, function(accessToken, refreshToken, profile, done) {
		User.findOne({'facebook.id': profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user.facebook);
			
			var userFacebook = new User();

			userFacebook.facebook.id = profile.id;
			
			userFacebook.facebook.role  = permissions.userType;
			
			userFacebook.facebook.username = profile.displayName;
			userFacebook.facebook.photo = profile.photos[0].value;
			userFacebook.facebook.provider = profile.provider;
			
			userFacebook.save(function(err) {
				if(err) throw err;
				done(null, userFacebook.facebook);
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
        usernameField 		: 'txtEmail',
        passwordField 		: 'txtPassword',
        passReqToCallback : true
	}, function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({ 'local.email' :  email }, function (err, user){
				if(err) return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				}else{

					var newUser = new User();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					
					newUser.local.role = permissions.userType;
					
					newUser.local.firstName = req.body.txtFirstName;
					newUser.local.username = req.body.txtFirstName;
					newUser.local.secondName = req.body.txtSecondName;
					
					newUser.save(function(err, newUser){
						if(err){
							throw err;
						}

						return done(null, user);
					})
				}
			});
		});
	}))

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err); 
                console.log('error');           	
            }

            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                console.log('error no existe');           	
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata            	
                console.log('error invalid');           	
            
            }


            // all is well, return successful user
            return done(null, user.local);
            console.log(user.local);
        });

    }));
};