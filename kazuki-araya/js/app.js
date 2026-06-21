﻿window.initApp = function(){
  if(typeof initPerformance === "function") initPerformance();
  if(typeof initBirthday === "function") initBirthday();
  if(typeof initTheme === "function") initTheme();
  if(typeof initIntro === "function") initIntro();
  if(typeof initMusic === "function") initMusic();
  if(typeof initLinks === "function") initLinks();
  if(typeof initTyping === "function") initTyping();
  if(typeof initAge === "function") initAge();
  if(typeof initPopup === "function") initPopup();
  if(typeof initSecret === "function") initSecret();
  if(typeof initProfileWidgets === "function") initProfileWidgets();
  if(typeof initSakuraEffect === "function") initSakuraEffect();
  if(typeof initFireworksEffect === "function") initFireworksEffect();
  if(typeof initSparksEffect === "function") initSparksEffect();
  if(typeof initElectricBorderEffect === "function") initElectricBorderEffect();
  if(typeof initVisitor === "function") initVisitor();
  if(typeof initMusicPlayer === "function") initMusicPlayer();
  if(typeof initMisc === "function") initMisc();
  if(typeof initCopyButtons === "function") initCopyButtons();
};

function initCopyButtons() {
  document.querySelectorAll('.copy-button[data-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      if (targetId) {
        copyGameID(targetId);
      }
    });
  });
}

function initMisc(){
  if (window.innerWidth > 1024){
    document.addEventListener("mousemove", e=>{
      document.body.style.backgroundPosition=
      (50-e.clientX/50)+"% "+(50-e.clientY/50)+"%";
    });
  }
  window.addEventListener("scroll", ()=>{
    document.body.style.backgroundPositionY=
    window.scrollY*0.3+"px";
  });
  document.addEventListener("copy", (e)=>{
    console.log("U need handwritte");
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", ()=>{
      navigator.serviceWorker.register("./sw.js").then(reg => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Có bản cập nhật mới, tự động reload hoặc hiện thông báo
              console.log('New content is available; please refresh.');
              window.location.reload(); 
            }
          });
        });
      }).catch(err => {
        console.error('SW registration failed:', err);
      });
    });
  }
  if (window.location.search.includes("fbclid=")) {
    const url = new URL(window.location);
    url.searchParams.delete("fbclid");
    const newUrl =
      url.pathname +
      (url.searchParams.toString()
        ? "?" + url.searchParams.toString()
        : "") +
      url.hash;
    window.history.replaceState({}, document.title, newUrl);
  }
}

/**
 * Copy game ID to clipboard
 * @param {string} elementId - The ID of the element containing the game ID
 */
window.copyGameID = function(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const text = element.textContent;
  const button = element.parentElement.querySelector(".copy-button");
  
  // Use modern Clipboard API if available
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyFeedback(button);
    }).catch(() => {
      fallbackCopyToClipboard(text, button);
    });
  } else {
    fallbackCopyToClipboard(text, button);
  }
};

/**
 * Fallback method for copying to clipboard
 * @param {string} text - The text to copy
 * @param {HTMLElement} button - The copy button element
 */
function fallbackCopyToClipboard(text, button) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showCopyFeedback(button);
  } catch (err) {
    console.error("Copy failed:", err);
  }
  document.body.removeChild(textarea);
}

/**
 * Show visual feedback when copying
 * @param {HTMLElement} button - The copy button element
 */
function showCopyFeedback(button) {
  if (button && button.classList.contains("copy-button")) {
    // Add copied state
    button.classList.add("copied");
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.classList.remove("copied");
      button.disabled = false;
    }, 2000);
  }
}
