var app = angular.module('app', ['ngRoute', 'modalModule', 'derechoModule','estadoModule', 'selectModule']);

app.controller('navigationController', function($scope, $route, $routeParams, $location){

});

app.controller('workspace', function($scope){
    $scope.workspaceList = [
        { id:2, description : 'espacio de trabajo numero 1', default : false },
        { id:2, description : 'espacio de trabajo numero 2', default : false },
        { id:2, description : 'espacio de trabajo numero 3', default : false },
        { id:2, description : 'espacio de trabajo numero 4', default : false },
        { id:2, description : 'espacio de trabajo numero 5', default : true  }
    ];
});

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/pagos', {
                    templateUrl: 'views/form/form-pagos.html',
                    controller: 'navigationController'
                })
                .when('/nuevo', {
                    templateUrl: 'views/form/form-nuevo.html',
                    controller: 'derechoFormController'
                })
                .when('/estados', {
                    templateUrl : 'views/form/form-estados.html',
                    controller  : 'estadoFormController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
