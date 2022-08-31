var Toast = (function () {
  var show = function (messge) {
    if (messge != null && messge.length > 10) {
      var toast = document.getElementById("snackbar");
      toast.className = "show";
      toast.innerHTML = messge;
      setTimeout(function () {
        toast.className = toast.className.replace("show", "");
      }, 5000);
    }
  };
  return { show };
})();
