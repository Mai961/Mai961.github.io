(function () {
  if (!("IntersectionObserver" in window)) return;
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  [].forEach.call(document.querySelectorAll(".clip video"), function (v) {
    var visible = false;
    var userPaused = false;
    var autoPausing = false;
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) {
        if (reduceMotion || userPaused) return;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else if (!v.paused) {
        autoPausing = true;
        v.pause();
      }
    }, { threshold: 0.5 }).observe(v);
    v.addEventListener("pause", function () {
      if (autoPausing) { autoPausing = false; return; }
      if (visible) userPaused = true;
    });
    v.addEventListener("play", function () { userPaused = false; });
  });
})();
