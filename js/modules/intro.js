function initIntro(){
  const intro = document.getElementById("intro");
  if(intro){
    const handleIntroClick = () => {
      intro.classList.add("hide-intro");
      intro.style.pointerEvents = "none";

      // Kích hoạt phát nhạc khi người dùng nhấn vào màn hình Intro
      if (typeof window.toggleMusic === "function") {
        const bgMusic = document.getElementById("bg-music");
        if (bgMusic && bgMusic.paused) window.toggleMusic();
      }
      
      intro.removeEventListener("click", handleIntroClick);
    };
    
    intro.addEventListener("click", handleIntroClick);
  }
}
