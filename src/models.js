const db = require('./model/mysql.connection');

/**
 * Model
 */
const UserInfo = require('./model/userInfo');
const UserConnectInfo = require('./model/userConnectInfo');
const MessageInfo = require('./model/messageInfo');

module.exports = {
    db,
    UserInfo,
    UserConnectInfo,
    MessageInfo
};