var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local            : {
		firstName    : String,
		secondName 	 : String,
        username     : String,
        role         : Object,
        email        : String,
        password     : String,
        created      :{type: Date, default: Date.now} 

    },

	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        role         : Object,
        username     : String,
        provider	 : String,
        photo		 : String,
    	created      :{type: Date, default: Date.now} 
	    },

    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        role         : Object,
        provider	 : String,
        photo		 : String,
        created      :{type: Date, default: Date.now} 
    },

    google           : {
        id           : String,
        token        : String,
        email        : String,
        username     : String,
        role         : Object,
        provider	 : String,
        photo		 : String,
        created      :{type: Date, default: Date.now} 
    }

});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);