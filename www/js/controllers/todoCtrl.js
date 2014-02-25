'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, todoStorage, filterFilter) {
    $scope.todos = [];
    $scope.nextId = 1;
    todoStorage.query(function (items) {
        $scope.todos = items;
        // keep nextId valid
        for (var i in items) {
            if (items[i].id >= $scope.nextId) {
                $scope.nextId = items[i].id+1;
            }
        }
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
        var item = {
            id: $scope.nextId,
            title: $scope.newTodo.trim(),
            completed: false
        };

        if (!item.title.length) return; // ignore empty todos

        todoStorage.create(item, function () {
            $scope.todos.push(item);
        });

        $scope.newTodo = '';
        $scope.nextId++;
    };

    // edit item handler
    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.editedTodoRevert = angular.extend({}, todo);
    };

    // editing finished item handler
    $scope.doneEditing = function (todo) {
        if (todo == null) return;

        todo.title = todo.title.trim();
        if (!todo.title) {
            $scope.removeTodo(todo);
        } else {
            todoStorage.update(todo, function () {
                // on success - update
                $scope.todos[$scope.todos.indexOf(todo)] = todo;
            }, function () {
                // on fail - revert
                $scope.revertEditing(todo);
            });
        }

        $scope.editedTodo = null;
    };

    // cancel editing item handler
    $scope.revertEditing = function (todo) {
        $scope.todos[$scope.todos.indexOf(todo)] = $scope.editedTodoRevert;
    };

    // completion change handler
    $scope.changeCompleted = function (todo) {
        todo.completed = !todo.completed;
        $scope.doneEditing(todo);
    },

    // remove item handler
    $scope.removeTodo = function (todo) {
        todoStorage.remove(todo, function () {
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        });
    };

    // remove completed items handler
    $scope.clearCompletedTodos = function () {
        todoStorage.remove({id: -1}, function () {
            for (var i in $scope.todos) {
                if ($scope.todos[i].completed) {
                    $scope.todos.splice(i, 1);
                }
            }
        });
    };

    // check all items handler
    $scope.markAll = function (completed) {
        $scope.todos.forEach(function (todo) {
            todo.completed = !completed;
            todoStorage.update(todo, null, function () {
                // on failure - revert
                todo.completed = !todo.completed;
            });
        });
    };
});
