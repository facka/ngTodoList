var htmlReady;
angular.module('components',['ngInheritance'])
    .run(function($templateCache, $http, $q) {

        var defer = $q.defer();
        htmlReady = defer.promise;

        var htmls = {
            'components/input/input.html': $http.get('components/input/input.html'),
            'components/input/inputCheckbox.html': $http.get('components/input/inputCheckbox.html'),
            'components/input/inputCheckbox2.html': $http.get('components/input/inputCheckbox2.html')
        };
        $q.all(htmls).then(function(response) {
            for (var i in response) {
                $templateCache.put(i, response[i].data);
            }

            defer.resolve();
        });
        /*
        $http.get('components/input/input.html').then(function(response) {
            $templateCache.put('components/input/input.html', response.data);
            defer.resolve();
        });

        $http.get('components/input/input.html').then(function(response) {
            $templateCache.put('components/input/input.html', response.data);
            defer.resolve();
        });*/

    })
    .directive('tag', function($templateCache, $compile) {
        return {
            restrict: 'A',
            scope: {
                'tag': '='
            },
            controller: 'UiComponentCtrl',
            replace: true,
            //controllerAs: 'ctrl',
            //bindToController: true,
            link: function($scope, $element, $attr) {

              //var $compile = $injector.get('$compile');
              //var $templateCache = $injector.get('$templateCache');

              $scope.refresh = function() {
                if ($scope.$$childHead) {
                  $scope.$$childHead.$destroy();
                }
                if ($scope.$$childTail) {
                  $scope.$$childTail.$destroy();
                }
                $element.empty();
                if ($scope.tag) {
                   if ($scope.tag.visible) {
                      /*var itemScope = $scope.$new();
                      itemScope.tag = item;*/

                      htmlReady.then(function(){
                        var html = $templateCache.get($scope.tag.templateURL);
                        var content = $compile(html)($scope);
                        if ($scope.tag.compile) {
                          $scope.tag.compile(content);
                        }
                        $element.append(content);
                      });

                   }
                }
              };
              $scope.tag._refresh = $scope.refresh;
              $scope.tag._refresh();
            }
        };
    })

    .directive('uiComponent', function($templateCache, $compile, $parse) {

        var camelize = function(value) {
            var names = value.split('.');
            var result = names.shift();
            names.forEach(function(name) {
              result += '.' + _.camelCase(name);
            });
            return result;
        };
        var dashify = function(value) {
            var names = value.split('.');
            var result = names.shift();
            names.forEach(function(name) {
              result += '.' + _.snakeCase(name);
            });
            return result;
        };

        return {
            restrict: 'E',
            controller: 'UiComponentCtrl',
            //replace: true,
            link: function($scope, $element, $attr) {

              var componentName;
              for (var attr in $attr.$attr) {
                componentName = camelize(attr);
                break;
              }

              var uiComponent = $parse(componentName)($scope);

              var scope = $scope.$new();

              scope.uiComponent = uiComponent;

              scope.refresh = function() {
                /*if ($scope.$$childHead) {
                  $scope.$$childHead.$destroy();
                }
                if ($scope.$$childTail) {
                  $scope.$$childTail.$destroy();
                }*/
                $element.empty();
                if (uiComponent) {
                   if (uiComponent.visible) {
                      htmlReady.then(function(){
                        var html = $templateCache.get(uiComponent.templateURL);
                        var content = $compile(html)(scope);
                        if (uiComponent.compile) {
                          uiComponent.compile(content);
                        }
                        $element.append(content);
                      });

                   }
                }
              };
              uiComponent._refresh = scope.refresh;
              uiComponent._refresh();
            }
        };
    })

    .controller('UiComponentCtrl', function() {
      var vm = this;
    });
