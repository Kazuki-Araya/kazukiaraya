

window.initVisitor = function() {
  const STORAGE_KEY = "kazuki_visitors";
  const VISITOR_API = "https://api.countapi.xyz/hit/kazuki-araya/visits";

  async function incrementCounter() {
    try {
   
      const response = await fetch(VISITOR_API);
      const data = await response.json();
      
      if (data.value) {
        updateVisitorDisplay(data.value);
      }
    } catch (error) {
     
      let count = localStorage.getItem(STORAGE_KEY) || 0;
      count = parseInt(count) + 1;
      localStorage.setItem(STORAGE_KEY, count);
      updateVisitorDisplay(count);
    }
  }

  function updateVisitorDisplay(count) {
    const visitorElement = document.getElementById("visitor-count");
    if (visitorElement) {
      // Animate counter
      const targetCount = count;
      let currentCount = 0;
      const increment = Math.ceil(targetCount / 30);
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          currentCount = targetCount;
          clearInterval(timer);
        }
        visitorElement.textContent = currentCount.toLocaleString();
      }, 20);
    }
  }

  // Initialize
  incrementCounter();
};


