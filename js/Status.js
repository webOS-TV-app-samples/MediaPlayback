var Status = (function () {
  var _getErrorText = function (code) {
    var errortext = ErrorCode.errorText[code];
    if (errortext !== undefined) {
      return errortext;
    }
    return "unknown error";
  };
  var _updateText = function (query, status) {
    var element = document.querySelectorAll(query);
    if (element && element.length > 0) {
      element[0].innerText = status;
    }
  };

  var OnFocusUpdate = function (status) {
    MediaData.uiStatus = status;
    _updateText("span.ui_status", status);
  };

  var OnUrlUpdate = function (mpUrl) {
    if (mpUrl) {
      _updateText("span.mp_url", mpUrl);
    }
  };

  var OnPlayerUpdate = function (mpStatus, mpError) {
    if (mpStatus) {
      _updateText("span.mp_status", mpStatus);
    }
    if (mpError) {
      _updateText("span.mp_error", mpError);
    }
  };

  var OnPlayerError = function (error, toast) {
    var errMessage = "";
    if (error !== undefined) {
      if (toast !== undefined && toast !== "") {
        if (error.code !== undefined) {
          errMessage = toast + _getErrorText(error.code);
        } else {
          errMessage = toast + error;
        }
      }
      Toast.show(errMessage);
    }
    OnPlayerUpdate("Video not played", JSON.stringify(errMessage));
    MediaPlayerUI.OnResetControls();
    AppLog.error("OnPlayerError", error, "");
  };

  var onErrorEvent = function (event) {
    AppLog.error("onErrorEvent", {
      error: event.detail,
    });
    OnPlayerError(event.detail);
  };

  return {
    OnFocusUpdate,
    OnPlayerUpdate,
    OnPlayerError,
    onErrorEvent,
    OnUrlUpdate,
  };
})();
