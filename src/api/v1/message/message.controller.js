const retMsg = require('../util/return.msg');

const MessageInfo = require('../../../models').MessageInfo;

exports.index = (req, res) => MessageInfo.findAll({
    attributes: [
      'userName', 'chatMessage', 'createdAt'
    ],
    order: 'id desc',
    offset: req.query.page * req.query.limit,
    limit: parseInt(req.query.limit)
}).then(messages => retMsg.success200RetObj(res, messages));