angular.module('tipoClienteModule', ['configurationModule', 'estadoModule', 'modelModule', 'selectModule', 'confirmModule', 'formModule', 'defaultselectModule'])
       .controller('tipoClienteController', function($scope, $http, $timeout, $route,  $http, $myConfiguration, $model, $estadosService){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };
              
              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              $scope.loader = false;

              $scope.tipoClientes = [];
              $scope.formData = {};
              $scope.formData.tipoCliente ='';
              $scope.formData.descripcion = '';

              $scope.new = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.idSelectedRow = null;
                     
                     $scope.clearselection();
              }

              $scope.clearselection = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.formData.tipoCliente ='';
                     $scope.formData.descripcion = '';
              }

              $model.CRUD.Select('tipoCliente').success(function(data, status){
                     $scope.tipoClientes = data;      
              });

              $scope.submitForm = function(){
                     $model.CRUD.Create({
                            resource : 'tipoCliente/',
                            data     : $scope.formData
                     }).success(function(data, status){
                            if(data){
                                   $scope.addRow(data);
                            }
                     });
              }
              
              $scope.addRow  = function(data){
                     $scope.tipoClientes.push(data);
                     $scope.formData.tipoCliente = '';
                     $scope.formData.descripcion = '';
              }
              
              $scope.editRow = function(row){
                     if(!row){
                            return;
                     }

                     $scope.setSelectedRow(row._id);
                     $scope.CmdSave = false;
                     $scope.CmdUpdate = true;
                     
                     $scope.formData._id = row._id;
                     $scope.formData.tipoCliente = row.tipoCliente;
                     $scope.formData.descripcion = row.descripcion;

              }
              
              $scope.update = function(){
                     $scope.loader = true;
                     $model.CRUD.Update({
                            resource : 'tipoCliente/',
                            id       : $scope.formData._id,
                            data : $scope.formData     
                     }).success(function(data, status){
                            $model.CRUD.Select('tipoCliente').success(function(data, status){
                                   $scope.tipoClientes = data; 
                                   $scope.loader = false;
                                   $scope.clearselection();
                            });
                     });
              }
              
              $scope.removeRow = function(id){
                     $('.basic.test.modal').modal({
                            onDeny : function(){
                                   
                            },
                            onApprove : function(){
                                   $model.CRUD.Delete({
                                          resource : 'tipoCliente',
                                          id:id
                                   }).success(function(data, status){
                                          angular.forEach($scope.tipoClientes, function(tipoCliente, index){
                                                 if(tipoCliente._id == id){
                                                        $scope.tipoClientes.splice(index, 1);
                                                 }
                                          });
                                   });
                            }
                     }).modal('show');

              }
              
       });