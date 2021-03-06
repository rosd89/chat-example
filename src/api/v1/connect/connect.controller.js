const retMsg = require('../util/return.msg.js');
const hash = require('../util/hash.creator');

const UserInfo = require('../../../models').UserInfo;
const UserConnectInfo = require('../../../models').UserConnectInfo;

/**
 * clientSalt 가져오기 controller
 *
 * @param req
 * @param res
 */
exports.getClientSalt = (req, res) => {
    const userId = req.query.userId;
    if (!userId) return retMsg.error400InvalidCall(req, res, 'ERROR_MISSING_PARAM', 'userId');

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) {
            return retMsg.success200RetObj(res, {
                salt: hash.getSalt()
            });
        }

        return retMsg.success200RetObj(res, {
            salt: user.clientSalt
        });
    });
};

/**
 * 로그인 인증 확인 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
exports.loginValidation = (req, res, next) => {
    const userId = req.body.userId;
    const hash1st = req.body.hashToken;

    if (!userId) return retMsg.error400InvalidCall(req, 'ERROR_MISSING_PARAM', 'userId');
    else if (!hash1st) return retMsg.error400InvalidCall(req, 'ERROR_MISSING_PARAM', 'hashToken');
    else if (hash1st.length !== 64) return retMsg.error400InvalidCall(req, 'ERROR_INVALID_PARAM', 'hashToken');

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) return retMsg.error404NotFound(res);

        const serverSalt = user.serverSalt;
        const hashToken = user.hashToken;

        const hash2nd = hash.getHash(hash1st, serverSalt);
        if (hashToken !== hash2nd) return retMsg.error401Unauthorized(res);

        req.body.connectUserName = user.userName;
        next();

        return null;
    }).catch(err => retMsg.error500Server(res, {
        err: err
    }));
};

/**
 * 로그인 controller
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => UserConnectInfo.destroy({
    where: {
        userId: req.body.userId,
    }
}).then(result => UserConnectInfo.create({
    userId: req.body.userId,
    accessToken: hash.getSalt(),
    expiredTime: hash.getExpiredTime()
})).then(connect => retMsg.success200RetObj(res, {
    accessToken: connect.accessToken,
    userId: req.body.userId,
    userName: req.body.connectUserName
})).catch(err => retMsg.error500Server(res, {
    err: err
}));

/**
 * 로그아웃 controller
 *
 * @param res
 * @param req
 */
exports.destroy = (req, res) => UserConnectInfo.destroy({
    where: {
        accessToken: accessToken
    }
})
    .then(_ => retMsg.success204(res))
    .catch(err => retMsg.error500Server(res, {
        err: err
    }));