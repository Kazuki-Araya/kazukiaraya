function getNextBirthday(now) {
  const year = now.getFullYear();
  const nextBirthday = new Date(year, 7, 22, 0, 0, 0);
  return now > nextBirthday ? new Date(year + 1, 7, 22, 0, 0, 0) : nextBirthday;
}

function formatCountdown(diffMs) {
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  return `${days} ngày ${hours}h ${minutes}m ${seconds}s`;
}

async function refreshBirthdayCountdown() {
  const countdownElement = document.getElementById('birthday-countdown');
  if (!countdownElement) return;

  const now = new Date();
  const todayBirthday = now.getDate() === 22 && now.getMonth() === 7;

  if (todayBirthday) {
    countdownElement.textContent = '🎉 Happy Birthday Araya! 🎂';
    if (typeof window.triggerBirthdayFireworks === 'function') {
      window.triggerBirthdayFireworks();
    }
    return;
  }

  const nextBirthday = getNextBirthday(now);
  const diffTime = nextBirthday.getTime() - now.getTime();
  countdownElement.textContent = formatCountdown(diffTime);
}

window.initBirthday = function() {
  refreshBirthdayCountdown();
  setInterval(refreshBirthdayCountdown, 1000);
};
