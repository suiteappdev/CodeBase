exports.index = function(req, res){
	var cssfiles = req.app.get('RESOURCE')['appendCss']();
	res.locals.cssfiles = cssfiles;
	
	var cssfiles = req.app.get('RESOURCE')['appendJs']();
	res.locals.jsfiles = jsfiles;

	res.render('index', {
		title: 'Ejemplo de Passport JS',
		user: req.user
	});
};
