
const MessageInfo = require('../models').MessageInfo;

exports.create = data => MessageInfo.create({
    userId: data.userId,
    userName: data.userName,
    chatMessage: data.message
});