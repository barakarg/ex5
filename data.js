/**
 * Data model.
 */

var uuid = require('./lib/node-uuid');

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
    }
};