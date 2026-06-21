/**
 * Detect device capability and disable heavy effects automatically.
 * Also adds a manual toggle button for low-end devices.
 */
window.initPerformance = function() {
  const effectScripts = [
    { src: 'js/effects/sakura.js', id: 'sakura-effect', weak: true },
    { src: 'js/effects/fireworks.js', id: 'fireworks-effect', weak: true },
    { src: 'js/effects/sparks.js', id: 'sparks-effect', weak: true },
    { src: 'js/effects/electricBorder.js', id: 'electric-border-effect', weak: true }
  ];

  const enableEffectsBtn = document.getElementById('enable-effects-btn');

  function getLoadHint() {
    try {
      return window.localStorage.getItem('araya-effects-enabled');
    } catch {
      return null;
    }
  }

  function setLoadHint(val) {
    try {
      window.localStorage.setItem('araya-effects-enabled', val);
    } catch {}
  }

  function isMobile() {
    try {
      const ua = navigator.userAgent || '';
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const coarsePointer = matchMedia && matchMedia('(pointer:coarse)').matches;
      const smallScreen = window.screen && Math.max(window.screen.width, window.screen.height) < 800;

      return isMobileUA || coarsePointer || smallScreen;
    } catch {
      return true;
    }
  }

  const hint = getLoadHint();
  const userWantsEffects = hint === 'on';

  function toggleEnableEffectsButton(show) {
    if (!enableEffectsBtn) return;
    enableEffectsBtn.classList.toggle('show', show);
  }

  function loadEffects() {
    effectScripts.forEach((item) => {
      if (document.getElementById(item.id)) return;
      const s = document.createElement('script');
      s.id = item.id;
      s.src = item.src;
      s.defer = true;
      document.body.appendChild(s);
    });

    const bgVideo = document.getElementById('bg-video');
    if (bgVideo && bgVideo.paused) {
      bgVideo.play().catch(() => {});
    }

    setLoadHint('on');
    document.documentElement.classList.remove('araya-weak-device');
    document.body.classList.remove('araya-weak-device');
    toggleEnableEffectsButton(false);
  }

  window.enableSiteEffects = loadEffects;

  const deviceIsMobile = isMobile();

  if (deviceIsMobile) {
    // Mobile: show toggle button, only enable effects on user click
    if (userWantsEffects) {
      loadEffects();
    } else {
      document.documentElement.classList.add('araya-weak-device');
      document.body.classList.add('araya-weak-device');
      toggleEnableEffectsButton(true);
      const bgVideo = document.getElementById('bg-video');
      if (bgVideo) {
        bgVideo.pause();
      }
    }
  } else {
    // Desktop: effects always ON, never show toggle button
    loadEffects();
  }

  if (enableEffectsBtn) {
    enableEffectsBtn.addEventListener('click', loadEffects);
  }

  const avatarImg = document.querySelector('.hero-avatar-wrap .avatar');
  if (avatarImg) {
    avatarImg.addEventListener('error', () => {
      avatarImg.onerror = null;
      avatarImg.src = 'assets/images/site-image.png';
    });
  }
};
