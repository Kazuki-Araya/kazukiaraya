const typingRoles = [
  "Anime Fan  ",
  "Gamer  ",
  "Student    ",
  "Streamer  ",
];
let roleIndex = 0;
let charIndex = 0;
let typingDirection = 1;

function updateTyping() {
  const el = document.getElementById("typing");
  if (!el) {
    charIndex = 0; // Reset state if element is gone
    return;
  }

  const currentRole = typingRoles[roleIndex];
  if (typingDirection === 1) {
    el.textContent = currentRole.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentRole.length) {
      typingDirection = -1;
      setTimeout(updateTyping, 1500);
      return;
    }
  } else {
    el.textContent = currentRole.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      typingDirection = 1;
      roleIndex = (roleIndex + 1) % typingRoles.length;
    }
  }

  setTimeout(updateTyping, typingDirection === 1 ? 90 : 40);
}

function initTyping() {
  const el = document.getElementById("typing");
  if (el) {
    updateTyping();
  }
}
