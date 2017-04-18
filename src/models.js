const db = require('./model/mysql.connection');

/**
 * Model
 */
const UserInfo = require('./model/userInfo');
const UserConnectInfo = require('./model/userConnectInfo');

module.exports = {
    db,
    UserInfo,
    UserConnectInfo
};