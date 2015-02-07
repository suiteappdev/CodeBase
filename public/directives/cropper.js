var myCropper = angular.module('cropperModule', []);

myCropper.directive('cropper', function($timeout){
          return {
            restrict: 'EA',
            replace :false,
            scope : false,
            template :'<input type="file" class="file"><div class="ui basic test modal cropperArea">' +
                        '<i class="close icon"></i>' +
                            '<div class="content"><img class="target" src="{{base64Data}}"></div>' +
                            '<div class="actions">' +
                              '<div class="two fluid ui inverted buttons">' +
                                '<div class="ui red basic cancel inverted button">' +
                                  '<i class="remove icon"></i>Cancelar</div>' +
                                '<div class="ui green ok basic inverted button"><i class="checkmark icon"></i>Listo</div>' +
                              '</div>' +
                            '</div>' +
                      '</div></div>',
                        
            link : function(scope, element, attrs){
              console.log(scope);
             var _modal = jQuery(element).find('.cropperArea');
             var _imageToCrop = jQuery(element).find('.target');              
                jQuery(element).find('.file').on('change', function(event){
                    var _self = $(this);

                    var reader = new FileReader(_self);

                    reader.onload = function(e){
                      scope.base64Data = e.target.result;

                      scope.$apply();
                      
                      _modal.modal({
                          onShow : function(){
                            $.fn.cropper({
                              aspectRatio: 16 / 9,
                              data: {
                                x: 480,
                                y: 60,
                                width: 640,
                                height: 360
                              }
                            });
                            
                            try {
                              _imageToCrop.cropper();
                            } catch (e) {
                              throw Error('jQuery cropper plugin is required go to http://fengyuanchen.github.io/');
                            }
                          },
                          closable : false,
                          onApprove : function(){
                            console.log(scope);
                            scope.formData.imageData = _imageToCrop.cropper('getDataURL');
                            scope.$apply();
                            _imageToCrop.cropper('destroy');
                            delete scope.base64Data;
                            _self.val(null);
                          },
                          onDeny : function(){
                            _self.val(null);
                            _imageToCrop.cropper('destroy');
                            delete scope.base64Data;
                          }
                      }).modal('show');
                    }
                     reader.readAsDataURL(event.target.files[0]);
                });
            }
        }
        
    })