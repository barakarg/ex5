'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
todomvc.factory('todoStorage', ['$resource', function ($resource) {
    var TodoItem = $resource('/api/item/:itemId', // user/:userId/
        {itemId:'@id'}, { // userId:123,
            charge: {method:'POST', params: {charge: true}}
        });

    return {
        query: function (callback) {
            console.log('-- query');
            var items = TodoItem.query(function () {
                if (callback) callback(items);
            });
        },

        add: function (object, callback) {
            console.log('-- add');
            if (callback) callback(object);
        },

        update: function (object, callback) {
            console.log('-- update');
            if (callback) callback(object);
        },

        remove: function (object, callback) {
            console.log('-- remove');
            this.query(callback);
        },

        filter: function (filter, callback) {
            console.log('-- filter');
            this.query(callback);
        },

        get: function () {
            $http.get('phones/phones.json').success(function(data) {
                $scope.phones = data;
            });
        },

        put: function (todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        }
    };
}]);
