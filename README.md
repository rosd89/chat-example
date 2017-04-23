# 작업환경
* node : v6.9.2
* mysql : 5.7
* 기타 - package.json 참조

# 1. database 생성
``` query
CREATE DATABASE `chatDB` DEFAULT CHARACTER SET = `utf8mb4`;
```

# 2. DB 설정파일 추가
* 경로 : `config/db.config.json`
* 내용 : 
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

# 3. Webpack 설치
```
npm install -g webpack
```

# 4. 실행
```
npm install
npm run build
npm start
```

# 내용
* 회원가입 및 로그인 기능
* 채팅기능