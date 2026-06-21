﻿function detectDeviceType() {
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Tablet|webOS|BlackBerry|Opera Mini/i.test(ua) || window.matchMedia('(pointer: coarse)').matches;
  document.body.classList.toggle('device-mobile', isMobile);
  document.body.classList.toggle('device-desktop', !isMobile);
  window.isMobileDevice = isMobile;
  return isMobile;
}

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = detectDeviceType();

  if (!isMobile && !window.location.hash) {
    window.scrollTo(0, 0);
  }

  const menuTrigger = document.getElementById('menu-trigger');
  const fluidMenu = document.getElementById('fluid-menu');
  if (menuTrigger && fluidMenu) {
    menuTrigger.addEventListener('click', () => fluidMenu.classList.toggle('expanded'));
    const menuLinks = fluidMenu.querySelectorAll('.sub-item');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        fluidMenu.classList.remove('expanded');
      });
    });
  }

  if (window.initApp && typeof window.initApp === "function") {
    window.initApp();
  }

  if ("IntersectionObserver" in window) {
    initIntersectionObserver();
  }

  if (window.performance) {
    window.addEventListener("load", () => {
      const logPerf = () => {
        const navEntries = performance.getEntriesByType('navigation');
        const loadTime = navEntries.length > 0 ? navEntries[0].loadEventEnd : 0;
        if (loadTime > 0) console.log(`⏱️ Page load time: ${loadTime.toFixed(2)}ms`);
      };
      "requestIdleCallback" in window ? requestIdleCallback(logPerf) : setTimeout(logPerf, 1000);
    }, { passive: true });
  }
});

function initIntersectionObserver() {
  const images = document.querySelectorAll("img[loading='lazy']");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        if (img.src && img.src !== "") {
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease";
          if (img.complete && img.naturalWidth !== 0) {
            img.style.opacity = "1";
          } else {
            img.onload = () => {
              img.style.opacity = "1";
            };
          }
        }

        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: "50px 0px",
    threshold: 0.01
  });

  images.forEach(img => imageObserver.observe(img));
}

window.addEventListener("beforeunload", () => {
  console.log("🔚 Page unloading");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("👁️ Tab is hidden");
  } else {
    console.log("👁️ Tab is visible");
  }
});

if (performance.memory) {
  setInterval(() => {
    if (performance.memory.usedJSHeapSize > performance.memory.jsHeapSizeLimit * 0.9) {
      console.warn("⚠️ High memory usage");
    }
  }, 30000);
}

if ("connection" in navigator) {
  navigator.connection.addEventListener("change", () => {
    const type = navigator.connection.effectiveType;
    const downlink = navigator.connection.downlink;
    console.log(`📊 Connection: ${type} (${downlink}Mbps)`);
  });
}
