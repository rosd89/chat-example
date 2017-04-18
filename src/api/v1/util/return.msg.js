const errorCodeMap = {
    ERROR_UNKNOWN: 0,
    ERROR_MISSING_PARAM: -1,
    ERROR_INVALID_PARAM: -2,
    ERROR_DUPLICATE: -3,
    ERROR_INVALID_ACCESS_TOKEN: -4
};

// 200 - success
exports.success200 = res => res.status(200).json({});

// 200 - return Model
exports.success200RetObj = (res, obj) => res.status(200).json(obj);

// 201 - create
exports.success201 = (res, obj) => res.status(201).json(obj);

// 204 - delete
exports.success204 = res => res.status(204).send();

// 400 - 인자값 누락
exports.error400InvalidCall = (res, errorCode, data) => res.status(400).json({
    errorCode: errorCodeMap[errorCode],
    data: data
});

// 401 - 리소스 접근권한 없음
exports.error401Unauthorized = res => res.status(401).send();

// 404
exports.error404NotFound = res => res.status(404).send();

// 500 - 서버 error
exports.error500Server = (res, err) => res.status(500).json(err);