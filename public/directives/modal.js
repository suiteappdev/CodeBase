'use strict';

var modalModule = angular.module('modalModule', [])
    .directive('modality', function () {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                model: '=ngModel',
                title: '=title'
            },
            template: "<div class=\"ui dimmer page\" ng-class=\"{ active: model }\">" + 
                            "<div class=\"ui test modal transition visible\" style=\"margin-top: -189px;\" >" +
                            "<i class=\"close icon\" ng-click=\"hide()\"></i>" +
                              "<div class=\"header\">" +
                                   "title" +
                              "</div>" +
                              "<div class=\"content\" ng-transclude>" +
                              "</div>"+
                            "</div>" +
                      "</div>",
            link: function (scope, element, attrs) {
                
            }
        }
});
