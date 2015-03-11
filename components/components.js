var htmlReady;
angular.module('components',['ngInheritance'])
    .run(function($templateCache, $http, $q) {

        var defer = $q.defer();
        htmlReady = defer.promise;

        var htmls = {
            'components/input/input.html': $http.get('components/input/input.html'),
            'components/input/input2.html': $http.get('components/input/input2.html')
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

    .controller('UiComponentCtrl', function() {
      var vm = this;
    });