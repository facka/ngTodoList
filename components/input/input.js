
angular.module('components').factory('Input', function(Define) {
  var count = 0;
  var Input = function(attrs) {
    Input.super(this, attrs);
    this.id = 'input-'+count++;
    this.type = attrs.type;
    this.size = attrs.size;
    this.model = attrs.model || '';
    this.placeHolder = attrs.placeHolder;
    //this.onEnter = attrs.onEnter;
    this.onClick = attrs.onClick;
    this.label = attrs.label;
    this.templateURL = 'components/input/input.html';
  };

  Input.super = Define(Input).as('UiComponent');

  Input.prototype.clear = function() {
    this.model = '';
  };

  Input.prototype.onKeyUp = function(event) {
    if(event.keyCode == 13 && this.model){
        //this.onEnter(this.model);
        this.notifyEnter(this.model);
    }
  };

  Input.prototype.onEnter = function(callback) {
    this.notifyEnter = callback;
  };

  return Input;
});