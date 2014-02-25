/**
 * Data model.
 */

var uuid = require('./lib/uuid');

var users = {};
var todos = {};


function getUserIdByUsername(username) {
    for (var id in users) {
        if (users[id].username == username) {
            return id;
        }
    }
}

function getUserIdBySessionId(sessionId) {
    for (var id in users) {
        if (users[id].sessionId == sessionId) {
            return id;
        }
    }
}

module.exports = {
    users: {
        add: function (object) {
            var id = uuid.v1();
            users[id] = object;
        },

        login: function (object) {
            var user = users[getUserIdByUsername(object.username)];
            if (typeof user == "undefined") return;

            // check password
            if (user.password !== object.password) return;

            // create session
            user.sessionId = uuid.v1();
            return user.sessionId;
        },

        logout: function (sessionId) {
            // destroy session
            users[getUserIdBySessionId(sessionId)].sessionId = null;
        },

        remove: function (id) {
            delete users[id];
        }
    },

    todos: {
        list: function () {
            return todos;
        },

        get: function (id) {
            return todos[id];
        },

        create: function (object) {
            var id = uuid.v1();
            todos[id] = object;
            return todos;
        },

        update: function (id, object) {
            todos[id] = object;
            return todos;
        },

        delete: function (id) {
            delete todos[id];
            return todos;
        }
    }
};