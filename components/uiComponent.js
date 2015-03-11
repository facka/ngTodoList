
angular.module('components').factory('UiComponent', function() {
  var UiComponent = function(attrs) {
    this.visible = attrs.visible === undefined ? true : attrs.visible;
  };

  UiComponent.prototype.clean = function() {
    this.model = {};
  };

  UiComponent.prototype.hide = function() {
    this.visible = false;
  };

  UiComponent.prototype.show = function() {
    this.visible = true;
  };

  return UiComponent;
});