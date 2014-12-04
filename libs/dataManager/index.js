var types = require("./properties/descriptor");
var dataMan = (function(){
    var _username, _password, _hostname, _database, _port;
    
    function _connect(target, callback){
            switch(target) {
                case types.MySql.Name :
                    var connection = require('mysql').createConnection({
                       host: _hostname,
                       user: _username,
                       password: _password,
                       database: _database,
                       port: _port
                    });
                
                break;
                case types.Mssql.Name :
                    var sql = require('mssql'); 
                    
                    var config = {
                        user: _username,
                        password:_password,
                        server: _hostname, 
                        database: _database,
                    
                        options: {
                            encrypt: true 
                        }
                    }
                    
                    var connection = new sql.Connection(config, function(err){
                       return callback(null, new sql.Request(connection)); 
                    });
                    
                    break;
                case types.PostgreSQL.Name :
                    var pg = require('pg');
                    var conString = 'postgres://'+_username+':'+_password+'@'+_hostname+'/' + _database;
                    
                    pg.connect(conString, function(err, client, done) {
                          if(err) {
                            return console.error('error fetching client from pool', err);
                          }
                          
                          return callback(null, client);
                            
                    });
                    
                    break;
                case types.MongoDb.Name :
                    var mongoose = require('mongoose');
                    mongoose.connect('mongodb://' + _username + ':' + _password + _hostname + ':'+_port+'/' + _database);
    
                break;
                default:
                throw('error al intentar conectar con el manejador de datos');
            }
        }
        
    function Connect(target, callback){
        return _connect(target, callback);
    }

    //private methods
    function _setUsername(username){
        return _username == username ? _username : _username = username; 
    }
    
    function _setPassword(password){
        return _password == password ? _password : _password = password;
    }
    
    function _setHostname(hostname){
        return _hostname == hostname ? _hostname : _hostname = hostname;
    }
    
    function _setDatabase(database){
        return _database == database ? _database : _database = database;
    }
    
    function _setPort(port){
        return _port == port ? _port : _port = port;
    }
    
    //public 
    function setUsername(username){
        _setUsername(username);
    }
    
    function setPassword(password){
        _setPassword(password);
    }
    
    function setHostname(hostname){
        _setHostname(hostname);
    }
    
    function setDatabase(database){
        _setDatabase(database);
    }
    
    function setPort(port){
        _setPort(port);
    }
    
    return {
        Initialize : Connect,
        setUsername : setUsername,
        setPort    : setPort,
        setDatabase : setDatabase,
        setPassword : setPassword,
        setHostname : setHostname,
    }
})();

 module.exports = dataMan;
