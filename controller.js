app.controller('TodoCtrl', ['$scope','Input','List','TodoList', function($scope, Input, List, TodoList) {

  $scope.todoList = new TodoList();

}]);
