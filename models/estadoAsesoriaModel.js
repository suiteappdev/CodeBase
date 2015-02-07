var mongoose = require("mongoose");

var estadoAsesoriaSchema = new mongoose.Schema({
    estado: String,
    descripcion : String
});
    
mongoose.model('estadoAsesoria', estadoAsesoriaSchema);
