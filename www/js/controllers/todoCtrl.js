'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, todoStorage, filterFilter) {
    $scope.todos = [];
    todoStorage.query(function (items) {
        $scope.todos = items;
    });

    $scope.newTodo = '';
    $scope.editedTodo = null;

    // watch for changes in the todos list and update counters
    $scope.$watch('todos', function () {
        $scope.remainingCount = filterFilter($scope.todos, { completed: false }).length;
        $scope.completedCount = $scope.todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function () {
        var status = $scope.status = $routeParams.status || '';
        // update filter
        $scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;
    });

    // add new item handler
    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) return;

        todoStorage.add({
            title: newTodo,
            completed: false
        }, function (item) {
            $scope.todos.push(item);
        });

        $scope.newTodo = '';
    };

    // edit item handler
    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.editedTodoRevert = angular.extend({}, todo);
    };

    // editing finished item handler
    $scope.doneEditing = function (todo) {
        todo.title = todo.title.trim();
        if (!todo.title) {
            $scope.removeTodo(todo);
        } else {
            todoStorage.update(todo, function (item) {
                todo = item;
            });
        }

        $scope.editedTodo = null;
        $scope.editedTodoRevert = null;
    };

    // cancel editing item handler
    $scope.revertEditing = function (todo) {
        //todos[todos.indexOf(todo)] = $scope.editedTodoRevert;
        //$scope.doneEditing($scope.editedTodoRevert);
    };

    // remove item handler
    $scope.removeTodo = function (todo) {
        //todos.splice(todos.indexOf(todo), 1);
        todoStorage.remove(todo, function (items) {
            $scope.todos = items;
        });
    };

    // remove completed items handler
    $scope.clearCompletedTodos = function () {
        todoStorage.filter(function (val) {
            return !val.completed;
        }, function (items) {
            $scope.todos = items;
        });
    };

    // check all items handler
    $scope.markAll = function (completed) {
        $scope.todos.forEach(function (todo) {
            todo.completed = !completed;
            todoStorage.update(todo, function (item) {
                todo = item;
            });
        });
    };
});
