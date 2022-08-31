var MediaPlayerUI = (function () {
  var isFullScreen = false;

  var _exitfullscreen = function () {
    if (isFullScreen === true) {
      isFullScreen = false;
      Util.activateControlIds(true);
      document
        .getElementById(MediaData.VideoWrapper)
        .classList.remove("video_full");
      document
        .getElementById(MediaData.Fullscreen)
        .classList.remove("small_screen");
      document.getElementById(MediaData.Fullscreen).src =
        "icons/fullscreen.png";
      AppLog.info(
        "exitfullscreen",
        { message: "Back button pressed to exit fullscreen" },
        ""
      );
    } else {
      webOS.platformBack();
      AppLog.info(
        "exitfullscreen",
        { message: "Back button pressed to exit app" },
        ""
      );
    }
  };

  var _toggleFullScreen = function (id) {
    if (id.indexOf(MediaData.Fullscreen) !== -1) {
      if (isFullScreen === false) {
        isFullScreen = true;
        document
          .getElementById(MediaData.VideoWrapper)
          .classList.add("video_full");
        document
          .getElementById(MediaData.Fullscreen)
          .classList.add("small_screen");
        Util.activateControlIds(false);
        document.getElementById(MediaData.Fullscreen).src =
          "icons/smallscreen.png";
        document.getElementById(MediaData.Fullscreen).focus();
      } else {
        isFullScreen = false;
        Util.activateControlIds(true);
        document
          .getElementById(MediaData.VideoWrapper)
          .classList.remove("video_full");
        document
          .getElementById(MediaData.Fullscreen)
          .classList.remove("small_screen");
        document.getElementById(MediaData.Fullscreen).src =
          "icons/fullscreen.png";
      }
      return true;
    } else {
      return false;
    }
  };
  var OnSelectHandler = function (id) {
    if (id) {
      if (_toggleFullScreen(id) === false) {
        OnSelect(id);
        if (Util.findControlIds(id) === true) {
          MediaPlayer.setControl(id);
        } else {
          MediaData.mediaUrl = MediaData.defaultUrls[id];
          Status.OnUrlUpdate(MediaData.mediaUrl);
          MediaPlayer.setControl(MediaData.Play);
        }
      }
    }
  };

  var onClickHandler = function (e) {
    var id = e.target.id;
    OnSelectHandler(id);
    Status.OnFocusUpdate("Selected " + id + " !");
  };

  var onMouseOutHandler = function (e) {
    Util.removeFocus(e.target.id);
  };

  var onMouseOverHandler = function (e) {
    var id = e.target.id;
    if (id) {
      Util.removeAllFocus();
      document.getElementById(id).focus();
      MediaData.uiStatus = "Mouse focus on " + id + "!";
      Status.OnFocusUpdate(MediaData.uiStatus);
      // AppLog.info("MouseOver", { message: MediaData.uiStatus }, "");
    }
  };

  var OnResetControls = function () {
    MediaData.controlIds.forEach(function (item, index) {
      document.getElementById(item).classList.remove("clicked");
    });
  };
  var OnSelect = function (id) {
    if (id) {
      if (Util.findControlIds(id) === true) {
        OnResetControls();
      } else {
        MediaData.urlIds.forEach(function (item, index) {
          document.getElementById(item).classList.remove("clicked");
        });
      }
      AppLog.info(
        "OnSelect",
        {
          message: "The " + id + " selected !",
        },
        ""
      );

      if (id.indexOf(MediaData.Fullscreen) === -1) {
        document.getElementById(id).classList.add("clicked");
        if (id.indexOf(MediaData.Stop) !== -1) {
          setTimeout(function () {
            AppLog.info(
              "OnSelect",
              {
                message: "The " + id + " selection reset !",
              },
              ""
            );
            document.getElementById(MediaData.Stop).classList.remove("clicked");
          }, 5000);
        }
      }
    }
  };

  var OnCursorVisibilityHandler = function (event) {
    var visibility = event.detail.visibility;
    if (visibility) {
      Util.removeAllFocus();
      AppLog.info(
        "OnCursorVisibilityHandler",
        { message: "Cursor appeared !" },
        ""
      );
    } else {
      AppLog.info(
        "OnCursorVisibilityHandler",
        { message: "Cursor disappeared !" },
        ""
      );
    }
  };

  var OnNavigationHandler = function (e) {
    switch (e.keyCode) {
      case 37: // 4-Way-Left
      case 38: // 4-Way-Up
      case 39: // 4-Way-Right
      case 40: // 4-Way-Down
        var id = e.target.id;
        if (id && id !== undefined) {
          MediaData.uiStatus = "Navigation on - " + id + " !";
          Status.OnFocusUpdate(MediaData.uiStatus);
          AppLog.debug(
            "OnNavigationHandler",
            { message: MediaData.uiStatus },
            ""
          );
        }
        break;
      default:
        break;
    }
  };

  var _updateRemoteKeyFocus = function (id) {
    Util.removeAllFocus();
    document.getElementById(id).focus();
  };

  var OnKeyUpHandler = function (e) {
    switch (e.keyCode) {
      case 13: //Enter
        var id = e.target.id;
        if (id && Util.findAllIds(id)) {
          document.getElementById(id).focus();
          document.getElementById(id).classList.remove("active");
        }
        break;
      case 412: //Rewind
        _updateRemoteKeyFocus(MediaData.Rewind);
        break;
      case 415: //Play
        _updateRemoteKeyFocus(MediaData.Play);
        break;
      case 19: // Pause
        _updateRemoteKeyFocus(MediaData.Pause);
        break;
      case 413: //Stop
        _updateRemoteKeyFocus(MediaData.Stop);
        break;
      case 417: //Forward
        _updateRemoteKeyFocus(MediaData.Forward);
        break;
      default:
        break;
    }
  };

  var OnRemoteSelected = function (id) {
    OnSelectHandler(id);
    MediaData.uiStatus = "Remote Key : " + id + " !";
    Status.OnFocusUpdate(MediaData.uiStatus);
    AppLog.debug("OnRemoteSelected", { message: MediaData.uiStatus }, "");
  };
  var OnKeyDownHandler = function (e) {
    var id = e.target.id;
    switch (e.keyCode) {
      case 13: //Enter
        if (id) {
          OnSelectHandler(id);
          document.getElementById(id).classList.add("active");
        }
        break;
      case 412: //Rewind
        OnRemoteSelected(MediaData.Rewind);
        break;
      case 415: // Play
        OnRemoteSelected(MediaData.Play);
        break;
      case 19: // Pause
        OnRemoteSelected(MediaData.Pause);
        break;
      case 413: //Stop
        OnRemoteSelected(MediaData.Stop);
        break;
      case 417: //Forward
        OnRemoteSelected(MediaData.Forward);
        break;
      case 461: //back
        _exitfullscreen();
        break;
      default:
        break;
    }
  };

  var OnUiRegisterEvent = function () {
    for (var i = 0; i < MediaData.controlList.length; i++) {
      MediaData.controlList[i].addEventListener(
        "mouseover",
        onMouseOverHandler
      );
      MediaData.controlList[i].addEventListener("mouseout", onMouseOutHandler);
      MediaData.controlList[i].addEventListener("click", onClickHandler);
      MediaData.controlList[i].addEventListener("keyup", OnNavigationHandler);
    }
    AppLog.info("OnUiRegisterEvent", { message: "Events are registered" }, "");
  };

  return {
    OnUiRegisterEvent,
    OnCursorVisibilityHandler,
    OnKeyDownHandler,
    OnKeyUpHandler,
    OnResetControls,
    OnSelect,
  };
})();

window.addEventListener("load", function () {
  SpatialNavigation.init();
  SpatialNavigation.add({
    selector: ".control",
  });
  SpatialNavigation.makeFocusable();
  document.addEventListener(
    "cursorStateChange",
    MediaPlayerUI.OnCursorVisibilityHandler
  );
  MediaPlayerUI.OnUiRegisterEvent();
  document.addEventListener("keydown", MediaPlayerUI.OnKeyDownHandler, false);
  document.addEventListener("keyup", MediaPlayerUI.OnKeyUpHandler, false);
  Status.OnFocusUpdate("Media Player Loaded");
});
