const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 * Table: userConnectInfo
 *
 * userId: 유저 ID
 * userName: 유저 이름
 * chatMessage: 메시지
 * createdAt: 등록일자
 *
 * @type {any}
 */
const MessageInfo = db.define('messageInfo',
    {
        userId: {
            type: sequelize.STRING(45),
            references: {
                model: 'userInfo',
                key: 'id'
            }
        },
        userName: sequelize.STRING(32),
        chatMessage: sequelize.TEXT,
    },
    {
        updatedAt: false,
        tableName: 'messageInfo'
    }
);

module.exports = MessageInfo;