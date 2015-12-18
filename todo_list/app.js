angular.module("todoListApp", [])
.controller('mainCtrl', function($scope) {

$scope.todos = [
    {"name": "clean the room"}, 
    {"name": "write the mail"}, 
    {"name": "visit the office"},
    {"name": "verify the recipe"},
    {"name": "Take bo to the vet"}
  ]

});