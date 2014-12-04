var mongoose = require("mongoose");

var derechosSchema = new mongoose.Schema({
    derecho : String,
    descripcion : String,
    estado : Object
});
    
mongoose.model('derechos', derechosSchema);
