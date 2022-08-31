var Util = (function () {
  var OnStartTimer = function (timerId, callbackFunc) {
    if (timerId === -1) {
      timerId = setInterval(callbackFunc, 3000);
      AppLog.info(
        "OnStartTimer",
        {
          message: "Timer (" + timerId + ") started ...",
        },
        ""
      );
      callbackFunc(timerId);
    }
    return timerId;
  };

  var OnStopTimer = function (timerId) {
    AppLog.info(
      "OnStopTimer",
      {
        message: "Timer (" + timerId + ") stopped ...",
      },
      ""
    );
    clearInterval(timerId);
    timerId = -1;
    return timerId;
  };
  var findControlIds = function (id) {
    var findId = false;
    for (var j = 0; j < MediaData.controlIds.length; j++) {
      if (MediaData.controlIds[j].indexOf(id) !== -1) {
        findId = true;
      }
    }
    return findId;
  };

  var findAllIds = function (id) {
    var controlIds = MediaData.controlIds.concat(MediaData.urlIds);
    var findId = false;
    for (var j = 0; j < controlIds.length; j++) {
      if (controlIds[j].indexOf(id) !== -1) {
        findId = true;
      }
    }
    return findId;
  };

  var removeFocus = function (id) {
    if (id) {
      document.getElementById(id).blur();
    }
  };

  var removeAllFocus = function () {
    for (var i = 0; i < MediaData.controlList.length; i++) {
      MediaData.controlList[i].blur();
    }
  };
  var activateControlIds = function (isActivated) {
    if (isActivated === false) {
      for (var i = 0; i < MediaData.ctrlList.length; i++) {
        var ctrlId = MediaData.ctrlList[i].id;
        if (MediaData.Fullscreen.indexOf(ctrlId) === -1) {
          MediaData.ctrlList[i].classList.remove("control");
        }
      }
    } else {
      for (var i = 0; i < MediaData.ctrlList.length; i++) {
        MediaData.ctrlList[i].classList.add("control");
      }
    }
    SpatialNavigation.focus();
  };
  return {
    OnStartTimer,
    OnStopTimer,
    findControlIds,
    findAllIds,
    activateControlIds,
    removeAllFocus,
    removeFocus,
  };
})();
