var WORKSPACE = (function(){
	'use strict'

	var _wokspaces = [];
	var _id = null;
	var _workspaceName = null;

	var _getWorkspaces = function(){

	}

	var GetWorkspaces = function(){
		_getWorkspaces();
	}

	var _create = function(){

	}

	var Create = function(workspace){
		_create();
	}

	var _update = function(){

	}

	var Update = function(){
		_update();
	}

	var _delete = function(){

	}

	var Delete = function(){
		_delete();
	}

	return {
		Create : Create,
		Delete : Delete,
		Update : Update,
		GetWorkspaces : GetWorkspaces
	}
})(WORKSPACE || {});