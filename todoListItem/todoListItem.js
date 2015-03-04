app.factory('TodoListItem', ['Define', function(Define) {
  var TodoListItem = function(item) {
    TodoListItem.super(this, {
      visible: true,
      editable: false,
      templateURL: 'todoListItem/todoListItem.html'
    });
    this.model = item;
  };

  TodoListItem.super = Define(TodoListItem).as(['ListItem']);

  TodoListItem.prototype.onDoubleClick = function() {
    this.editable = !this.editable;
    this.lastValue = {};
    for(var i in this.model) {
      if (this.model.hasOwnProperty(i)) {
        this.lastValue[i] = this.model[i];
      }
    }
  };

  TodoListItem.prototype.keyUp = function(event) {
    if(event.keyCode == 13){
        this.onEnter();
    }
    if(event.keyCode == 27){
        this.onScape();
    }
  };

  TodoListItem.prototype.onEnter = function() {
    this.editable = !this.editable;
  };

  TodoListItem.prototype.onScape = function() {
    this.model = this.lastValue;
    this.editable = !this.editable;
  };

  return TodoListItem;
}]);
