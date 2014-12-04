var model = angular.module('modelModule', ['configurationModule']);
    model.factory('$model', function($myConfiguration, $http){
        function Select(resource){
            return $http.get($myConfiguration.backend + resource);
        }
        function Create (data){
            return $http.post($myConfiguration.backend + data.resource, data.data);
        }
        
        function Update(data){
            return $http.put($myConfiguration.backend + data.resource + data.id, data.data);
        }
        
        function Delete(data){
            return $http.delete($myConfiguration.backend + data.resource + '/' + data.id);
        }
        
        return {
            CRUD : {
                Select  : Select,
                Create  : Create,
                Update  : Update,
                Delete  : Delete
            }
        }
    });