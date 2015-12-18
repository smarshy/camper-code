angular.module("todoListApp", [])
.controller('mainCtrl', function($scope,dataService) {

  dataService.getTodos(function(response) {  
      $scope.todos = response.data;
    });

})
.service('dataService', function($http) {

  this.getTodos = function(callback){
    $http.get('mock/todos.json').then(callback)
  };  
  
});