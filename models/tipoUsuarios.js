var mongoose = require("mongoose");

var tipoUsuarioSchema = new mongoose.Schema({
    tipo : String,
    descripcion : String,
    estado : Object
});
    
mongoose.model('tipoUsuario', tipoUsuarioSchema);
