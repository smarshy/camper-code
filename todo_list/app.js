angular.module("todoListApp", [])
.controller('mainCtrl', function($scope,dataService) {

  dataService.getTodos(function(response) {  
      $scope.todos = response.data;
    });

  $scope.addTodo = function() {
    var todo = {name: "This is a new todo."};
    $scope.todos.push(todo);
  };

  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo);
    $scope.todos.splice(index, 1);
  };

  $scope.saveTodo = function(todo) {
    dataService.saveTodo(todo);
  };

})
.service('dataService', function($http) {

  this.getTodos = function(callback){
    $http.get('mock/todos.json').then(callback)
  };  

  this.deleteTodo = function(todo) {
    console.log("The " + todo.name + " todo has been deleted!");
  };

  this.saveTodo = function(todo) {
    console.log("The " + todo.name + " todo has been saved!");
  };
  
});