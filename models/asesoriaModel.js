var mongoose = require("mongoose");

var asesoriaSchema = new mongoose.Schema({
    derecho : Object,
    referencia : String,
    estado : Object,
    valor : Number
});
    
mongoose.model('asesoria', asesoriaSchema);
