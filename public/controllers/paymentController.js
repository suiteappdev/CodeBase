var paymentController = angular.module('PaymentModule', ['ngRoute']);

paymentController.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.
                state('/form-step1', {
                    templateUrl: 'views/form/frm-pais.html',
                    controller: 'paymentController'
                })
                .state('/form-step2', {
                    templateUrl: 'views/form/payment.html'
                }).
                state('/form-step3', {
                    templateUrl: 'views/form/payment.html'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);