'use strict';

/**
 * The login controller for the app. The controller:
 * - enables login
 * - enables registration
 */
todomvc.controller('LoginCtrl', function LoginCtrl($scope, $route, $http, $cookies, $location) {
    // if authenticated - redirect to login
    if ($cookies.sessionId) {
        $location.url('/');
    }


    $scope.username = '';
    $scope.fullName = '';
    $scope.password = '';
    $scope.passwordConfirmation = '';

    $scope.login = function (username, password) {
        var data = {username: username, password: password};

        $http.post('/login', data)
            .success(function () {
                console.log('ok');
                $route.reload();
            })
            .error(function (err) {
                $scope.error = err.msg;
            });
    };

    $scope.register = function (username, fullName, password, passwordConfirmation) {
        var data = {
            username: username,
            fullName: fullName,
            password: password,
            passwordConfirmation: passwordConfirmation
        };

        $http.post('/register', data)
            .success(function () {
                console.log('ok');
                $route.reload();
            })
            .error(function (err) {
                $scope.error = err.msg;
            });
    };

});
