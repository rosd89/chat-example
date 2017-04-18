const express = require('express');
const bodyParser = require('body-parser');
const {error404NotFound} = require('./api/v1/util/return.msg');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

const user = require('./api/v1/user/user');
const connect = require('./api/v1/connect/connect');

// app.use('/api/v1/users', user);
// app.use('/api/v1/connections', connect);

// 404 Not Found
app.use((req, res) => error404NotFound(res));

module.exports = app;