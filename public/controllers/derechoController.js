angular.module('derechoModule', ['configurationModule', 'estadoModule', 'modelModule', 'selectModule', 'confirmModule', 'formModule'])
       .controller('derechoFormController', function($scope, $http, $timeout, $route,  $http, $myConfiguration, $model, $estadosService){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };

              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              $scope.loader = false;
              $scope.estados = [];
              $scope.formData = {};
              $scope.formData.estado = {
                     val : null,
                     text : null,
                     tag : null
              };
              
                            
              $scope.clearselection = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.formData.derecho = '';
                     $scope.formData.descripcion = '';
              }
              
              $scope.clearselection();

              $estadosService.success(function(data){
                     $scope.estados = data;
              });
              
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
                     if(!row){
                            return;
                     }

                     $scope.setSelectedRow(row._id);
                     $scope.CmdSave = false;
                     $scope.CmdUpdate = true;
                     
                     $scope.formData._id = row._id;
                     $scope.formData.derecho = row.derecho;
                     $scope.formData.descripcion = row.descripcion;
                     $scope.formData.estado ={
                            val    : row.estado._id,
                            text   : row.estado.descripcion,
                            tag    :row.estado.tag
                     }
                     
              }
              
              $scope.update = function(){
                     $scope.loader = true;
                     $model.CRUD.Update({
                            resource : 'derechos/',
                            id       : $scope.formData._id,
                            data : $scope.formData     
                     }).success(function(data, status){
                            $model.CRUD.Select('derechos').success(function(data, status){
                                   $scope.derechos = data; 
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
                     }).modal('show');
              }
              
       });
