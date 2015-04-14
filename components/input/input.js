
angular.module('components').directive('uiInput', function() {
    return {
        restrict: 'E',
        scope: {
            'instance': '='
        },
        templateUrl: 'components/input/input.html',
        /*template: '<input id="{{::ctrl.instance.id}}" type="{{ctrl.instance.type}}" ng-model="ctrl.instance.model"  size="{{ctrl.instance.size}}"'+
                  'placeholder="{{ctrl.instance.placeHolder}}" ng-keyup="ctrl.instance.onKeyUp($event)" ng-click="ctrl.instance.onClick()"/>'+
                  '<label ng-if="ctrl.instance.label" for="{{::ctrl.instance.id}}">{{ctrl.instance.label}}</label>',*/
        controller: 'InputCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        link: function($scope, $element, $attr) {
          var input = $element.find('input')[0];
          input.onclick = $scope.ctrl.instance.onClick.bind($scope.ctrl.instance);
          input.onkeyup = $scope.ctrl.instance.onKeyUp.bind($scope.ctrl.instance);
        }
    };
})

.controller('InputCtrl', function() {
  var vm = this;
})

.factory('Input', function(Define) {
  var count = 0;
  var Input = function(attrs) {
    Input.super(this, attrs);
    this.id = 'input-'+count++;
    this.type = attrs.type;
    this.size = attrs.size;
    this.model = '';
    this.placeHolder = attrs.placeHolder;
    this.onEnter = attrs.onEnter;
    this.onClick = attrs.onClick;
    this.label = attrs.label;
    this.templateURL = 'components/input/input2.html';
  };

  Input.super = Define(Input).as('UiComponent');

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