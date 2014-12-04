var mySelect = angular.module('selectModule', []);

mySelect.directive('myselect', function($timeout){
        return {
            restrict: 'E',
            replace :true,
            scope:{
                ngModel : '=selected',
                data    : '=data'
            },
            template : '<div class="ui fluid search selection dropdown">' +
                          '<input type="hidden" name="country">' +
                          '<i class="dropdown icon"></i>' +
                         '<div class="default text">Select Country</div>' +
                          '<div class="menu">' +
                            '<div class="item" ng-repeat="item in data" data-value="{{item._id}}"><div class="ui {{item.tag}} empty circular label"></div>{{item.estado}}</div>' +
                          '</div>' +
                        '</div>',
            link : function(scope, element, attrs, ngModel){
                var _$ele = $(element);
                
                $timeout(function(){
                    _$ele.dropdown({
                        onChange:function(val, html, text){
                            console.log(html);
                            scope.ngModel = {
                                val : val,
                                text : text.text(),
                                tag : $(html).attr('class').split(' ')[1]
                                
                            }
                            scope.$apply();
                        }
                    });
                });
            }
        }
        
    })