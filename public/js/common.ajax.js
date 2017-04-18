/**
 * Ajax
 */
function AjaxProcess(type, url, params, dataType, successCallback, errorCallback) {

    this.type = type;
    this.url = url;
    this.params = params;
    this.dataType = dataType;

    this.onSuccess = successCallback;
    this.onError = errorCallback;
}

/**
 * ajax 프로토타입
 */
AjaxProcess.prototype = {

    /**
     * ajax실행 함수
     */
    ajaxAct: function () {

        var nullCheck = true;

        //null 체크
        if (!this.type
            || !this.url
            || !this.dataType) {
            nullCheck = false;
        }

        //ajax실행
        if (nullCheck) {
            var act = this;
            $.ajax({
                type: act.type,
                url: act.url,
                dataType: act.dataType,
                data: act.params,
                success: function (data) {
                    act.onSuccess(data);
                },
                error: function (request, status, error) {
                    act.onError(request, status, error);
                }
            });
        }
    }
};