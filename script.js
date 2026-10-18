/**
 * Ruang Informasi — Interactive Features (script.js)
 * Mengelola Reading Progress Bar, Drawer Navigasi, Modal Pencarian,
 * Tombol Salin/Share, dan Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi ikon Lucide
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Reading Progress Bar & Back-to-Top Button
  const progressBar = document.getElementById('progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Tampilkan tombol back-to-top jika scroll lebih dari 300px
    if (backToTopBtn) {
      if (winScroll > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Hamburger Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
    });

    // Tutup drawer jika mengklik di luar drawer
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // 4. Salin Tautan (Copy Link) & Notifikasi Toast
  const copyBtn = document.getElementById('btn-copy-link');
  const copyToast = document.getElementById('copy-toast');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(showCopiedToast).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }

  function showCopiedToast() {
    if (copyToast) {
      copyToast.classList.add('show');
      if (copyBtnText) copyBtnText.textContent = 'Tersalin!';
      setTimeout(() => {
        copyToast.classList.remove('show');
        if (copyBtnText) copyBtnText.textContent = 'Salin Tautan';
      }, 2500);
    }
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showCopiedToast();
    } catch (err) {
      alert('Gagal menyalin tautan secara otomatis.');
    }
    document.body.removeChild(tempInput);
  }

  // 5. Social Share Buttons (WhatsApp & Twitter / X)
  const shareWa = document.getElementById('share-wa');
  const shareTw = document.getElementById('share-tw');
  const articleTitle = encodeURIComponent("Mengapa Anak Muda Lebih Sering Mendapatkan Informasi dari Media Sosial? — Ruang Informasi");
  const articleUrl = encodeURIComponent(window.location.href);

  if (shareWa) {
    shareWa.addEventListener('click', () => {
      window.open(`https://api.whatsapp.com/send?text=${articleTitle}%20${articleUrl}`, '_blank');
    });
  }

  if (shareTw) {
    shareTw.addEventListener('click', () => {
      window.open(`https://twitter.com/intent/tweet?text=${articleTitle}&url=${articleUrl}`, '_blank');
    });
  }

  // 6. Search Modal Dialog Interactions
  const searchTrigger = document.getElementById('search-trigger');
  const searchModal = document.getElementById('search-modal');
  const closeSearch = document.getElementById('close-search');

  if (searchTrigger && searchModal) {
    searchTrigger.addEventListener('click', () => {
      searchModal.classList.add('active');
      const input = searchModal.querySelector('input');
      if (input) {
        setTimeout(() => input.focus(), 50);
      }
    });

    if (closeSearch) {
      closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
      }
    });
  }
});
