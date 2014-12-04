var mongoose = require("mongoose");

var estadosSchema = new mongoose.Schema({
    estado : String,
    descripcion : String,
    tag: String
});
    
mongoose.model('estadopagos', estadosSchema, 'estadoPagos');
