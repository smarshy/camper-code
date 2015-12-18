angular.module("todoListApp", [])
.controller('mainCtrl', function($scope,dataService) {

  dataService.getTodos(function(response) {  
      $scope.todos = response.data;
    });

  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo);
    $scope.todos.splice(index, 1);
  };

})
.service('dataService', function($http) {

  this.getTodos = function(callback){
    $http.get('mock/todos.json').then(callback)
  };  

  this.deleteTodo = function(todo) {
    console.log("The " + todo.name + " todo has been deleted!");
  };
  
});