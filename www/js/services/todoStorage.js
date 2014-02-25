'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
todomvc.factory('todoStorage', ['$http', function ($http) {
    return {
        query: function (successHandler, errorHandler) {
            console.log('-- query');
            $http.get('/item')
                .success(function (items) {
                    if (successHandler) successHandler(items);
                })
                .error(function () {
                    if (errorHandler) errorHandler();
                });
        },

        create: function (object, successHandler, errorHandler) {
            console.log('-- create');
            $http.post('/item', object)
                .success(function () {
                    if (successHandler) successHandler();
                })
                .error(function () {
                    if (errorHandler) errorHandler();
                });
        },

        update: function (object, successHandler, errorHandler) {
            console.log('-- update');
            $http.put('/item', object)
                .success(function () {
                    if (successHandler) successHandler();
                })
                .error(function () {
                    if (errorHandler) errorHandler();
                });
        },

        remove: function (object, successHandler, errorHandler) {
            console.log('-- remove');
            $http.delete('/item', {
                data: object,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function () {
                    if (successHandler) successHandler();
                })
                .error(function () {
                    if (errorHandler) errorHandler();
                });
        }
    };
}]);
