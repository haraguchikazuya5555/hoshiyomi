"use strict";
(function () {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.004
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.phase += s.speed;
      const alpha = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 233, 244," + alpha.toFixed(3) + ")";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  resize();
  draw();
})();

/* フォント読み込み等でレイアウトが動くと初期アンカースクロールが
   打ち消されるため、ロード完了後に位置を合わせ直す */
window.addEventListener("load", function () {
  if (!location.hash) return;
  var el = document.getElementById(location.hash.slice(1));
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
