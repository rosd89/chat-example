const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 * Table: userConnectInfo
 *
 * userId: 유저 ID
 * accessToken: 인증토큰
 * expiredTime: 만료시간
 *
 * @type {any}
 */
const UserConnectInfo = db.define('userConnectInfo',
    {
        userId: {
            type: sequelize.STRING(45),
            primaryKey: true,
            references: {
                model: 'userInfo',
                key: 'id'
            }
        },
        accessToken: sequelize.CHAR(64),
        expiredTime: sequelize.DATE
    },
    {
        createdAt: false,
        updatedAt: false,
        tableName: 'userConnectInfo',
        indexes: [
            {fields: ['accessToken']}
        ]
    }
);

module.exports = UserConnectInfo;