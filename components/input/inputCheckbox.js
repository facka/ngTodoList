
angular.module('components').directive('uiInputCheckbox', function() {
    return {
        restrict: 'E',
        scope: {
            'instance': '='
        },
        templateUrl: 'components/input/input.html',
        /*template: '<input id="{{::ctrl.instance.id}}" type="{{ctrl.instance.type}}" ng-model="ctrl.instance.model"  size="{{ctrl.instance.size}}"'+
                  'placeholder="{{ctrl.instance.placeHolder}}" ng-keyup="ctrl.instance.onKeyUp($event)" ng-click="ctrl.instance.onClick()"/>'+
                  '<label ng-if="ctrl.instance.label" for="{{::ctrl.instance.id}}">{{ctrl.instance.label}}</label>',*/
        controller: 'InputCheckboxCtrl',
        controllerAs: 'ctrl',
        bindToController: true
    };
})

.controller('InputCheckboxCtrl', function(Define) {
  var vm = this;
})

.factory('InputCheckbox', function() {
  var count = 0;
  var InputCheckbox = function(attrs) {
    InputCheckbox.super(this, attrs);
    this.id = 'input-'+count++;
    this.type = 'checkbox';
    this.model = false;
    this.onEnter = attrs.onEnter;
    this.onClick = attrs.onClick;
    this.label = attrs.label;
    this.templateURL = 'components/input/input.html';

  };

  InputCheckbox.super = Define(InputCheckbox).as(['Input']);

  InputCheckbox.prototype.clear = function() {
    this.model = '';
  };

  InputCheckbox.prototype.onKeyUp = function(event) {
    if(event.keyCode == 13 && this.model){
        this.onEnter(this.model);
    }
  };

  return InputCheckbox;
});