'use strict'

var workspace = new angular.module('Merchant', []);

workspace.controller('workspace', function($scope){
	$scope.workspaceList = [
		{'name': 'Nexus S',
	     'snippet': 'Fast just got faster with Nexus S.'},
	    {'name': 'Motorola XOOM™ with Wi-Fi',
	     'snippet': 'The Next, Next Generation tablet.'},
	    {'name': 'MOTOROLA XOOM™',
	     'snippet': 'The Next, Next Generation tablet.'}
	];
});

