(function() {
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));
  
  const burgerBtn = document.getElementById('burgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('open');
  });
  
  const navLinks = document.querySelectorAll('.nav-overlay a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-nav');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      burgerBtn.classList.remove('active');
      navOverlay.classList.remove('open');
    });
  });
  
  function applyClickEffect(el, url) {
    el.classList.add('click-effect');
    document.getElementById('mainCard').classList.add('pop-in');
    setTimeout(() => {
      el.classList.remove('click-effect');
      document.getElementById('mainCard').classList.remove('pop-in');
    }, 150);
    if (url && url !== '#') {
      setTimeout(() => {
        if (url.startsWith('mailto:')) window.location.href = url;
        else window.open(url, '_blank');
      }, 80);
    }
  }
  
  // ========== INI YANG DIUBAH: HAPUS #allWorksLink DARI SINI ==========
  const clickableItems = document.querySelectorAll('.platform-link, .article-link, .shopnow-btn, .extra-link-item, .linkidn-click');
  clickableItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      let linkUrl = '';
      if (this.classList.contains('platform-link')) linkUrl = this.getAttribute('data-url');
      else if (this.classList.contains('article-link')) linkUrl = this.getAttribute('data-url');
      else if (this.classList.contains('linkidn-click')) linkUrl = this.getAttribute('data-linkidn');
      else if (this.classList.contains('email-contact')) linkUrl = this.getAttribute('data-email');
      if (!linkUrl) linkUrl = 'https://linkidn.id/penuliskamu';
      applyClickEffect(this, linkUrl);
    });
  });
  
  // ========== TOMBOL LIHAT SEMUA TULISAN: SCROLL AJA, TANPA BUKA LINK ==========
  const allWorksBtn = document.getElementById('allWorksLink');
  if (allWorksBtn) {
    // Hapus semua event listener lama dengan clone & replace
    const newBtn = allWorksBtn.cloneNode(true);
    allWorksBtn.parentNode.replaceChild(newBtn, allWorksBtn);
    
    newBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Efek klik
      this.classList.add('click-effect');
      document.getElementById('mainCard').classList.add('pop-in');
      setTimeout(() => {
        this.classList.remove('click-effect');
        document.getElementById('mainCard').classList.remove('pop-in');
      }, 150);
      
      // Scroll ke atas
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();