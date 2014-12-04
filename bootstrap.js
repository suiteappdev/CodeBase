var Bootstrap= (function(){

    var _launcher = function(){
        
        var express = require('express'); 
        var path = require('path');
        var flash 	 = require('connect-flash');
        
        var CONFIG = require('./config');
        var RESOURCE = require('./util/resource');

        var passport = require('passport');
        var resources = require('./util/resource');
        
        require('./models/usuarioModel');
        require('./models/derechosModel');
        require('./models/estadosModel');
        require('./passport')(passport);
        
        //CONFIG.DB.Init();
        var DataManager = require('./libs/dataManager');
        DataManager.setDatabase('merchant');
        DataManager.setUsername('merchantUser');
        DataManager.setPassword('house1989*');
        DataManager.setHostname('@ds051750.mongolab.com');
        DataManager.setPort(51750);
        var handler = DataManager.Initialize(CONFIG.SERVER_DATA);
        
        console.log(handler);
        
        var app = express();
        
        app.set('CONFIG', CONFIG); 
        app.set('RESOURCE', RESOURCE); 
        app.set('port', process.env.PORT || 5000);
        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        
        app.use(express.cookieParser());
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());
        
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.session({ secret: 'house1989*' }));
        app.use(flash());
        
        app.use(passport.initialize());
        app.use(passport.session());
        
        if ('development' == app.get('env')) {
          app.use(express.errorHandler());
        }
        
        require('./routes/routes')(app, passport);
        
        app.listen(8080, function(){
          console.log('running');
        });
        
        return app;
    }
    
    return {
        Launcher : _launcher
    }

})();

module.exports = Bootstrap;