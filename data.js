/**
 * Data model.
 */

var uuid = require('./lib/uuid');

var users = {};
var todos = {};


module.exports = {
    users: {
        register: function (object) {
            if (object.username == '') throw "username can't be empty";
            if (object.fullName == '') throw "full name can't be empty";
            if (object.password == '') throw "password can't be empty";
            if (object.password != object.passwordConfirmation) throw "password confirmation fail";
            if (object.username in users) throw "username taken";
            console.log(object);
            // create user and session
            var user = {
                name: object.name,
                username: object.username,
                password: object.password,
                sessionId: uuid.v1()
            };
            users[object.username] = user;

            return user;
        },

        login: function (object) {
            var user = users[object.username];
            if (typeof user == "undefined") throw "invalid username";

            // check password
            if (user.password !== object.password) throw "wrong password";

            // create session
            user.sessionId = uuid.v1();
            return user;
        },

        logout: function (sessionId) {
            // destroy session
            for (var username in users) {
                if (users[username].sessionId == sessionId) {
                    users[username].sessionId = null;
                }
            }
        },

        remove: function (username) {
            delete users[username];
        }
    },

    todos: {
        list: function () {
            console.log('- list');
            var values = [];
            for (var id in todos) {
                values.push(todos[id]);
            }
            return values;
        },

        create: function (object) {
            console.log('- create', object);
            if (object.id in todos) throw "id already existing";
            todos[object.id] = object;
        },

        update: function (object) {
            console.log('- update', object);
            if (!(object.id in todos)) throw "invalid id";
            todos[object.id] = object;
        },

        delete: function (object) {
            console.log('- delete', object);
            if (object.id != -1 && !(object.id in todos)) throw "invalid id";

            if (object.id == -1) {
                for (var id in todos) {
                    if (todos[id].completed) {
                        delete todos[id];
                    }
                }
            }
            else {
                delete todos[object.id];
            }
        }
    }
};