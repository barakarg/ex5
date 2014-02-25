/**
 * Main server file.
 */

var data = require('./data');
var miniExpress = require('./miniExpress');
var app = miniExpress();

var PORT = 3005;

app.use(miniExpress.cookieParser());
app.use(miniExpress.bodyParser());

app.use(function(req, res, next) { console.log('middleware:', req.url); next(); });

app.use('/app', miniExpress.static(__dirname + '/www/'));

app.get('/item', function(req, res) {
    res.json(data.todos.list());
});

app.post('/item', function(req, res) {
    try {
        var item = data.todos.create(req.body);
        res.json(item);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.put('/item', function(req, res) {
    try {
        var item = data.todos.update(req.body);
        res.json(item);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/item', function(req, res) {
    try {
        var items = data.todos.delete(req.body);
        res.json(items);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.get('/', function(req, res) {
    res.status(301).set('Location', '/app').send('');
});

var s = app.listen(PORT).on('close', function () {
    console.log('closed', this);
});

//setTimeout(function () {
//    s.close();
//}, 10000);