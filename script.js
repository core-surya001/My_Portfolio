(function () {
  'use strict';

  // 1. Theme Management (Light / Dark Mode with localStorage)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const rootHtml = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      rootHtml.setAttribute('data-theme', 'dark');
    } else {
      rootHtml.removeAttribute('data-theme');
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  // Initialize Theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = rootHtml.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // 2. Dynamic Year Update
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Contact Form Submission -> Direct WhatsApp Message
  const contactForm = document.getElementById('portfolio-contact-form');
  const toastMsg = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function showToast(text, duration = 3500) {
    if (!toastMsg) return;
    toastText.textContent = text;
    toastMsg.style.display = 'flex';
    setTimeout(() => {
      toastMsg.style.display = 'none';
    }, duration);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const bizType = document.getElementById('contact-biz-type').value;
      const msg = document.getElementById('contact-message').value.trim();

      if (!name || !phone || !bizType) {
        alert('Please fill in your name, phone number, and business type.');
        return;
      }

      // Build clean pre-filled WhatsApp message
      let waMessage = `*New Website Inquiry*\n\n`;
      waMessage += `*Name:* ${name}\n`;
      waMessage += `*Phone:* ${phone}\n`;
      waMessage += `*Business Type:* ${bizType}\n`;
      if (msg) {
        waMessage += `*Requirements:* ${msg}\n`;
      }
      waMessage += `\n_Sent via Surya Pratap Portfolio Website_`;

      const encodedMessage = encodeURIComponent(waMessage);
      const targetUrl = `https://wa.me/919214721254?text=${encodedMessage}`;

      showToast('Opening WhatsApp with your details...');

      // Open WhatsApp in new tab/app after tiny visual feedback delay
      setTimeout(function () {
        window.open(targetUrl, '_blank');
      }, 350);
    });
  }

  // 4. Subtle active nav highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--brand-orange)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
})();
