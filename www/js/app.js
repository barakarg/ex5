'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['ngRoute', 'ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'partials/todomvc-login.html'
            })
            .when('/', {
                controller: 'TodoCtrl',
                templateUrl: 'partials/todomvc-index.html'
            })
            .when('/:status', {
                controller: 'TodoCtrl',
                templateUrl: 'partials/todomvc-index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
