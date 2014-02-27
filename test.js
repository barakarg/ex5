/**
 * Application Server API Test Script
 */

var http = require('http');

var PORT = 3005;

http.globalAgent.maxSockets = 1000;

var defaultOptions = {
    method: 'GET',
    version: '1.1',
    path: '/',
    port: PORT
};

// merges objects
function merge(obj1, obj2) {
    var obj = {};
    for (var opt in obj2) obj[opt] = obj2[opt];
    for (var opt in obj1) obj[opt] = obj1[opt];
    return obj;
}

// error printer
function error(req, res, message, err) {
    console.log('+ err:', message, err, res);
    process.exit(1);
}

// tests list
var TESTS = {
    getItems: function(name, expect) {
        expect = expect || [];
        var options = merge({
            path: '/item'
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (chunk != JSON.stringify(expect, null, '\t')) {
                        error(null, chunk, name);
                    }
                    else {
                        console.log('+ done', name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end();
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    },

    createItem: function(name) {
        var jsonData = JSON.stringify({id: 3, title: "asd", completed: false}, null, '\t');
        var options = merge({
            path: '/item',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (chunk != JSON.stringify({status: 0}, null, '\t')) {
                        error(null, chunk, name);
                    }
                    else {
                        TESTS['getItems']('get item after creation', [{id: 3, title: "asd", completed: false}]);
                        console.log('+ done', name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end(jsonData);
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    },

    updateItem: function(name) {
        var jsonData = JSON.stringify({id: 3, title: "bbb", completed: true}, null, '\t');
        var options = merge({
            path: '/item',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (chunk != JSON.stringify({status: 0}, null, '\t')) {
                        error(null, chunk, name);
                    }
                    else {
                        TESTS['getItems']('get item after update', [{id: 3, title: "bbb", completed: true}]);
                        console.log('+ done', name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end(jsonData);
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    },

    deleteItem: function(name) {
        var jsonData = JSON.stringify({id: 3}, null, '\t');
        var options = merge({
            path: '/item',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (chunk != JSON.stringify({status: 0}, null, '\t')) {
                        error(null, chunk, name);
                    }
                    else {
                        TESTS['getItems']('get items after delete', []);
                        console.log('+ done', name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end(jsonData);
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    },

    registerUser: function(name) {
        var jsonData = JSON.stringify({username: "barak", fullName: "tal", password: "p", passwordConfirmation: "p"}, null, '\t');
        var options = merge({
            path: '/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (res.getHeader && res.getHeader('Set-Cookie').indexOf('sessionId=') != -1) {
                        console.log('+ done', name);
                    }
                    else {
                        error(null, chunk, name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end(jsonData);
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    },

    loginUser: function(name) {
        var jsonData = JSON.stringify({username: "barak", password: "p"}, null, '\t');
        var options = merge({
            path: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        }, defaultOptions);
        try {
            var res;
            var req = http.request(options, function(response) {
                res = response;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (res.getHeader && res.getHeader('Set-Cookie').indexOf('sessionId=') != -1) {
                        console.log('+ done', name);
                    }
                    else {
                        error(null, chunk, name);
                    }
                });
            });

            req.on('error', function(e) {
                error(null, null, name, e);
            });

            // write data to request body
            req.end(jsonData);
        } catch (err) {
            error(req, null, 'unexpected error in '+name, err);
        }
    }
};


// run all tests
var i = 0;
var keys = Object.keys(TESTS);
function runNextTest() {
    if (i < keys.length) {
        // run test
        console.log('+ start testing:', keys[i]);
        TESTS[keys[i]](keys[i]);
        i++;
        setTimeout(runNextTest, 1000);
    }
    else {
        console.log("PASSED ALL TESTS");
    }
}
runNextTest();