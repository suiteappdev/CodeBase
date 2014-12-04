var mongoose = require("mongoose");

var tipoUsuarioEstadoSchema = new mongoose.Schema({
    descripcion : String,
});
    
mongoose.model('tipoUsuarioEstado', tipoUsuarioEstadoSchema);