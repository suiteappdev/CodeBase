angular.module('estadoModule', ['configurationModule', 'modelModule', 'selectModule', 'formModule'])
       .factory('$estadosService', function($model){

              return $model.CRUD.Select('estados');

       })
       .controller('estadoFormController', function($scope, $timeout, $http, $myConfiguration, $model){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };
              
              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              $scope.loader = false;
              
              $scope.formData = {};
              
              $model.CRUD.Select('estados').success(function(data, status){
                     $scope.estadosCollection = data;      
              });
              
              
              $scope.submitForm = function(){
                     $scope.loader = true;
                     
                     $model.CRUD.Create({
                            resource : 'estados/',
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
              
              $scope.tagMe = function(classname){
                     if($scope.formData.tag == classname){
                            return;
                     }
                     
                     $scope.formData.tag = classname;
              }
              
              $scope.addRow  = function(data){
                     $scope.estadosCollection.push(data);
                     $scope.formData.descripcion = '';
                     $scope.formData.estado = '';
                     $scope.formData.tag = '';
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

              }
              
              $scope.removeRow = function(id){
                     $model.CRUD.Delete({
                            resource : 'estados',
                            id:id
                     }).success(function(data, status){
                            angular.forEach($scope.estadosCollection, function(estado, index){
                                   if(estado._id == id){
                                          $scope.estadosCollection.splice(index, 1);
                                   }
                            });
                     });
              }
              
       });
