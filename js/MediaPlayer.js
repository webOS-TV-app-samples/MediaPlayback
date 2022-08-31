var MediaPlayer = (function () {
  var currentTime = 0;
  var jumpTime = 5;
  var errorText = "";
  var statusTimerID = -1;

  var OnPlayPauseHandler = function () {
    console.log("called vid");
    if (video.paused) {
      setControl(MediaData.Play);
    } else {
      setControl(MediaData.Pause);
    }
  };

  var setCurrentTime = function () {
    currentTime = video.currentTime;
  };
  var _isVideoPlaying = function () {
    return !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );
  };

  var _playerStatus = function () {
    var isBuffered = player.getBufferFullness();
    var isVideoPlaying = _isVideoPlaying();
    if (isVideoPlaying === false && currentTime === 0) {
      Status.OnPlayerUpdate("Video not played ...", "");
      statusTimerID = Util.OnStopTimer(statusTimerID);
    } else if (isVideoPlaying === false && video.ended) {
      Status.OnPlayerUpdate("The Video play was completed...", "");
      AppLog.debug(
        "playerStatus",
        {
          mediaUrl: MediaData.mediaUrl,
          message: "The Video play was completed",
        },
        ""
      );
      MediaPlayerUI.OnResetControls();
      statusTimerID = Util.OnStopTimer(statusTimerID);
    } else if (isVideoPlaying) {
      if (isBuffered < 1) {
        Status.OnPlayerUpdate("Bufferring & Playing ...", "");
      } else {
        Status.OnPlayerUpdate("Playing ...", "");
      }
    } else {
      if (isBuffered < 1) {
        Status.OnPlayerUpdate("Bufferring & Paused ...", "");
      } else {
        Status.OnPlayerUpdate("Paused ...", "");
        statusTimerID = Util.OnStopTimer(statusTimerID);
      }
    }
  };
  var OnPlayerRegisterEvent = function () {
    video.addEventListener("click", OnPlayPauseHandler);
    video.addEventListener("timeupdate", setCurrentTime);
    video.addEventListener("error", Status.onErrorEvent, true);
    player.addEventListener("error", Status.onErrorEvent, true);

    // https://github.com/google/shaka-player/issues/2450#issuecomment-597703896
    video.addEventListener("playing", (event) => {
      Status.OnPlayerUpdate("Bufferring & Playing ...", "");
    });
    video.addEventListener("pause", (event) => {
      Status.OnPlayerUpdate("Paused ...", "");
    });
    console.log("my player ", player);
    AppLog.info(
      "OnPlayerRegisterEvent",
      {
        message: "Player Events are registered",
      },
      ""
    );
    statusTimerID = Util.OnStartTimer(statusTimerID, _playerStatus);
    Status.OnPlayerUpdate("Player Events are registered", "");
  };

  var setControl = function (control) {
    try {
      switch (control) {
        case "Rewind":
          if (video.duration) {
            video.pause();
            if (currentTime < jumpTime) {
              currentTime = 0;
            } else {
              currentTime -= jumpTime;
            }
            video.currentTime = currentTime;
            Status.OnPlayerUpdate("Rewinded " + jumpTime + " sec", "");
            setTimeout(function () {
              setControl(MediaData.Play);
            }, 500);
          } else {
            Status.OnPlayerUpdate("Video not played ...", "");
            MediaPlayerUI.OnResetControls();
          }
          break;
        case "Forward":
          video.pause();
          if (video.duration) {
            if (currentTime + jumpTime >= video.duration) {
              currentTime = video.duration;
            } else {
              currentTime += jumpTime;
            }
            video.currentTime = currentTime;
            Status.OnPlayerUpdate("Forwaded " + jumpTime + " sec", "");
            setTimeout(function () {
              setControl(MediaData.Play);
            }, 500);
          } else {
            Status.OnPlayerUpdate("Video not played ...", "");
            MediaPlayerUI.OnResetControls();
          }
          break;
        case "Play":
          if (window.player.getAssetUri() !== MediaData.mediaUrl) {
            window.player.unload();
            _loadUrl();
          } else {
            video.play();
            Status.OnPlayerUpdate("Playing", "-");
            MediaPlayerUI.OnSelect(MediaData.Play);
            statusTimerID = Util.OnStartTimer(statusTimerID, _playerStatus);
          }
          break;
        case "Stop":
          video.currentTime = 0;
          video.pause();
          Status.OnPlayerUpdate("Stopped", "");
          break;
        case "Pause":
          if (video.duration) {
            video.pause();
            Status.OnPlayerUpdate("Paused", "");
          } else {
            Status.OnPlayerUpdate("Video not played ...", "");
            MediaPlayerUI.OnResetControls();
          }
          break;
        default:
          break;
      }
    } catch (error) {
      errorText = "Error on video '" + control + "' control operation";
      Status.OnPlayerError(error, errorText);
    }
  };

  var _loadUrl = function () {
    window.player
      .load(MediaData.mediaUrl)
      .then(function () {
        var loaded = "The video has now been loaded!";
        Status.OnPlayerUpdate(loaded, "");
        AppLog.debug(
          "LoadPlayer",
          {
            mediaUrl: MediaData.mediaUrl,
            message: loaded,
          },
          ""
        );
        setControl(MediaData.Play);
      })
      .catch(function (e) {
        Status.OnPlayerError(e, "Error on Loading Player ...");
      });
  };

  var _initPlayer = function () {
    video = document.getElementById("video");
    var player = new shaka.Player(video);
    player.configure({
      streaming: {
        bufferingGoal: 180,
        rebufferingGoal: 5,
      },
    });
    window.player = player;
    // Loading URL on the Player
    _loadUrl();
    OnPlayerRegisterEvent();
  };

  var init = function () {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      _initPlayer();
    } else {
      AppLog.info(
        "init",
        {
          message: errorText,
        },
        ""
      );
    }
  };
  return { init, setControl };
})();

document.addEventListener("DOMContentLoaded", MediaPlayer.init, false);
