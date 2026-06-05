document.addEventListener('DOMContentLoaded', () => {
  
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }

  // Close menu when link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.style.display = 'none';
      }
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 20, 25, 0.98)';
      navbar.style.borderBottomColor = 'rgba(55, 65, 81, 0.5)';
    } else {
      navbar.style.background = 'rgba(15, 20, 25, 0.95)';
      navbar.style.borderBottomColor = 'rgb(55, 65, 81)';
    }
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;

      // Validate form
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
      }

      // Show success message
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = 'Message Sent! ✓';
      button.style.background = '#10b981';

      // Reset form
      this.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 3000);

      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', { name, email, message });
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards and skill categories
  document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Add fade-in animation to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.style.color = 'rgb(102, 126, 234)';
      } else {
        item.style.color = '';
      }
    });
  });

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  const profileImg = document.querySelector('.profile-img');

  window.addEventListener('scroll', () => {
    if (!heroSection) return;
    const scrolled = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrolled < heroBottom) {
      profileImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Count up animation for statistics
  const animateCounter = (element, target) => {
    let count = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(count) + '+';
      }
    }, 30);
  };

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const stats = statsSection.querySelectorAll('.stat-number');
    let animated = false;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
});
