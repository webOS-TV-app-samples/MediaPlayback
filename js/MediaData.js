var MediaData = (function () {
  var uiStatus = "Loading...";
  var mpStatus = "Loading...";
  var mediaUrl =
    "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
  var controlList = document.getElementsByClassName("control");
  var ctrlList = document.getElementsByClassName("ctrl");

  /** Mapping of Player Controls Ids*/
  var Play = "Play";
  var Pause = "Pause";
  var Rewind = "Rewind";
  var Forward = "Forward";
  var Stop = "Stop";
  var Fullscreen = "Fullscreen";
  var controlIds = [Rewind, Play, Pause, Stop, Forward, Fullscreen];

  var InputUrl = "InputUrl";
  var Dash1 = "Dash-1";
  var Dash2 = "Dash-2";
  var DashErr1 = "Dash-Err-1";
  var DashErr2 = "Dash-Err-2";
  var HLS1 = "HLS-1";
  var HLS2 = "HLS-2";
  var HLSErr1 = "HLS-Err-1";
  var HLSErr2 = "HLS-Err-2";
  var VideoWrapper = "video_wrapper";
  var defaultUrls = {
    /** Mapping of Dash Urls with Ids */
    [Dash1]:
      "https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd",
    [Dash2]: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd",
    [DashErr1]:
      "http://media.developer.dolby.com/DolbyVision_Atmos/profile8.1_DASH/p8.1.mpd",
    [DashErr2]:
      "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",

    /** Mapping of HLS Urls with Ids */
    [HLS1]:
      "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls-apple/master.m3u8",
    [HLS2]:
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
    [HLSErr1]: "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8",
    [HLSErr2]:
      "https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.m3u8",
  };
  var urlIds = [Dash1, Dash2, DashErr1, DashErr2, HLS1, HLS2, HLSErr1, HLSErr2];

  return {
    controlIds,
    controlList,
    ctrlList,
    Dash1,
    defaultUrls,
    InputUrl,
    mediaUrl,
    mpStatus,
    uiStatus,
    Rewind,
    Play,
    Pause,
    Stop,
    Forward,
    Fullscreen,
    urlIds,
    VideoWrapper,
  };
})();
