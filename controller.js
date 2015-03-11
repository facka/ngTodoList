app.controller('TodoCtrl', ['$scope','TodoList', function($scope, TodoList) {

  $scope.todoList = new TodoList();

}]);
