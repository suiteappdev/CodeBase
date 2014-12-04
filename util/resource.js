var Resource = (function(){
	var	_defaultCss = [
			'assets/vendor/semantic-ui/semantic.min.css',
			'assets/css/theme.css',
			'assets/vendor/ElementTransitions/css/ElementTransitions.css',
			'assets/vendor/animate/animate.css',
			'assets/css/app.css',
			'assets/vendor/bootstrap/css/bootstrap-dialog.css'
		];
		
	var	_defaultJs = [
			'assets/vendor/angularjs/angular.js',
			'assets/vendor/jquery/jquery-1.11.1.min.js',
			'assets/vendor/semantic-ui/semantic.min.js',
			'assets/vendor/ElementTransitions/js/ElementTransitions.min.js',
			'assets/vendor/bootstrap/js/bootstrap-dialog.js',
		];

	var _appendCss = function(css){
		return _defaultCss;
	}

	var _appendJs = function(js){
		return js.length > 0 ? _defaultJs.concat(js) : _defaultJs;
	}

	return {
		appendCss 	: _appendCss,
		appendJs 	: _appendJs
	}

})();

module.exports = Resource;