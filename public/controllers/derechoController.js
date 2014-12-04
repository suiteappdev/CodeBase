angular.module('derechoModule', ['configurationModule', 'estadoModule', 'modelModule', 'selectModule'])
       .controller('derechoFormController', function($scope, $http, $myConfiguration, $model, $estadosService){
              $scope.formData = {};
              $scope.formData.estado = {};
              
              $scope.refreshEstados = function( ){
                      $estadosService.success(function(data, status){
                            $scope.estados = data;
                     });
              }
              
              $scope.refreshEstados();
              
              $model.CRUD.Select('derechos').success(function(data, status){
                     $scope.derechos = data;      
              });
              
              $scope.submitForm = function(){
                     $model.CRUD.Create({
                            resource : 'derechos/',
                            data     : $scope.formData
                     }).success(function(data, status){
                            if(data){
                                   $scope.addRow(data);
                            }
                     });
              }
              
              $scope.addRow  = function(data){
                     $scope.derechos.push(data);
                     $scope.formData.descripcion = '';
                     $scope.formData.derecho = '';
              }
              
              $scope.editRow = function(row){
                     alert('edit');
              }
              
              $scope.removeRow = function(id){
                     $model.CRUD.Delete({
                            resource : 'derechos',
                            id:id
                     }).success(function(data, status){
                            angular.forEach($scope.derechos, function(derecho, index){
                                   if(derecho._id == id){
                                          $scope.derechos.splice(index, 1);
                                   }
                            });
                     });
              }
              
       });
