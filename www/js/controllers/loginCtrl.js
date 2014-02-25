'use strict';

/**
 * The login controller for the app. The controller:
 * - enables login
 * - enables registeration
 */
todomvc.controller('LoginCtrl', function LoginCtrl($scope, $routeParams) {
    $scope.login = function () {
        console.log($scope.username, $scope.password);
    }

    $scope.register = function () {
        console.log($scope.username, $scope.password);
    }

});
