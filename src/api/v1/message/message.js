const express = require('express');
const router = express.Router();

const messageCtrl = require('./message.controller');
const auth = require('../util/authorize.checker').authCheckByExpress;

router.get('/', auth, messageCtrl.index);

module.exports = router;