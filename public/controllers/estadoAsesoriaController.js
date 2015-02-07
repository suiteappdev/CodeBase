angular.module('estadoAsesoriaModule', ['configurationModule', 'modelModule', 'selectModule'])
       .controller('estadoAsesoriaController', function($scope, $timeout, $http, $myConfiguration, $model){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };
              
              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              
              $scope.formData = {};
              
              $scope.formData.estado = '';
              $scope.formData.descripcion = '';
              $scope.estadoAsesorias = [];
              
              $scope.loader = false;
              
              $scope.formData = {};
              
              $model.CRUD.Select('estadoAsesorias').success(function(data, status){
                     $scope.estadoAsesorias = data;      
              });
              
              
              $scope.submitForm = function(){
                     $scope.loader = true;
                     
                     $model.CRUD.Create({
                            resource : 'estadoAsesorias/',
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
              
              $scope.clearselection = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.formData.estado = '';
                     $scope.formData.descripcion = '';
              }
              
              $scope.new = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.idSelectedRow = null;
                     
                     $scope.clearselection();
              }
              
              
              
              $scope.addRow  = function(data){
                     $scope.estadoAsesorias.push(data);
                     $scope.formData.estado = '';
                     $scope.formData.descripcion = '';

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
                            resource : 'estadoAsesorias/',
                            id       : $scope.formData._id,
                            data : $scope.formData     
                     }).success(function(data, status){
                            $model.CRUD.Select('estadoAsesorias').success(function(data, status){
                                   $scope.estadoAsesorias = data; 
                                   
                                   $timeout(function(){
                                          $scope.loader = false
                                   }, 3000);

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
                                          resource : 'estadoAsesorias',
                                          id:id
                                   }).success(function(data, status){
                                          angular.forEach($scope.estadoAsesorias, function(estadoAsesoria, index){
                                                 if(estadoAsesoria._id == id){
                                                        $scope.estadoAsesorias.splice(index, 1);
                                                 }
                                          });
                                   });
                            }
                     }).modal('show');
              }
              
       });
