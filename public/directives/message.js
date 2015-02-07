var mySelect = angular.module('messageModule', []);

mySelect.directive('message', function($timeout, $http){
        return {
            restrict: 'E',
            replace :true,
            scope:{
                ngModel : '=show',
                title : '@',
                message : '@',
                type    : '@'
            },
            template : '<div class="ui {{type}} message">'+
                          '<i class="close icon"></i>' +
                        '<div class="header">{{title}}</div>{{message}}</div>',
                        
            link : function(scope, element, attrs){
                var _$ele = $(element);
                
                _$ele.find('.close').on('click', function() {
                     $(this).closest('.message').fadeOut();
                     scope.ngModel = false;
                     scope.$apply();
                });

                try {
                    scope.$watch('ngModel', function(newval, oldval) {
                        newval ? _$ele.show()  : _$ele.hide();
                        
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
        
    })