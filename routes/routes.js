module.exports = function(app, passport){
	var nodemailer = require('nodemailer');
	var flash = require('express-flash');
	var mongoose = require('mongoose');
	var async = require('async');
	var bcrypt   = require('bcrypt-nodejs');
	var crypto = require("crypto");
	var permissions = require('../models/constants/permissions');
	var media = require('../libs/media/file');

	var userModel = mongoose.model('User');
	var derechosModel = mongoose.model('derechos');
	var estadosModel = mongoose.model('estadopagos');
	var asesoriaModel = mongoose.model('asesoria');
	var tipoClienteModel = mongoose.model('tipoCliente');
	var estadoClienteModel = mongoose.model('estadoCliente');
	var estadoAsesoriaModel = mongoose.model('estadoAsesoria');
	var generoModel = mongoose.model('generos');
	
	app.use(flash());
	
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
	
	app.put('/derechos/:id', function(req, res){
		derechosModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				derecho: req.body.derecho,
				descripcion : req.body.descripcion,
				estado : {
					_id : mongoose.Types.ObjectId(req.body.estado['val']),
					tag : req.body.estado.tag,
					descripcion : req.body.estado.text
				}
				
			}
			
		}, function(err, derecho){
			if(derecho){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(derecho));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* ASESORIA */
	
	app.get('/asesoria', isLoggedIn, function(req, res){
		asesoriaModel.find({}, function(err, asesoria){
			if(asesoria){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(asesoria));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
	
	})
	
	app.get('/asesoria/:id', isLoggedIn, function(req,  res){
		try {
			asesoriaModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, asesoria){
				if(asesoria){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(asesoria));
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
	
	app.delete('/asesoria/:id', isLoggedIn, function(req,  res){
		try {
			asesoriaModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, asesoria){
				if(asesoria){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(asesoria));
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
	
	app.post('/asesoria', function(req, res){
		var asesoria = new asesoriaModel({
				derecho	    : {
					_id : mongoose.Types.ObjectId(req.body.derecho['val']),
					descripcion :req.body.derecho['text']
				},
				referencia	: req.body.referencia,
				estado : {
					_id : mongoose.Types.ObjectId(req.body.estado['val']),
					descripcion : req.body.estado['text']
				},
				valor : req.body.valor,
				urlProducto : req.body.urlProducto
			});
		
		asesoria.save(function(err, asesoria){
			if(asesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(asesoria));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	app.put('/asesoria/:id', function(req, res){
		asesoriaModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				derecho	    : {
					_id : mongoose.Types.ObjectId(req.body.derecho['val']),
					descripcion :req.body.derecho['text']
				},
				referencia	: req.body.referencia,
				estado : {
					_id : mongoose.Types.ObjectId(req.body.estado['val']),
					descripcion : req.body.estado['text']
				},
				valor : req.body.valor,
				urlProducto : req.body.urlProducto
				
			}
			
		}, function(err, asesoria){
			if(asesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(asesoria));
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
	
	/* TIPO CLIENTES */
	
	app.get('/tipoCliente', isLoggedIn, function(req, res){
		tipoClienteModel.find({}, function(err, tipoCliente){
			if(tipoCliente){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(tipoCliente));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
		
	});
	
	app.get('/tipoCliente/:id', isLoggedIn, function(req,  res){
		try {
			tipoClienteModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, tipoCliente){
				if(tipoCliente){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(tipoCliente));
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
	
	app.delete('/tipoCliente/:id', isLoggedIn, function(req,  res){
		try {
			tipoClienteModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, tipoCliente){
				if(tipoCliente){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(tipoCliente));
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
	
	app.post('/tipoCliente', function(req, res){
		var tipoCliente = new tipoClienteModel({
				tipoCliente : req.body.tipoCliente,
				descripcion : req.body.descripcion,
				estado	    : req.body.estado
			});
		
		tipoCliente.save(function(err, tipoCliente){
			if(tipoCliente){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(tipoCliente));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	app.put('/tipoCliente/:id', function(req, res){
		tipoClienteModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				estado: req.body.tipoCliente,
				descripcion : req.body.descripcion
			}
			
		}, function(err, tipoCliente){
			if(tipoCliente){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(tipoCliente));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	
	/* ESTADO CLIENTES */
	
		app.get('/estadoCliente', isLoggedIn, function(req, res){
		estadoClienteModel.find({}, function(err, estadoCliente){
			if(estadoCliente){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(estadoCliente));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
		
	});
	
	app.get('/estadoCliente/:id', isLoggedIn, function(req,  res){
		try {
			estadoClienteModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, estadoCliente){
				if(estadoCliente){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estadoCliente));
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
	
	app.delete('/estadoCliente/:id', isLoggedIn, function(req,  res){
		try {
			estadoClienteModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, estadoCliente){
				if(estadoCliente){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estadoCliente));
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
	
	app.post('/estadoCliente', function(req, res){
		var estadoAsesoria = new estadoClienteModel({
				estado : req.body.estado,
				descripcion : req.body.descripcion
			});
		
		estadoAsesoria.save(function(err, estadoAsesoria){
			if(estadoAsesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estadoAsesoria));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	app.put('/estadoCliente/:id', function(req, res){
		estadoClienteModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				estado: req.body.estado,
				descripcion : req.body.descripcion
			}
			
		}, function(err, estadoCliente){
			if(estadoCliente){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estadoCliente));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* ESTADO ASESORIAS */
	
		app.get('/estadoAsesorias', isLoggedIn, function(req, res){
		estadoAsesoriaModel.find({}, function(err, estadoAsesoria){
			if(estadoAsesoria){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(estadoAsesoria));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
		
	});
	
	app.get('/estadoAsesorias/:id', isLoggedIn, function(req,  res){
		try {
			estadoAsesoriaModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, estadoAsesoria){
				if(estadoAsesoria){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estadoAsesoria));
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
	
	app.delete('/estadoAsesorias/:id', isLoggedIn, function(req,  res){
		try {
			estadoAsesoriaModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, estadoAsesoria){
				if(estadoAsesoria){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estadoAsesoria));
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
	
	app.post('/estadoAsesorias', function(req, res){
		var estadoAsesoria = new estadoAsesoriaModel({
				estado : req.body.estado,
				descripcion : req.body.descripcion
			});
		
		estadoAsesoria.save(function(err, estadoAsesoria){
			if(estadoAsesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estadoAsesoria));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	app.put('/estadoAsesorias/:id', function(req, res){
		estadoAsesoriaModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				estado: req.body.estado,
				descripcion : req.body.descripcion
			}
			
		}, function(err, estadoAsesoria){
			if(estadoAsesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estadoAsesoria));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* ABOGADOS */
	
		app.get('/abogados', isLoggedIn, function(req, res){
		userModel.find({ 'local.email' :  { $ne: null} }, function(err, user){
			if(user){
				res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
				res.end(JSON.stringify(user));
			}else{
				res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
				res.end('resource no found.');
			}
		});
		
	});
	
	app.get('/abogados/:id', isLoggedIn, function(req,  res){
		try {
			estadoAsesoriaModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }, function(err, estadoAsesoria){
				if(estadoAsesoria){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(estadoAsesoria));
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
	
	app.delete('/abogados/:id', isLoggedIn, function(req,  res){
		try {
		userModel.find({_id : mongoose.Types.ObjectId(req.param('id')) }).remove(function(err, abogado){
				if(abogado){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(abogado));
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
	
	app.post('/abogados', function(req, res){
		res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
		userModel.find({ 'local.email' :req.body.email}, function(err, user){
			if(user.length > 0){
				res.end(JSON.stringify({
					onError : true
				}));
			}else{
				var newUser = new userModel();
		
				newUser.local.email = req.body.email;
				newUser.local.password = newUser.generateHash(req.body.password);
				newUser.local.role = permissions.userType;
				newUser.local.image = media.readRawDataUri(req.body.imageData)['data'];
				newUser.local.firstName = req.body.firstName;
				newUser.local.secondName = req.body.secondName;
				newUser.local.username = req.body.username;
				newUser.local.gender = req.body.gender;
				newUser.local.birth = req.body.birth;
				newUser.local.biografia = req.body.biography;
				newUser.local.phone = req.body.phone;
				newUser.local.derechos = req.body.derechos;
				
				newUser.save(function(err, userSaved){
					if(err){
						throw err;
					}
					res.end(JSON.stringify(userSaved));
				});
			}
		});
	});
	
	app.put('/abogados/:id', function(req, res){
		estadoAsesoriaModel.update({ _id: mongoose.Types.ObjectId(req.body._id)},
		{ $set: 
			{ 
				estado: req.body.estado,
				descripcion : req.body.descripcion
			}
			
		}, function(err, estadoAsesoria){
			if(estadoAsesoria){
				res.writeHead(200, {"Content-Type": "application/json;  charset=utf-8"});
				res.end(JSON.stringify(estadoAsesoria));
			}else{
				res.writeHead(500, {"Content-Type": "application/json;  charset=utf-8"});
				res.end('error procesando la solitud...intente mas tarde');
			}
		});
	});
	
	/* GENERO */
	
	app.get('/genero', isLoggedIn, function(req, res){
		generoModel.find({}, function(err, genero){
			if(genero){
				if(genero){
					res.writeHead(HEADER.RESPONSE_STATUS['OK'], { "Content-Type" : HEADER.CONTENT_TYPE['TEXT'].JSON } );
					res.end(JSON.stringify(genero));
				}else if(err){
					res.writeHead(HEADER.RESPONSE_STATUS['NO_FOUND'], { "Content-Type" :HEADER.CONTENT_TYPE['TEXT'].HTML } );
					res.end('resource no found.');
				}
			}
		});
	})
	
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
	
	app.get('/forgot', function(req, res) {
		var cssfiles = req.app.get('RESOURCE')['appendCss']();
		res.locals.cssfiles = cssfiles;
		
		var jsfiles = req.app.get('RESOURCE')['appendJs']([
			'assets/vendor/angularjs/angular-route.js',
			'assets/js/workspace.js',
			'assets/js/application.js',
			'lib/model.js',
			'/directives/customSelect.js',
			'/directives/confirm.js',
			'/directives/dropdown.js',
		    '/controllers/estadoAsesoriaController.js',
			'/controllers/estadoClienteController.js',
			'/controllers/tipoClienteController.js',
			'/controllers/workspaceController.js',
			'/controllers/navigationController.js',
			'/controllers/asesoriaController.js',
			'/controllers/derechoController.js',
			'/controllers/estadoController.js',
			'/directives/select.js',
			'/controllers/formControllers.js',
			'/config/configuration.js'
					 ]);

		res.locals.jsfiles = jsfiles;
		  res.render('forgot', {
		    user: req.user
		  });
	});
	
	app.post('/forgot', function(req, res, next) {
	  async.waterfall([
	    function(done) {
	      crypto.randomBytes(20, function(err, buf) {
	        var token = buf.toString('hex');
	        done(err, token);
	      });
	    },
	    function(token, done) {
	      userModel.findOne('local.email', { email: req.body.email }, function(err, user) {
	        if (!user) {
	          req.flash('error', 'No account with that email address exists.');
	          return res.redirect('/forgot');
	        }
	
	        user.resetPasswordToken = token;
	        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	
	        user.save(function(err) {
	          done(err, token, user);
	        });
	      });
	    },
	    function(token, user, done) {
	      var smtpTransport = nodemailer.createTransport('SMTP', {
	        service: 'Gmail',
	        auth: {
	          user: 'listerine1989@gmail.com',
	          pass: 'house1989*'
	        }
	      });
	      var mailOptions = {
	        to: user.email,
	        from: 'passwordreset@demo.com',
	        subject: 'Node.js Password Reset',
	        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
	          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
	          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
	          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
	      };
	      smtpTransport.sendMail(mailOptions, function(err) {
	        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
	        done(err, 'done');
	      });
	    }
	  ], function(err) {
	    if (err) return next(err);
	    res.redirect('/forgot');
	  });
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
			'/directives/customSelect.js',
			'/directives/confirm.js',
			'/directives/dropdown.js',
			'/directives/message.js',
			'/directives/cropper.js',
			'/controllers/abogadosController.js',
		    '/controllers/estadoAsesoriaController.js',
			'/controllers/estadoClienteController.js',
			'/controllers/tipoClienteController.js',
			'/controllers/workspaceController.js',
			'/controllers/navigationController.js',
			'/controllers/asesoriaController.js',
			'/controllers/derechoController.js',
			'/controllers/estadoController.js',
			'/directives/select.js',
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