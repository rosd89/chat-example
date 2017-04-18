const hash = require('./hash.creator');
const retMsg = require('./return.msg');

const UserConnectInfo = require('../../../models').UserConnectInfo;

/**
 * 인증키 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.authCheck = (req, res, next) => {
    let accessToken = req.body.accessToken;
    if (!accessToken) accessToken = req.query.accessToken;
    if (!accessToken) accessToken = req.params.accessToken;

    if (!accessToken) return retMsg.error400InvalidCall(req, res, 'ERROR_MISSING_PARAM', 'accessToken');
    else if (accessToken.length !== 64) return retMsg.error400InvalidCall(req, res, 'ERROR_INVALID_PARAM', 'accessToken');

    UserConnectInfo.findOne({
        where: {
            accessToken: accessToken
        }
    }).then(connection => {
        if (!connection) return retMsg.error401Unauthorized(res);

        const timeNum = connection.expiredTime.getTime() - new Date().getTime();
        if (timeNum < 0) {
            // 인증시간 만료
            return retMsg.error401Unauthorized(res);
        }

        //인증시간 갱신
        connection.expiredTime = hash.getExpiredTime();
        connection.save()
            .then(connection => {
            })
            .catch(err => retMsg.error500Server(res, {err: err}));

        req.body.connectUserId = connection.userId;

        next();
    });
};