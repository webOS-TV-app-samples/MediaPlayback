var AppLog = (function () {
  var LogLevelCritical = 3;
  var LogLevelError = 4;
  var LogLevelWarning = 5;
  var LogLevelInfo = 6;
  var LogLevelDebug = 7;
  var isDebugMode = true; // set true to see the logs on browser

  var _log = function (level, messageId, keyVals, freeText) {
    if (keyVals) {
      keyVals = JSON.stringify(keyVals);
    }
    if (isDebugMode === true) {
      console.log(messageId, keyVals, freeText);
    } else {
      window.PalmSystem.PmLogString(
        level,
        messageId,
        keyVals,
        freeText.toString()
      );
    }
  };
  var debug = function (messageId, keyVals, freeText) {
    if (typeof window === "object" && window.PalmSystem) {
      _log(LogLevelDebug, messageId, keyVals, freeText);
    } else {
      console.log(messageId, keyVals, freeText);
    }
  };

  var info = function (messageId, keyVals, freeText) {
    if (typeof window === "object" && window.PalmSystem) {
      _log(LogLevelInfo, messageId, keyVals, freeText);
    } else {
      console.info(messageId, keyVals, freeText);
    }
  };

  var warn = function (messageId, keyVals, freeText) {
    if (typeof window === "object" && window.PalmSystem) {
      _log(LogLevelWarning, messageId, keyVals, freeText);
    } else {
      console.warn(messageId, keyVals, freeText);
    }
  };

  var error = function (messageId, keyVals, freeText) {
    if (typeof window === "object" && window.PalmSystem) {
      _log(LogLevelError, messageId, keyVals, freeText);
    } else {
      console.error(messageId, keyVals, freeText);
    }
  };
  var critical = function (messageId, keyVals, freeText) {
    if (typeof window === "object" && window.PalmSystem) {
      _log(LogLevelCritical, messageId, keyVals, freeText);
    } else {
      console.error(messageId, keyVals, freeText);
    }
  };

  return {
    debug,
    info,
    warn,
    error,
    critical,
  };
})();
