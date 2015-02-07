angular.module('abogadosModule', [
       'configurationModule',
       'modelModule',
       'selectModule',
       'confirmModule',
       'defaultselectModule',
       'dropdownSelectModule',
       'cropperModule'
       ])
       .controller('abogadosController', function($scope, $http, $timeout, $route,  $http, $myConfiguration, $model){
              $scope.idSelectedRow = null;
              
              $scope.setSelectedRow = function (idSelected) {
                 $scope.idSelectedRow = idSelected;
              };
              
              $scope.CmdSave = true;
              $scope.CmdUpdate = false;
              $scope.loader = false;
              $scope.showMessage = false;

              $scope.formData = {};
              $scope.abogados = [];
              $scope.gender = [];
              
              
              $scope.formData.firstName ='';
              $scope.formData.secondName = '';
              $scope.formData.imageData = null;
              $scope.formData.gender = {
                     val : null,
                     text : null
              }
              
              $scope.formData.username = '';
              $scope.formData.email = '';
              $scope.formData.image = '';
              $scope.formData.biography = '';
              $scope.formData.birth = '';
              $scope.formData.derechos = [];
              $scope.formData.password = '';
              $scope.formData.phone = '';
              $scope.formData.derecho = {
                     val : null,
                     text : null
              }
              
              $scope.onChangeImage = function(){
                     alert(1);
              }
              
              $scope.formData.derechosStack = [];
              
              $scope.pushDerechoOnStack = function(derecho){
                     if(!derecho.val || $scope.exist(derecho)){
                            return;
                     }
                     
                  $scope.formData.derechosStack.push(derecho);   
              }
              
              $scope.popDerechoOnStack = function(val){
                     angular.forEach($scope.formData.derechosStack, function(derecho, index){
                            if(derecho.val === val){
                                   $scope.formData.derechosStack.splice(index, 1);
                            }
                     });
              }
              
              $scope.exist = function(target){
                     angular.forEach($scope.formData.derechosStack, function(derecho, index){
                            return derecho._id === target._id ? true : false;
                     });
              }
              
              $scope.clearDerechosStack = function(){
                     if($scope.formData.derechosStack.length > 0){
                            $scope.derechosStack.length = 0;
                     }
              }

              $scope.new = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     $scope.idSelectedRow = null;
                     
                     $scope.clearselection();
              }

              $scope.clearselection = function(){
                     $scope.CmdSave = true;
                     $scope.CmdUpdate = false;
                     
                     $scope.formData.firstName ='';
                     $scope.formData.secondName = '';
                     $scope.formData.gender = '';
                     $scope.formData.username = '';
                     $scope.formData.email = '';
                     $scope.formData.image = '';
                     $scope.formData.biography = '';
                     $scope.formData.birth = '';
                     $scope.formData.derechos.length = 0;
                     $scope.formData.password = '';
                     $scope.formData.phone = '';
              }

              $model.CRUD.Select('abogados').success(function(data, status){
                     $scope.abogados = data;      
              });

              $scope.submitForm = function(){
                     $scope.loader = true;
                     
                     $model.CRUD.Create({
                            resource : 'abogados/',
                            data     : $scope.formData
                     }).success(function(data, status){
                            if(data.onError){
                                   $scope.showMessage = true;
                            }else{
                                   $timeout(function(){
                                          $scope.loader = false
                                          $scope.addRow(data);  
                                   }, 3000);
   
                            }
                     });
              }
              
              $scope.addRow  = function(data){
                     $scope.abogados.push(data);
                     $scope.clearselection();
              }
              
              $scope.editRow = function(row){
                     if(!row){
                            return;
                     }

                     $scope.setSelectedRow(row._id);
                     $scope.CmdSave = false;
                     $scope.CmdUpdate = true;
                     
                     $scope.formData._id = row._id;
                     $scope.formData.firstName = row.firstName,
                     $scope.formData.secondName = row.apellidos;
                     $scope.formData.email = row.email;
                     $scope.formData.username = row.username;
                     $scope.formData.biography = row.biography;
                     $scope.formData.image = '';
                     $scope.formData.phone = row.phone;
                     $scope.formData.birth = row.birth;
                     $scope.formData.derechos = row.derechos;
                     $scope.formData.password = row.password;

              }
              
              $scope.update = function(){
                     $scope.loader = true;
                     $model.CRUD.Update({
                            resource : 'abogados/',
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
                                          resource : 'abogados',
                                          id:id
                                   }).success(function(data, status){
                                          angular.forEach($scope.abogados, function(abogado, index){
                                                 if(abogado._id == id){
                                                        $scope.abogados.splice(index, 1);
                                                 }
                                          });
                                   });
                            }
                     }).modal('show');
              }
              
       });