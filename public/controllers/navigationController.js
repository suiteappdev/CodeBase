var app = angular.module('app', [
    'ngRoute',
    'derechoModule',
    'estadoModule',
    'asesoriaModule',
    'selectModule',
    'estadoAsesoriaModule',
    'estadoClienteModule',
    'tipoClienteModule',
    'abogadosModule',
    'dropdownSelectModule',
    'messageModule',
    'cropperModule'
    ]);

app.controller('navigationController', function($scope, $route, $routeParams, $location){

});

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/pagos', {
                    templateUrl: 'views/form/derechos/form-pagos.html',
                    controller: 'navigationController'
                })
                .when('/nuevo', {
                    templateUrl: 'views/form/derechos/form-nuevo.html',
                    controller: 'derechoFormController',
                })
                .when('/estados', {
                    templateUrl : 'views/form/derechos/form-estados.html',
                    controller  : 'estadoFormController'
                })
                .when('/asesoria', {
                    templateUrl : 'views/form/asesorias/form-asesoria.html',
                    controller  : 'asesoriaController'
                })
                .when('/tipoCliente', {
                    templateUrl : 'views/form/clientes/form-tipoCliente.html',
                    controller  : 'tipoClienteController'
                })
                .when('/abogado', {
                    templateUrl : 'views/form/abogados/form-abogados.html',
                    controller  : 'abogadosController'
                })
                .when('/estadoCliente', {
                    templateUrl : 'views/form/clientes/form-estadoCliente.html',
                    controller  : 'estadoClienteController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
