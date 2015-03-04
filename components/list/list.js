
angular.module('components').directive('uiList', function($injector) {
    return {
        restrict: 'E',
        scope: {
            'instance': '='
        },
        //templateUrl: 'components/list/list.html',
        controller: 'ListCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        link: function($scope, $element, $attr) {
          $scope.refresh = function(items) {
            if ($scope.$$childHead) {
              $scope.$$childHead.$destroy();
            }
            if ($scope.$$childTail) {
              $scope.$$childTail.$destroy();
            }
            $element.empty();
            if (items) {
              items.forEach(function(item) {
                if (item.visible) {
                  var itemScope = $scope.$new();
                  itemScope.instance = item;
                  var $compile = $injector.get('$compile');
                  var content = $compile('<ui-list-item url="'+item.templateURL+'" instance="instance"></ui-list-item>')(itemScope);
                  $element.append(content);
                }
              });
            }
          };
          $scope.ctrl.instance._refresh = $scope.refresh;
          $scope.ctrl.instance._refresh($scope.ctrl.instance.items);
        }
    };
})

.controller('ListCtrl', function() {
  var vm = this;
})

.factory('List', function(ListItem) {
  var count = 0;
  var List = function(attrs) {
    this.id = 'list-'+count++;
    this.items = [];
    this.itemFactory = attrs.itemFactory;
    if (attrs.items) {
      attrs.items.forEach(function(item) {
        this._addItem(item);
      });
      this.refresh(this.items);
    }

    this.onDoubleClick = attrs.onDoubleClick || function() {};

  };

  List.prototype.refresh = function() {
    if (this._refresh) {
      this._refresh(this.items);
    }
  };

  List.prototype.clear = function() {
    this.model = [];
  };

  List.prototype._addItem = function(item) {
    this.items.push(new this.itemFactory(item));
  };

  List.prototype.addItem = function(item) {
    this._addItem(item);
    this.refresh();
  };

  return List;
});