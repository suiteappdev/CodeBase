(function($){
	$.fn.fixheader = function(){
		return this.each(function(){
			_table = $(this);
			_thead = _table.find('thead');

			fixed_table = $('<table class="fixedtable datatable"></table>');

			fixed_table_wrapper = $('<div class="fixedtablewrapper"></div>');
			_table.before(fixed_table);

			_thead.find('td').each(function(){
				$(this).css('width', $(this).width());
			});

			fixed_thead = _thead.clone();
			fixed_table.append(fixed_thead);

			$('body').on('DOMNodeInserted', _table.find('tbody'), function(e) {
				  if ($(e.target).is('tr')) {
						_thead.find('td').each(function(index, ele){
							$(fixed_thead.find('td')[index]).css('width', $(ele).css('width'));
						});
				  }
			});

			_thead.css({'visibility':'hidden'});
			_table.wrap(fixed_table_wrapper);
		});
	}	
}(jQuery));
