'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
todomvc.factory('todoStorage', ['$http', function ($http) {
    return {
        query: function (callback) {
            console.log('-- query');
            $http.get('/item').success(function(items) {
                if (callback) callback(items);
            });
        },

        create: function (object, callback) {
            console.log('-- create');
            $http.post('/item', object).success(function(item) {
                if (callback) callback(item);
            });
        },

        update: function (object, callback) {
            console.log('-- update');
            $http.put('/item', object).success(function(item) {
                if (callback) callback(item);
            });
        },

        remove: function (object, callback) {
            console.log('-- remove');
            $http.delete('/item', {
                data: object,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(items) {
                if (callback) callback(items);
            });
        }
    };
}]);
