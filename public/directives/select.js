var mySelect = angular.module('defaultselectModule', []);

mySelect.directive('mydefaultselect', function($timeout, $http){
        return {
            restrict: 'E',
            replace :true,
            scope:{
                ngModel : '=selected',
                defaultText : '=defaultText',
                data    : '=data',
                async   :  '=async'
            },
            template : '<div class="ui fluid search selection dropdown">' +
                          '<input type="hidden" name="country">' +
                          '<i class="dropdown icon"></i>' +
                          '<div class="default text">{{defaultText}}:</div>' +
                          '<div class="menu">' +
                            '<div class="item" ng-repeat="item in data" data-value="{{item._id}}">{{item.derecho}}</div>' +
                          '</div>' +
                        '</div>',
            link : function(scope, element, attrs, ngModel){
                var _$ele = $(element);
                
                scope.$watch('ngModel', function(val) {
                    _$ele.dropdown('set value', val.val);
                    _$ele.dropdown('set selected');
                });

                $timeout(function(){
                    if(scope.async){
                        $http.get(attrs.async).success(function(data){
                            scope.data = data;
                            _$ele.dropdown({
                                onChange:function(val, html, text){
                                    scope.ngModel = {
                                        val : val,
                                        text : text.text()
                                    }
                                    
                                    scope.$apply();
                                }
                            });
                            
                            return;
                        });
                    }
                    _$ele.dropdown({
                        onChange:function(val, html, text){
                            scope.ngModel = {
                                val : val,
                                text : text.text()
                            }
                            
                            scope.$apply();
                        }
                    });
                });
            }
        }
        
    })