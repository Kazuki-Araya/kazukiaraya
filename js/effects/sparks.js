function initSparksEffect() {
  if (document.documentElement.classList.contains("araya-weak-device")) return;
  document.addEventListener("click", (e) => {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";
      const angle = (Math.PI * 2 * i) / count;
      const radius = 15;
      spark.style.left = e.clientX + "px";
      spark.style.top = e.clientY + "px";
      spark.style.setProperty("--tx", Math.cos(angle) * radius + "px");
      spark.style.setProperty("--ty", Math.sin(angle) * radius + "px");
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 400);
    }
  });
}
