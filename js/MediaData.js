var MediaData = (function () {
  var uiStatus = "Loading...";
  var mpStatus = "Loading...";
  var mediaUrl =
    "http://pfsv.io:80/series/6005043031/56691/85915.mp4";
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
  var CANAL1 = "CANAL1";
  var CANAL2 = "CANAL2";
  var DashErr1 = "Dash-Err-1";
  var DashErr2 = "Dash-Err-2";
  var CANAL3 = "CANAL3";
  var CANAL4 = "CANAL4";
  var HLSErr1 = "HLS-Err-1";
  var HLSErr2 = "HLS-Err-2";
  var VideoWrapper = "video_wrapper";
  var defaultUrls = {
    /** Mapping of Dash Urls with Ids */
    [CANAL1]:"http://pfsv.io:80/6005043031/56691/324.ts",
    [CANAL2]:"http://pfsv.io:80/movie/6005043031/56691/1904.mp4",
    [DashErr1]:"http://media.developer.dolby.com/DolbyVision_Atmos/profile8.1_DASH/p8.1.mpd",
    [DashErr2]:"http://pfsv.io:80/movie/6005043031/56691/1904.mp4",

    /** Mapping of HLS Urls with Ids */
    [CANAL3]:"http://pfsv.io:80/series/6005043031/56691/5847.mp4",
    [CANAL4]:"http://pfsv.io:80/series/6005043031/56691/85915.mp4",
    [HLSErr1]:"https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8",
    [HLSErr2]:"https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.m3u8",
  };
  var urlIds = [CANAL1, CANAL2, CANAL3, CANAL4, DashErr1, DashErr2, HLSErr1, HLSErr2];

  return {
    controlIds,
    controlList,
    ctrlList,
    CANAL1,
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
