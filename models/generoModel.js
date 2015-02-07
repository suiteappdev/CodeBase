var mongoose = require("mongoose");

var generoSchema = new mongoose.Schema({
    genero : String
});
    
mongoose.model('generos', generoSchema);
