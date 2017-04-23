const app = require('../src/index');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const syncDatabase = require('./sync-database');
const authCheck = require('../src/api/v1/util/authorize.checker').authCheckBySocket;
const messageService = require('../src/service/message.service');

io.on('connection', socket => {
    console.log('connect socket');

    socket.on('chat message', data => authCheck(data.accessToken)
        .then(connection => {
            if (!connection) {
                // 인증 정보 없음
                throw 'Error Unauthorized';
            }
            return messageService.create(data);
        })
        .then(message => io.emit('chat message', message))
        .catch(err => io.emit('Error Unauthorized', err)));
});

http.listen(port, () => {
    console.log('listening on :' + port);

    syncDatabase().then(_ => console.log('Database sync'));
});
