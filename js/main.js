// Main JavaScript Entry Point
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeApp();
});

function initializeApp() {
  // Initialize navigation
  if (typeof Navigation !== 'undefined') {
    Navigation.init();
  }
  
  // Initialize language switcher
  if (typeof LanguageSwitcher !== 'undefined') {
    LanguageSwitcher.init();
  }
  
  // Initialize other components
  initializeLazyLoading();
  initializeScrollEffects();
  initializeAccessibility();
  initializePerformance();
  initializeSmoothScrolling();
}

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          img.src = img.src || img.dataset.src;
          
          // Add loaded class for fade-in effect
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          // Stop observing this image
          imageObserver.unobserve(img);
        }
      });
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.src || img.dataset.src;
      img.classList.add('loaded');
    });
  }
}

// Scroll Effects
function initializeScrollEffects() {
  let ticking = false;
  
  function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    const navigation = document.querySelector('.navigation');
    
    // Add scrolled class to navigation
    if (scrollY > 50) {
      navigation.classList.add('scrolled');
    } else {
      navigation.classList.remove('scrolled');
    }
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      const parallaxSpeed = 0.5;
      heroBackground.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
    
    ticking = false;
  }
  
  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Accessibility Enhancements
function initializeAccessibility() {
  // Skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(skipLink.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Focus management for dropdowns
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (trigger && menu) {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const firstLink = menu.querySelector('.dropdown-link');
          if (firstLink) {
            firstLink.focus();
          }
        }
      });
    }
  });
  
  // Announce page changes for screen readers
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionTitle = entry.target.querySelector('h1, h2, h3');
        if (sectionTitle) {
          // Announce section change
          announceToScreenReader(`Now viewing: ${sectionTitle.textContent}`);
        }
      }
    });
  }, {
    threshold: 0.5
  });
  
  sections.forEach(section => observer.observe(section));
}

// Performance Optimizations
function initializePerformance() {
  // Preload critical resources
  const preloadResources = [
    { href: 'assets/images/background.webp', as: 'image' },
    { href: 'data/translations.json', as: 'fetch', crossorigin: 'anonymous' }
  ];
  
  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    document.head.appendChild(link);
  });
  
  // Service Worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }
}

// Utility Functions
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, `#${targetId}`);
        
        // Focus the target element for accessibility
        targetElement.focus();
      }
    });
  });
}

// Initialize smooth scrolling
initializeSmoothScrolling();

// Error Handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  // You could send this to an error reporting service
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  // You could send this to an error reporting service
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page is hidden - pause animations, stop timers
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible - resume animations, start timers
    document.body.classList.remove('page-hidden');
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    initializeLazyLoading,
    initializeScrollEffects,
    initializeAccessibility,
    initializePerformance,
    announceToScreenReader
  };
}
