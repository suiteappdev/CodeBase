var myConfirm= angular.module('confirmModule', []);

myConfirm.directive('myconfirm', function($timeout){
        return {
            restrict: 'E',
            replace :true,
            scope:{
                show : '=show',
                title   : '@',
                message : '@',
                onaccept : '=onaccept',
                oncancel    : '=oncancel'
            },
            template : '<div class="ui basic test modal transition" style="margin-top: -142px;">' +
                           '<div class="header">{{title}}</div>' +
                            '<div class="content">' +
                              '<div class="image">' +
                                '<i class="archive icon"></i>' +
                              '</div>' +
                              '<div class="description">' +
                                '<p>{{message}}</p> ' +
                              '</div>' +
                            '</div>' +
                            '<div class="actions">' +
                              '<div class="two fluid ui inverted buttons">' +
                                '<div class="ui red basic cancel inverted button">' +
                                  '<i class="remove icon"></i>No</div>' +
                                '<div class="ui green ok basic inverted button">' +
                                 '<i class="checkmark icon"></i>Si ' + 
                                 '</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>',
            link : function(scope, element, attrs, ngModel){
                var _$ele = $(element);
                $timeout(function(){
                  _$ele.modal({
                        onDeny    : function(){
                          scope.oncancel();
                        
                        },
                        onApprove : function() {
                         scope.onaccept();
                        }
                  });
                  
                  scope.$watch('show', function(newVal, oldVal){
                    _$ele.modal( newVal ? 'show' : 'hide'  );
                  });

                  scope.$apply();
                });
            }
        }
        
    })