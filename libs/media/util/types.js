var types = (function(){
    'use strict'
    var _types = ['jpg', 'gif', 'tiff', 'bmp', 'png', 'jpeg'];
    
    var _allowed = function(extention){
        return _types.indexOf(extention) > 0 ? true : false;
    }
    
    var allowed = function(extention){
        return _allowed(extention);
    }
    return {
        isAllowed : allowed
    }
})();

module.exports = types;