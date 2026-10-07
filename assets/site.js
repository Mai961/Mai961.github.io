(function () {
  var v = document.querySelector(".clip video");
  if (!v || !("IntersectionObserver" in window)) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var visible = false;
  var io = new IntersectionObserver(function (entries) {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      v.pause();
    }
  }, { threshold: 0.5 });
  v.addEventListener("pause", function () { if (visible) io.disconnect(); });
  io.observe(v);
})();
