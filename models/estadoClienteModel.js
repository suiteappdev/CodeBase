var mongoose = require("mongoose");

var estadosClienteSchema = new mongoose.Schema({
    estado : String,
    descripcion : String,
});
    
mongoose.model('estadoCliente', estadosClienteSchema);
