
angular.module('components').directive('uiInput', function() {
    return {
        restrict: 'E',
        scope: {
            'instance': '='
        },
        //templateUrl: 'components/input/input.html',
        template: '<input id="{{::ctrl.instance.id}}" type="{{ctrl.instance.type}}" ng-model="ctrl.instance.model"  size="{{ctrl.instance.size}}"'+
                  'placeholder="{{ctrl.instance.placeHolder}}" ng-keyup="ctrl.instance.onKeyUp($event)" ng-click="ctrl.instance.onClick()"/>'+
                  '<label ng-if="ctrl.instance.label" for="{{::ctrl.instance.id}}">{{ctrl.instance.label}}</label>',
        controller: 'InputCtrl',
        controllerAs: 'ctrl',
        bindToController: true
    };
})

.controller('InputCtrl', function() {
  var vm = this;
})

.factory('Input', function() {
  var count = 0;
  var Input = function(attrs) {
    this.id = 'input-'+count++;
    this.type = attrs.type;
    this.size = attrs.size;
    this.model = '';
    this.placeHolder = attrs.placeHolder;
    this.onEnter = attrs.onEnter;
    this.onClick = attrs.onClick;
    this.label = attrs.label;

  };

  Input.prototype.clear = function() {
    this.model = '';
  };

  Input.prototype.onKeyUp = function(event) {
    if(event.keyCode == 13 && this.model){
        this.onEnter(this.model);
    }
  };

  return Input;
});