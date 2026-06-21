function initSakuraEffect() {
  const sakuraCanvas = document.getElementById("sakura-canvas");
  if (!sakuraCanvas) return;
  const isWeak = document.documentElement.classList.contains("araya-weak-device");
  if (isWeak) return;

  const ctx = sakuraCanvas.getContext("2d");
  let wind = 0;
  function resizeCanvas() {
    sakuraCanvas.width = window.innerWidth;
    sakuraCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  let petals = [];
  const PETAL_COUNT = window.innerWidth < 768 ? 15 : 22;
  class Petal {
    constructor() {
      this.depth = Math.random();
      this.x = Math.random() * sakuraCanvas.width;
      this.y = Math.random() * sakuraCanvas.height;
      this.size = 4 + this.depth * 10;
      this.speedY = 0.3 + this.depth * 1.2;
      this.speedX = (Math.random() * 1 - 0.5) * (this.depth + 0.3);
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() * 0.02 - 0.01) * (this.depth + 0.5);
      this.swing = Math.random() * 3 * (this.depth + 0.5);
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle + wind) * this.swing + this.speedX;
      this.angle += this.spin;
      if (this.y > sakuraCanvas.height + 20) {
        this.y = -20;
        this.x = Math.random() * sakuraCanvas.width;
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = 0.4 + this.depth * 0.6;
      ctx.shadowColor = "#ffb6c1";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255,182,193,0.95)";
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }
  let lastTime = 0;
  function animate(time) {
    if (time - lastTime < 50) {
      requestAnimationFrame(animate);
      return;
    }
    lastTime = time;
    wind += 0.01;
    ctx.clearRect(0, 0, sakuraCanvas.width, sakuraCanvas.height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
