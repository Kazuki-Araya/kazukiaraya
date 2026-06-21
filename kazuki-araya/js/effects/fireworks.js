const fireworksCanvas = document.createElement("canvas");
fireworksCanvas.id = "fireworksCanvas";
fireworksCanvas.style.position = "fixed";
fireworksCanvas.style.inset = "0";
fireworksCanvas.style.pointerEvents = "none";
fireworksCanvas.style.zIndex = "99998";
document.body.appendChild(fireworksCanvas);
const fwCtx = fireworksCanvas.getContext("2d");
let fireworks = [];
let birthdayFireworksLaunched = false;
let animationId = null;
function resizeFireworksCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
function triggerFireworks(x, y, options = {}) {
  const count = options.count || 30;
  const speed = options.speed || 4;
  const radius = options.radius || 4;
  const colors = options.colors || ["#ff69b4", "#fff", "#ffb6c1"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    fireworks.push({
      x,
      y,
      vx: Math.cos(angle) * randomBetween(speed * 0.5, speed),
      vy: Math.sin(angle) * randomBetween(speed * 0.5, speed),
      ax: 0,
      ay: 0.06,
      life: 0,
      ttl: randomBetween(40, 80),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: randomBetween(radius, radius + 2),
      alpha: 1,
    });
  }
}
function triggerBirthdayFireworks() {
  for (let i = 0; i < 6; i++) {
    triggerFireworks(
      randomBetween(window.innerWidth * 0.2, window.innerWidth * 0.8),
      randomBetween(window.innerHeight * 0.1, window.innerHeight * 0.35),
      {
        count: 60,
        speed: 5,
        radius: 4,
        colors: ["#ff79c6", "#ffffff", "#ffb6c1", "#ffd700"],
      }
    );
  }
}
function animateFireworks() {
  fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fwCtx.globalCompositeOperation = "lighter";
  fireworks = fireworks.filter((p) => p.life < p.ttl);
  fireworks.forEach((p) => {
    p.life += 1;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.vy += p.ay;
    p.x += p.vx;
    p.y += p.vy;
    p.alpha = 1 - p.life / p.ttl;
    fwCtx.beginPath();
    fwCtx.fillStyle = p.color;
    fwCtx.globalAlpha = p.alpha;
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fwCtx.fill();
    if (p.life % 5 === 0) {
      fwCtx.strokeStyle = p.color;
      fwCtx.globalAlpha = p.alpha * 0.4;
      fwCtx.lineWidth = 1;
      fwCtx.beginPath();
      fwCtx.moveTo(p.x, p.y);
      fwCtx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
      fwCtx.stroke();
    }
  });
  fwCtx.globalCompositeOperation = "source-over";
  animationId = requestAnimationFrame(animateFireworks);
}
function stopFireworksLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}
function initFireworksEffect() {
  if (document.documentElement.classList.contains("araya-weak-device")) return;
  resizeFireworksCanvas();
  window.addEventListener("resize", resizeFireworksCanvas);
  animateFireworks();
  const today = new Date();
  if (today.getMonth() === 7 && today.getDate() === 22) {
    triggerBirthdayFireworks();
  }
  const intervalId = setInterval(() => {
    const now = new Date();
    if (now.getMonth() === 7 && now.getDate() === 22) {
      triggerBirthdayFireworks();
    }
  }, 3000);
  fireworks._intervalId = intervalId;
}
