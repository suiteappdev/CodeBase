angular.module('estadoModule', ['configurationModule', 'modelModule', 'selectModule'])
       .factory('$estadosService', function($model){

              return $model.CRUD.Select('estados');

       })
       .controller('estadoFormController', function($scope, $http, $myConfiguration, $model){
              $scope.formData = {};
              
              $model.CRUD.Select('estados').success(function(data, status){
                     $scope.estados = data;      
              });
              
              $scope.submitForm = function(){
                     $model.CRUD.Create({
                            resource : 'estados/',
                            data     : $scope.formData
                     }).success(function(data, status){
                            if(data){
                                   $scope.addRow(data);
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
                     $scope.estados.push(data);
                     $scope.formData.descripcion = '';
                     $scope.formData.estado = '';
                     $scope.formData.tag = '';
              }
              
              $scope.editRow = function(row){
                     alert('edit');
              }
              
              $scope.removeRow = function(id){
                     $model.CRUD.Delete({
                            resource : 'estados',
                            id:id
                     }).success(function(data, status){
                            angular.forEach($scope.estados, function(estado, index){
                                   if(estado._id == id){
                                          $scope.estados.splice(index, 1);
                                   }
                            });
                     });
              }
              
       });
