document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const startBtn = document.getElementById("start");
  const currentPageSpan = document.getElementById("current-page");
  const totalPagesSpan = document.getElementById("total-pages");
  
  let currentPage = 0;
  let isTransitioning = false;

  // Initialize
  if (totalPagesSpan) totalPagesSpan.textContent = pages.length;
  updatePageCounter();

  // Custom cursor movement
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  });

  // Add CSS variables for cursor
  document.documentElement.style.setProperty('--cursor-x', '0px');
  document.documentElement.style.setProperty('--cursor-y', '0px');

  // Update cursor position
  const style = document.createElement('style');
  style.textContent = `
    body::after {
      left: var(--cursor-x);
      top: var(--cursor-y);
    }
  `;
  document.head.appendChild(style);

  function showPage(index) {
    if (index < 0 || index >= pages.length) return;
    
    console.log(`Showing page ${index + 1} of ${pages.length}`);

    pages.forEach((page, i) => {
      page.classList.remove("active");
      
      if (i === index) {
        page.classList.add("active");
        // Force centering
        page.style.transform = "translate(-50%, -50%)";
        page.style.position = "absolute";
        page.style.top = "50%";
        page.style.left = "50%";
        console.log(`Page ${i + 1} is now active`);
      }
    });

    updatePageCounter();
    
    // Play page turn sound
    if (window.audioManager && index > 0) {
      window.audioManager.playPageTurn();
    }
  }

  function nextPage() {
    if (currentPage < pages.length - 1) {
      currentPage++;
      console.log(`Moving to page ${currentPage + 1}`);
      showPage(currentPage);
    } else {
      console.log(`Already on last page (${pages.length})`);
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      console.log(`Moving back to page ${currentPage + 1}`);
      showPage(currentPage);
    } else {
      console.log('Already on first page');
    }
  }

  function updatePageCounter() {
    if (currentPageSpan) currentPageSpan.textContent = currentPage + 1;
  }

  // Start button
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Initialize audio system but don't auto-play
    if (window.audioManager) {
      window.audioManager.startExperience();
    }

    nextPage();
  });

  // Click anywhere to turn page
  document.addEventListener("click", (e) => {
    console.log('Click detected on:', e.target.tagName, e.target.className);
    
    const isStartBtn = e.target.id === "start";
    const isAudioBtn = e.target.classList.contains("audio-btn");
    const isLink = e.target.tagName === "A" || e.target.closest("a");
    const isPortalPage = e.target.closest(".portal-page");
    
    if (isStartBtn || isAudioBtn || isLink) {
      console.log('Ignoring click on special element');
      return;
    }

    // Handle portal clicks - open URL but also advance page
    if (isPortalPage && currentPage > 0 && currentPage < pages.length - 1) {
      // Handle portal click
      const portalPage = e.target.closest(".portal-page");
      const url = portalPage.getAttribute("data-url");
      if (url) {
        console.log('Opening portal:', url);
        // Add portal opening effect
        portalPage.style.transform = "scale(1.1)";
        setTimeout(() => {
          window.open(url, "_blank");
          portalPage.style.transform = "";
          // Also advance to next page after opening portal
          setTimeout(() => {
            nextPage();
          }, 500);
        }, 200);
        return;
      }
    }

    console.log('Attempting to turn page. Current page:', currentPage + 1);
    
    if (currentPage === 0) {
      // On cover page, start the experience
      console.log('Starting experience from cover page');
      startBtn.click();
    } else {
      // Turn to next page
      console.log('Turning to next page');
      nextPage();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    switch(e.key) {
      case "ArrowRight":
      case " ":
        e.preventDefault();
        if (currentPage === 0) {
          startBtn.click();
        } else {
          nextPage();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevPage();
        break;
      case "Home":
        e.preventDefault();
        currentPage = 0;
        showPage(currentPage);
        break;
      case "End":
        e.preventDefault();
        currentPage = pages.length - 1;
        showPage(currentPage);
        break;
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Minimum swipe distance
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe left - next page
        if (currentPage === 0) {
          startBtn.click();
        } else {
          nextPage();
        }
      } else {
        // Swipe right - previous page
        prevPage();
      }
    }

    touchStartX = 0;
    touchStartY = 0;
  });

  // Initialize first page
  console.log('Initializing with', pages.length, 'total pages');
  showPage(currentPage);

  // Add portal hover effects

  // Particle effects for final page

  // Make functions globally available for debugging
  window.nextPage = nextPage;
  window.prevPage = prevPage;
  window.showPage = showPage;
  window.currentPage = () => currentPage;
});