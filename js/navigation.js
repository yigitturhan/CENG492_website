// Navigation Component
const Navigation = {
  init() {
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupDropdowns();
  },

  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        } else {
          navMenu.classList.add('active');
          mobileToggle.classList.add('active');
          mobileToggle.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });
      
      // Close mobile menu on link click
      const navLinks = navMenu.querySelectorAll('.nav-link, .dropdown-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
      
      // Close mobile menu on outside click
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
      
      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  },

  setupScrollEffects() {
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavigation = () => {
      const scrollY = window.scrollY;
      
      // Add scrolled class
      if (scrollY > 50) {
        navigation.classList.add('scrolled');
      } else {
        navigation.classList.remove('scrolled');
      }
      
      // Hide/show navigation on scroll
      if (scrollY > lastScrollY && scrollY > 100) {
        navigation.style.transform = 'translateY(-100%)';
      } else {
        navigation.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  },

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .cta-button, .nav-logo');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, href);
            
            // Focus target for accessibility
            targetElement.focus();
          }
        }
      });
    });
    
    // Feature card navigation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const target = card.getAttribute('data-target');
        if (target) {
          e.preventDefault();
          
          const targetElement = document.querySelector(target);
          if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL
            history.pushState(null, null, target);
            
            // Focus target for accessibility
            targetElement.focus();
          }
        }
      });
    });
  },

  setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    const sections = document.querySelectorAll('section[id], div[id]');
    
    const updateActiveNav = (sectionId) => {
      // Map feature detail sections to main "features" nav item
      const featureDetailSections = [
        'file-signing', 'file-encryption', 'pdf-signing', 'office-signing',
        'pgp', 'gmail', 'auth-api', 'https', 'credentials', 'logs'
      ];
      
      const targetSection = featureDetailSections.includes(sectionId) ? 'features' : sectionId;
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetSection) {
          link.classList.add('active');
        }
      });
    };

    // Intersection Observer for active navigation
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: [0.1, 0.5]
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            updateActiveNav(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section.getAttribute('id')) {
        sectionObserver.observe(section);
      }
    });

    // Initial active state
    updateActiveNav('home');
  },

  setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (trigger && menu) {
        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const firstLink = menu.querySelector('.dropdown-link');
            if (firstLink) {
              firstLink.focus();
            }
          }
        });
        
        // Arrow key navigation in dropdown
        const dropdownLinks = menu.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach((link, index) => {
          link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const nextIndex = (index + 1) % dropdownLinks.length;
              dropdownLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              const prevIndex = (index - 1 + dropdownLinks.length) % dropdownLinks.length;
              dropdownLinks[prevIndex].focus();
            } else if (e.key === 'Escape') {
              trigger.focus();
            }
          });
        });
      }
    });
  }
};

// Auto-initialize
if (typeof window !== 'undefined') {
  window.Navigation = Navigation;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
