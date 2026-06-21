function initElectricBorderEffect() {
  const canvas = document.getElementById("electricCanvas");
  const wrapper = document.querySelector(".electric-border");
  if (!canvas || !wrapper) return;
  if (document.documentElement.classList.contains("araya-weak-device")) return;

  const ctx = canvas.getContext("2d");
  const padding = 61;
  let animationId = null;

  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width + padding * 2;
    canvas.height = rect.height + padding * 2;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.position = "absolute";
    canvas.style.left = "-" + padding + "px";
    canvas.style.top = "-" + padding + "px";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "20";
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let t = 0;

  function noise(x) {
    return Math.sin(x * 2.3) * 0.5 + Math.sin(x * 5.7) * 0.25;
  }

  function draw() {
    t += 0.015;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ff8bc4";
    ctx.lineWidth = 2;
    const margin = padding;
    const w = canvas.width - margin * 2;
    const h = (canvas.height - margin * 2) + 4;
    const r = 30;
    ctx.beginPath();
    const points = 350;
    for (let i = 0; i <= points; i++) {
      let p = i / points;
      let x, y;
      if (p < 0.25) {
        x = margin + r + (w - r * 2) * (p / 0.25);
        y = margin;
      } else if (p < 0.5) {
        x = margin + w;
        y = margin + r + (h - r * 2) * ((p - 0.25) / 0.25);
      } else if (p < 0.75) {
        x = margin + w - r - (w - r * 2) * ((p - 0.5) / 0.25);
        y = margin + h;
      } else {
        x = margin;
        y = margin + h - r - (h - r * 2) * ((p - 0.75) / 0.25);
      }
      const n = noise(p * 30 + t) * 10;
      x += Math.cos(p * 50 + t) * n;
      y += Math.sin(p * 50 + t) * n;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.shadowColor = "#ff69b4";
    ctx.shadowBlur = 20;
    ctx.stroke();
    animationId = requestAnimationFrame(draw);
  }

  draw();
}
