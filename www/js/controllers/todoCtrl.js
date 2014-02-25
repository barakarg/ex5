'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, todoStorage, filterFilter) {
    var todos = $scope.todos = todoStorage.get();

    $scope.newTodo = '';
    $scope.editedTodo = null;

    // watch for changes in the todos list and update counters and storage
    $scope.$watch('todos', function (newValue, oldValue) {
        $scope.remainingCount = filterFilter(todos, { completed: false }).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
        if (newValue !== oldValue) { // This prevents unneeded calls to the server
            todoStorage.put(todos);
        }
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

        todos.push({
            title: newTodo,
            completed: false
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
        $scope.editedTodo = null;
        $scope.editedTodoRevert = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
            $scope.removeTodo(todo);
        }
    };

    // cancel editing item handler
    $scope.revertEditing = function (todo) {
        todos[todos.indexOf(todo)] = $scope.editedTodoRevert;
        $scope.editedTodo = null;
        $scope.editedTodoRevert = null;
        $scope.doneEditing($scope.editedTodoRevert);
    };

    // remove item handler
    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    // remove completed items handler
    $scope.clearCompletedTodos = function () {
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        });
    };

    // check all items handler
    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            todo.completed = !completed;
        });
    };
});
