var mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
    tipo : Object,
    contenido : String,
    visto   : false,
    fecha : Date
    
});
    
mongoose.model('notificacion', notificationSchema);
