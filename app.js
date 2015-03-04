var app = angular.module('ngApp', ['components','ngInheritance']);

app.run(function($templateCache, $http) {

    $http.get('todoListItem/todoListItem.html').then(function(response) {
        $templateCache.put('todoListItem/todoListItem.html', response.data);
    });

});