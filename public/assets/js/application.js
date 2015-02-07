$(document).ready(function(){
	$('.dropdown').dropdown();
	$('.ui.checkbox').checkbox();
	
	$('.popover').popup(
	    {
	        content:'<div class="ui small feed">' +
                          '<h4 class="ui header" style="margin-bottom:0px;">Mi Actividad</h4>' +
                          '<div class="event" style="background-color: rgba(245, 245, 245, 0.3);padding: 3px;">' +
                            '<div class="label">' +
                              '<img src="http://semantic-ui.com/images/demo/avatar2.jpg">' +
                            '</div>' +
                            '<div class="content">' +
                              '<div class="date">Hace 3 minutos.</div>' +
                              '<div class="summary"><a>andrew c.</a> te ha preguntado</div>' +
                            '</div>' +
                          '</div>' +
                    '</div>',
	        on:'click'
	    }
	    );
;
});