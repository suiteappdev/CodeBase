var CONFIG = (function () {
	var mongoose = require('mongoose');
	
	var _SERVER_DATA = 'MongoDb';
	var _DEFAULTPORT = 80;
	var _PORT = _DEFAULTPORT;
	var _BASEPATH = 'http://gec-armitage1989.c9.io/'
	var _GOOGLE_SERVER_API_KEY = '';
	var _ANDROID_SDK_SYSTEM_PATH = '';
	var _IOS_SDK_SYSTEM_PATH = '';

	//db settings old
	/*var dbusername  = 'merchantUser';
	var dbpassword = 'house1989*';
	var dbname = 'merchant';
	var dbport = 51750;
	var dbhost = '@ds051750.mongolab.com';
		
	var DB = {
		Init : function(){
				mongoose.connect('mongodb://' + dbusername + ':' + dbpassword + dbhost + ':'+dbport+'/' + dbname, function(err, res) {
				  if(err) throw err;
				  	console.log('Conectado con éxito a la BD');
				});
		}	
	}*/
	
	var Auth = {
		facebook : {
			id:'',
			secret : ''
		},

		twitter : {
			key:'',
			secret : ''
		}
	}

	var _setPort = function(port){
		if(_PORT == port ){
			return;
		}

		_PORT = port;
	}

	var _getPort = function(){
		return _PORT == _DEFAULTPORT ? _DEFAULTPORT : _PORT;
	}

	return {
		setPort 	: _setPort,
		getPort 	: _getPort,
		auth 		: Auth,
		BASEPATH 	: _BASEPATH,
		SERVER_DATA :_SERVER_DATA,
	//	DB			:DB,
		GOOGLE_SERVER_API_KEY : _GOOGLE_SERVER_API_KEY
	}

})();

module.exports = CONFIG;