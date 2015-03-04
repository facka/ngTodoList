
angular.module('components').directive('uiListItem', function($templateCache) {
    return {
        restrict: 'E',
        scope: {
            'instance': '='
        },
        template: function(elem, attrs) {
          var url = '';
          if (attrs.hasOwnProperty('url')) {
            url = attrs.url;
          }
          else {
            url = 'components/list/listItem.html';
          }
          var html = $templateCache.get(url);
          return html;
        },
        controller: 'ListItemCtrl',
        controllerAs: 'ctrl',
        bindToController: true
    };
})

.controller('ListItemCtrl', function() {
  var vm = this;
})

.factory('ListItem', function(Define) {
  var count = 0;
  var ListItem = function(attrs) {
    ListItem.super(this, attrs);
    this.id = 'input-'+count++;
    this.editable = attrs.editable;
    this.model = attrs.model;
    this.templateURL = attrs.templateURL;
  };

  ListItem.super = Define(ListItem).as(['UiComponent']);

  ListItem.prototype.clear = function() {
    this.model = '';
  };

  ListItem.prototype.doubleClick = function() {
    this.onDoubleClick();
  };

  return ListItem;
});