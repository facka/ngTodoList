
angular.module('components').factory('InputCheckbox', function(Define) {
  var count = 0;
  var InputCheckbox = function(attrs) {
    InputCheckbox.super(this, attrs);
    this.id = 'input-'+count++;
    this.type = 'checkbox';
    this.model = false;
    this.onEnter = attrs.onEnter;
    this.onClick = attrs.onClick;
    this.label = attrs.label;
    this.templateURL = 'components/input/inputCheckbox.html';

  };

  InputCheckbox.super = Define(InputCheckbox).as(['Input']);

  InputCheckbox.prototype.onKeyUp = function(event) {
    if(event.keyCode == 13 && this.model){
        this.onEnter(this.model);
    }
  };

  InputCheckbox.prototype.compile = function(html) {

  };

  return InputCheckbox;
});