module.exports = function(app, passport){
	var mongoose = require('mongoose');
	var derechosModel = mongoose.model('derechos');
	var estadosModel = mongoose.model('estadopagos');
	var HEADER = require('../util/request/headers.js');
	
	/*
		API REST START
	*/
	
	app.get('/derechos', isLoggedIn, function(req, res){
		derechosModel.find({}, function(err, derechos){
			if(derechos){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(derechos));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
	
	})
	
	app.get('/derechos/:id', isLoggedIn, function(req,  res){
		try {
			derechosModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, derechos){
				if(derechos){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(derechos));
				}else{
					res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML } );
					res.end('resource no found');
				}
			});
		} catch (e) {
			res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML });
			res.end('resource no found.');
		}
	});
	
	app.delete('/derechos/:id', isLoggedIn, function(req,  res){
		try {
			derechosModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, derecho){
				if(derecho){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(derecho));
				}else{
					res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML } );
					res.end('resource no found');
				}	
			});
		} catch (e) {
			res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML });
			res.end('resource no found.');
		}
	});
	
	app.post('/derechos', function(req, res){
		var derecho = new derechosModel({
				descripcion : req.body.descripcion,
				derecho	    : req.body.derecho,
				estado		:{
					_id : mongoose.Types.ObjectId(req.body.estado['val']),
					descripcion : req.body.estado['text'],
					tag : req.body.estado['tag']
				} 
			});
		
		derecho.save(function(err, derecho){
			if(derecho){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(derecho));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* ESTADOS */
	
	app.get('/estados', isLoggedIn, function(req, res){
		estadosModel.find({}, function(err, estados){
			if(estados){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(estados));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
		
	});
	
	app.get('/estados/:id', isLoggedIn, function(req,  res){
		try {
			estadosModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, estado){
				if(estado){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estado));
				}else{
					res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML } );
					res.end('resource no found');
				}
			});
		} catch (e) {
			res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML });
			res.end('resource no found.');
		}
	});
	
	app.delete('/estados/:id', isLoggedIn, function(req,  res){
		try {
			estadosModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, estado){
				if(estado){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estado));
				}else{
					res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML } );
					res.end('resource no found');
				}	
			});
		} catch (e) {
			res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].HTML });
			res.end('resource no found.');
		}
	});
	
	app.post('/estados', function(req, res){
		var estados = new estadosModel({
				descripcion : req.body.descripcion,
				estado	    : req.body.estado,
				tag			: req.body.tag
			});
		
		estados.save(function(err, estado){
			if(estado){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estado));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* END ESTADOS */
	
	/*
		API REST END
	*/
	
	app.get('/', function(req, res){
		var cssfiles = req.app.get('RESOURCE')['appendCss']();
		res.locals.cssfiles = cssfiles;
		
		var jsfiles = req.app.get('RESOURCE')['appendJs']([]);
		res.locals.jsfiles = jsfiles;	

		res.render('index', {
			title : 'RTR ABOGADOS APP',
			user : req.user 
		});			
	});
	
	app.get('/signup', function(req, res) {
		if(req.user){
			res.redirect('/');
			return;
		}

		var cssfiles = req.app.get('RESOURCE')['appendCss']();
		res.locals.cssfiles = cssfiles;
		
		var jsfiles = req.app.get('RESOURCE')['appendJs'](['../assets/js/account.js']);

		res.locals.jsfiles = jsfiles;
		res.render('signup',{
			title : 'Registrarse',
			user : req.user 
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/dashboard', 
		failureRedirect : '/signup', 
		failureFlash : true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an errors
		failureFlash : true // allow flash messages
	}));
	
	app.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter',
	  { successRedirect: '/dashboard', failureRedirect: '/' }
	));

	app.get('/auth/facebook/callback', passport.authenticate('facebook',
	  { successRedirect: '/dashboard', failureRedirect: '/' }
	));

	app.get('/dashboard', isLoggedIn, function(req, res) {
		var cssfiles = req.app.get('RESOURCE')['appendCss']();
		res.locals.cssfiles = cssfiles;
		
		var jsfiles = req.app.get('RESOURCE')['appendJs']([
			'assets/vendor/angularjs/angular-route.js',
			'assets/js/workspace.js',
			'assets/js/application.js',
			'lib/model.js',
			'/directives/modal.js',
			'/directives/select.js',
			'/controllers/workspaceController.js',
			'/controllers/navigationController.js',
			'/controllers/derechoController.js',
			'/controllers/estadoController.js',
			'/controllers/formControllers.js',
			'/config/configuration.js'
		 ]);

		res.locals.jsfiles = jsfiles;	
		
		res.render('dashboard', {
			title : 'dashboard',
			user : req.user 
		});			
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()){
			return next();
		}

		res.redirect('/');
	}
}