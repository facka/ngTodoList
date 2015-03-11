app.factory('TodoList', ['Define','TodoListItem','Input','List', function(Define, TodoListItem, Input, List) {
  var TodoList = function() {
    TodoList.super(this, {
      itemFactory: TodoListItem
    });
    var _this = this;
    this.input = new Input({
      type : 'text',
      size: 30,
      placeHolder: 'Insert task...',
      onEnter: function(model) {
        _this.addItem({text:model, done:false});
        _this.input.clear();
      },
      onClick: function() {
        console.log('clicked!');
      }
    });

    this.toggleAll = new Input({
      type : 'checkbox',
      onClick: function() {
        angular.forEach(_this.items, function(todo) {
          todo.model.done = _this.toggleAll.model;
        });
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