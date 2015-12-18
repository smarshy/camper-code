angular.module("todoListApp", [])
.controller('mainCtrl', function($scope) {

$scope.todos = getTodos

})
.service('dataService', function($http) {

  this.getTodos = function(callback){
    $http.get('mock/todos.json')
    .then(callback)
  };  
  
});