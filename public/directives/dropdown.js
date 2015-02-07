var mySelect = angular.module('dropdownSelectModule', []);

mySelect.directive('mydropdownselect', function($timeout, $http){
        return {
            restrict: 'E',
            replace :true,
            scope:{
                ngModel : '=selected',
                placeholder : '@',
                data    : '@',
                colkey  : '@',
                coltext : '@',
                async   :  '@'
            },
            template : '<div class="ui fluid search selection dropdown">' +
                          '<input type="hidden" name="country">' +
                          '<i class="dropdown icon"></i>' +
                          '<div class="default text"></div>' +
                          '<div class="menu">' +
                            '<div class="item" ng-repeat="item in data" data-value="{{item[colkey]}}">{{item[coltext]}}</div>' +
                          '</div>' +
                        '</div>',
            link : function(scope, element, attrs, ngModel){
                var _$ele = $(element);

                $(_$ele[0]).find('.default').text(scope.placeholder);
                
                try {
                    scope.$watch('ngModel', function(newval, oldval) {
                            if(newval === null || newval === undefined){
                                return;
                            }
                            
                        _$ele.dropdown('set value', newval.val);
                        _$ele.dropdown('set selected');
                    });
                } catch (e) {
                    console.log('filling dropdown element');
                }

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