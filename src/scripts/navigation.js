// Navigation and interaction enhancements
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardShortcuts();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Prevent default browser shortcuts that might interfere
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }

      // Add additional shortcuts
      switch(e.key) {
        case 'Escape':
          // Reset to cover page
          if (window.currentPage > 0) {
            window.currentPage = 0;
            window.showPage(0);
          }
          break;
        case 'r':
        case 'R':
          // Restart experience
          location.reload();
          break;
        case 'm':
        case 'M':
          // Toggle music
          if (window.audioManager) {
            window.audioManager.toggleMusic();
          }
          break;
        case 'v':
        case 'V':
          // Toggle voice
          if (window.audioManager) {
            window.audioManager.toggleVoice();
          }
          break;
      }
    });
  }

  setupAccessibility() {
    // Add ARIA labels and roles
    document.querySelectorAll('.page').forEach((page, index) => {
      page.setAttribute('role', 'article');
      page.setAttribute('aria-label', `Page ${index + 1}`);
    });

    // Add focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Ensure focus stays within the current page
        const activePage = document.querySelector('.page.active');
        if (activePage) {
          const focusableElements = activePage.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    });

    // Add screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Announce page changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
          const pageNumber = Array.from(document.querySelectorAll('.page')).indexOf(mutation.target) + 1;
          const totalPages = document.querySelectorAll('.page').length;
          announcer.textContent = `Page ${pageNumber} of ${totalPages}`;
        }
      });
    });

    document.querySelectorAll('.page').forEach(page => {
      observer.observe(page, { attributes: true, attributeFilter: ['class'] });
    });
  }

  setupPerformanceOptimizations() {
    // Preload next page assets
    let preloadedPages = new Set();

    const preloadPage = (pageIndex) => {
      if (preloadedPages.has(pageIndex)) return;
      
      const page = document.querySelectorAll('.page')[pageIndex];
      if (!page) return;

      // Preload any images or assets in the page
      const images = page.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });

      preloadedPages.add(pageIndex);
    };

    // Preload adjacent pages
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
          const currentIndex = Array.from(document.querySelectorAll('.page')).indexOf(mutation.target);
          
          // Preload next and previous pages
          preloadPage(currentIndex + 1);
          preloadPage(currentIndex - 1);
        }
      });
    });

    document.querySelectorAll('.page').forEach(page => {
      observer.observe(page, { attributes: true, attributeFilter: ['class'] });
    });

    // Optimize animations for performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      document.documentElement.style.setProperty('--transition-duration', '0.1s');
    }

    // Handle visibility changes to pause/resume animations
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Pause animations and audio when tab is not visible
        document.body.style.animationPlayState = 'paused';
        if (window.audioManager && window.audioManager.glitchMusic) {
          window.audioManager.glitchMusic.pause();
        }
      } else {
        // Resume animations and audio when tab becomes visible
        document.body.style.animationPlayState = 'running';
        if (window.audioManager && window.audioManager.musicEnabled && window.audioManager.experienceStarted) {
          if (window.audioManager.glitchMusic) {
            window.audioManager.glitchMusic.play().catch(() => {
              window.audioManager.startSyntheticMusic();
            });
          } else {
            window.audioManager.startSyntheticMusic();
          }
        }
      }
    });
  }
}

// Initialize navigation manager
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
});