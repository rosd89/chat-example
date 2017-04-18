# chat-example

This is the source code for a very simple chat example used for
the [Getting Started](http://socket.io/get-started/chat/) guide
of the Socket.IO website.

Please refer to it to learn how to run this application.

You can also spin up a free Heroku dyno to test it out:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/socketio/chat-example)

Besides, the application is deployed on [Now](https://zeit.co/now): https://socketio-chat-example.now.sh/


# database 생성
``` query
CREATE DATABASE `chatDB` DEFAULT CHARACTER SET = `utf8mb4`;
```

# DB 설정파일 추가
``` json
{
  "host": "DB 경로",
  "port": "DB port",
  "username": "DB 유저 ID",
  "password": "DB 유저 비밀번호",
  "database": "DB 명",
  "logging": true // sequelize query 로깅 옵션
}
```