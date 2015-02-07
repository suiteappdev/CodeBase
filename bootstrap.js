var Bootstrap= (function(){

    var _launcher = function(){
        
        var express = require('express'); 
        var path = require('path');
        var flash 	 = require('connect-flash');
        
        var CONFIG = require('./config');
        var RESOURCE = require('./util/resource');

        var passport = require('passport');
        var resources = require('./util/resource');
        var autoloadModels = require('./system/modelLoader');
        
        autoloadModels.autoLoad(path.join(__dirname, CONFIG.MODELPATH));
        require('./passport')(passport);
        
        CONFIG.DB.Init();

        var app = express();
        
        app.set('CONFIG', CONFIG); 
        app.set('RESOURCE', RESOURCE); 
        app.set('port', process.env.PORT || 5000);
        app.set('views', path.join(__dirname, 'views'));
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
        run : _launcher
    }

})();

module.exports = Bootstrap;