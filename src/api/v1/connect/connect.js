const express = require('express');
const router = express.Router();
const connectCtrl = require('./connect.controller');

const auth = require('../util/authorize.checker').authCheckByExpress;

// client salt 가져오기
router.get('/salt', connectCtrl.getClientSalt);

// 로그인
router.post('/', connectCtrl.loginValidation, connectCtrl.create);

// 로그아웃
router.delete('/', auth, connectCtrl.destroy);

module.exports = router;