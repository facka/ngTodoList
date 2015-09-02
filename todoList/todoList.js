app.factory('TodoList', ['Define','TodoListItem','Input','List','InputCheckbox', function(Define, TodoListItem, Input, List, InputCheckbox) {

  var TodoList = function() {
    TodoList.super(this, {
      itemFactory: TodoListItem
    });
    var _this = this;

    this.input = new Input({
      type : 'text',
      size: 30,
      placeHolder: 'Insert task...'
    });

    this.input.onEnter(function (model) {
      _this.addItem({text:model, done:false});
      _this.input.clear();
    });

    this.toggleAll = new InputCheckbox({
      onClick: function(event, value) {
        _this.checkAll(value);
      },
      label: 'Mark all as complete'
    });

  };

  TodoList.super = Define(TodoList).as(['List']);

  TodoList.prototype.isTodo = function(){
      return this.items.length > 0;
  };

  TodoList.prototype.remaining = function() {
    var count = 0;
    angular.forEach(this.items, function(item) {
      count += item.model.done ? 0 : 1;
    });
    return count;
  };

  TodoList.prototype.checkAll = function(value) {
    angular.forEach(this.items, function(item) {
      item.model.done = value;
    });
  };

  TodoList.prototype.hasDone = function() {
      return (this.items.length != this.remaining());
  };

  TodoList.prototype.itemText = function() {
      return (this.items.length - this.remaining() > 1) ? "items" : "item";
  };

  TodoList.prototype.clear = function() {
    var oldTodos = this.items;
    this.items = [];
    var _this = this;
    angular.forEach(oldTodos, function(todo) {
      if (!todo.model.done) _this.items.push(todo);
    });
    this.refresh();
    if (this.items.length === 0) {
      this.toggleAll.model = false;
    }
  };

  return TodoList;
}]);