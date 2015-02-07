angular.module('estadoClienteModule', ['configurationModule', 'modelModule', 'selectModule', 'formModule'])
       .controller('estadoClienteController', function($scope, $timeout, $http, $myConfiguration, $model){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };
              
              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              $scope.loader = false;
              $scope.estadoClientes = [];
              $scope.formData = {};
              
              $model.CRUD.Select('estadoCliente').success(function(data, status){
                     $scope.estadoClientes = data;      
              });
              
              $scope.submitForm = function(){
                     $scope.loader = true;
                     
                     $model.CRUD.Create({
                            resource : 'estadoCliente/',
                            data     : $scope.formData
                     }).success(function(data, status){
                            if(data){
                                   $timeout(function(){
                                          $scope.loader = false
                                          $scope.addRow(data);
                                   }, 3000);
                            }
                     });
              }
              
              $scope.addRow  = function(data){
                     $scope.estadoClientes.push(data);
                     $scope.formData.descripcion = '';
                     $scope.formData.estado = '';
              }
              
              $scope.editRow = function(row){
                     if(!row){
                            return;
                     }
                     
                     $scope.setSelectedRow(row._id);
                     $scope.CmdSave = false;
                     $scope.CmdUpdate = true;
                     $scope.formData = angular.copy(row);
              }
              
              $scope.update = function(){
                     $scope.loader = true;
                     $model.CRUD.Update({
                            resource : 'estadoCliente/',
                            id       : $scope.formData._id,
                            data : $scope.formData     
                     }).success(function(data, status){
                            $model.CRUD.Select('estadoCliente').success(function(data, status){
                                   $scope.estadoClientes = data;
                                   
                                   $timeout(function(){
                                          $scope.loader = false

                                   }, 3000);

                                   $scope.clearselection();
                            });
                     });
              }
              
              $scope.removeRow = function(id){
                     $model.CRUD.Delete({
                            resource : 'estadoCliente',
                            id:id
                     }).success(function(data, status){
                            angular.forEach($scope.estadoClientes, function(estadoCliente, index){
                                   if(estadoCliente._id == id){
                                          $scope.estadoClientes.splice(index, 1);
                                   }
                            });
                     });
              }
              
       });