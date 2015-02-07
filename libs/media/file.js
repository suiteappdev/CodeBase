
var Image = (function(){
    'use strict'
    var types = require("./util/types");
    var config = require("./config");
    
    var isDataUri = false;
    
    var _readRawDataUri = function(value){
        var matches = value.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};
        
        if (matches.length !== 3){
            return new Error('invalid dataUri');
        }
        
        response.type = matches[1];
        
        if(types.isAllowed(response.type.split('/')[0])){
            return new Error('this extention is not allowed:' + response.type.split('/')[0]);
        }
        
        response.data = new Buffer(matches[2], 'base64');
        
        return response;
    }
    
    var readRawDataUri = function(value){
        return _readRawDataUri(value);
    }
    
    var _createImageFromData = function(data, filename, callback){
        return require("fs").writeFile(filename, data, 'base64', callback);
    }
    
    var createImageFromData = function(data, filename, callback){
         return _createImageFromData(data, filename, callback);
    }
    
    return {
        CONFIG : config,
        readRawDataUri :readRawDataUri,
        createImageFromData : createImageFromData
    }
    
})();
module.exports = Image;