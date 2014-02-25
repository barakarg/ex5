'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'TodoCtrl',
      templateUrl: 'partials/todomvc-index.html'
    }).when('/:status', {
      controller: 'TodoCtrl',
      templateUrl: 'partials/todomvc-index.html'
    }).otherwise({
      redirectTo: '/'
    });
  });
