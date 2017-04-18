const app = require('../src/index');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const express = require('express');
const syncDatabase = require('./sync-database');

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log('listening on *:' + port);

    syncDatabase().then(_ => console.log('Database sync'));
});
