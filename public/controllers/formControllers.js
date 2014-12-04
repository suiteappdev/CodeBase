'use strict'

angular.module('formModule', [])
       .controller('fetchController', function($scope, $http){
            $scope.formCollection = [
                    {name : 'frmPreguntar', url  : '../public/views/frm-preguntar.html'},
                    {name : 'frmServicios', url  : '../public/views/frm-servicios.html'},
                    {name : 'frmPreguntar', url  : '../public/views/frm-preguntar.html'},
                    {name : 'frmPreguntar', url  : '../public/views/frm-preguntar.html'},
                    {name : 'frmPreguntar', url  : '../public/views/frm-preguntar.html'}
                ]; 
            
            angular.forEach($scope.formCollection, function(index, form){
                $http.get(form.url)
                     .success(function(res, status){
                        $scope[form.name] = res;
                     });
            });
        })
    




