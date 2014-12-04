var ACCOUNT = (function(){
	'use strict'
	
	var _firstName = null;
	var _secondName = null;
	var _emailAddress = null;
	var _username = null;
	var _password = null;

	var _setFirstName = function(firstname){
		if(_firstName === firstname){
			return;
		}

		_firstName = firstname;
	}

	var _setSecondName = function(secondname){
		if(_secondName === secondname){
			return;
		}

		_secondName = secondname;
	}

	var _setEmailAddress = function(emailaddress){
		if(_emailAddress === emailaddress){
			return;
		}

		_emailAddress = emailaddres;
	}

	var _setUsername = function(username){
		if(_username === username){
			return;
		}

		_username = username;
	}

	var _setPassword = function(password){
		if(_password === password){
			return;
		}

		_password = password;
	}

	var setFirstName = function(firstname){
		_setFirstName(firstname);
	}

	var setSecondName = function(secondname){
		_setSecondName(secondname);
	}

	var setEmailAddress = function(emailaddress){
		_setEmailAddress(emailaddress);
	}

	var setUsername = function(username){
		_setUsername(username);
	}

	var setPassword = function(password){
		_setPassword(password);
	}




	/* PRIVATE GETTERS */

	var _getFirstName = function(){
		return _firstName;
	}

	var _getSecondName = function(){
		return _secondName;
	}

	var _getUsername = function(){
		return _username;
	}

	var _getPassword = function(){
		return _password;
	}

	var _getEmailAddress = function(){
		return _emailAddress;
	}

	var Create  = function(){
		_create();
	}

	var _create = function(){
		console.log('created');
	}

	return {
		firstname :_getFirstName,
		secondname : _getSecondName,
		username : _getUsername,
		password : _getPassword,
		emailaddress : _getEmailAddress,
		
		setFirstName : setFirstName,
		setSecondName : setSecondName,
		setUsername : setUsername,
		setPassword : setPassword,
		setEmailAddress : setEmailAddress,

		Create : Create

	}

})(ACCOUNT || {});