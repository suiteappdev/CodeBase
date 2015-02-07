var mongoose = require("mongoose");

var tipoClienteSchema = new mongoose.Schema({
    tipoCliente : String,
    descripcion : String,
    estado : Object
});
    
mongoose.model('tipoCliente', tipoClienteSchema);
