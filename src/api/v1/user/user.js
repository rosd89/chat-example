const express = require('express');
const router = express.Router();

const userCtrl = require('./user.controller');

// 유저 등록 init
router.post('/', userCtrl.init);

// 유저 등록 create
router.post('/:userId', userCtrl.create);

module.exports = router;