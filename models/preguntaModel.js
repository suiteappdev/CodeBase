var mongoose = require("mongoose");

var AsesoriaSchema = new mongoose.Schema({
    titulo : String,
    contenido: String,
    estado : String,
    comentarios : Array,
    archivos : Array
});
    
mongoose.model('AsesoriaModel', AsesoriaSchema, 'estadoPagos');