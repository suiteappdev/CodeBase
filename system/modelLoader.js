var modelAutoload = (function(){
    var fs = require('fs');

    var _autoload = function(path){
        //TODO : verificar si el archivo es js o es un directorio
       fs.readdirSync(path).forEach(function(file){
            try {
                 require(path + '/' + file);
                 console.log('loaded file ==> ' + file);
            } catch (e) {
                
            }
  
        });
    }
    
    var autoLoad = function(path){
        _autoload(path);
    }
    
    return {
        autoLoad : autoLoad
    } 
})();

module.exports = modelAutoload;