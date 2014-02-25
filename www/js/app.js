'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'app/partials/todomvc-login.html'
            })
            .when('/', {
                controller: 'TodoCtrl',
                templateUrl: 'app/partials/todomvc-index.html'
            })
            .when('/:status', {
                controller: 'TodoCtrl',
                templateUrl: 'app/partials/todomvc-index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
