/**
 * Main server file.
 */

var data = require('./data');
var miniExpress = require('express');
var app = miniExpress();

var PORT = process.env.PORT || 3005;

app.use(miniExpress.cookieParser());
app.use(miniExpress.bodyParser());

app.use('/app', miniExpress.static(__dirname + '/www/'));

app.get('/item', function(req, res) {
    res.json(data.todos.list());
});

app.post('/item', function(req, res) {
    try {
        data.todos.create(req.body);
        res.json({status: 0});
    }
    catch (err) {
        res.status(500).json({status: 1, msg: err});
    }
});

app.put('/item', function(req, res) {
    try {
        data.todos.update(req.body);
        res.json({status: 0});
    }
    catch (err) {
        res.status(500).json({status: 1, msg: err});
    }
});

app.delete('/item', function(req, res) {
    try {
        data.todos.delete(req.body);
        res.json({status: 0});
    }
    catch (err) {
        res.status(500).json({status: 1, msg: err});
    }
});

app.post('/register', function(req, res) {
    try {
        var user = data.users.register(req.body);
        res.cookie('sessionId', user.sessionId).send('');
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
});

app.post('/login', function(req, res) {
    try {
        var user = data.users.login(req.body);
        res.cookie('sessionId', user.sessionId).send('');
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
});

app.post('/logout', function(req, res) {
    try {
        console.log('cookie', req.cookie('sessionId'));
        data.users.logout(req.cookie('sessionId'));
        res.cookie('sessionId', '').send(200);
    }
    catch (err) {
        console.log('cool', req.cookie('sessionId'));
        res.status(500).json({msg: err});
    }
});

app.get('/', function(req, res) {
    res.set('Location', '/app').send(301);
});

var s = app.listen(PORT).on('close', function () {
    console.log('closed', this);
});

//setTimeout(function () {
//    s.close();
//}, 10000);