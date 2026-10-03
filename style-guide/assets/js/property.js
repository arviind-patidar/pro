/* AcrenKey Property Detail Page Interactive Controller */

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Gallery Thumbnail Switching
  var mainImg = document.getElementById('propMainImage');
  var thumbs = document.querySelectorAll('.prop-thumb-item');
  
  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      var fullUrl = this.getAttribute('data-full');
      if (fullUrl && mainImg) {
        mainImg.src = fullUrl;
        thumbs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
      }
    });
  });

  // 2. Floor Plan Tab Switching
  var fpTabs = document.querySelectorAll('.prop-fp-tab-btn');
  var fp3bhk = document.getElementById('fp-content-3bhk');
  var fp4bhk = document.getElementById('fp-content-4bhk');

  fpTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = this.getAttribute('data-tab');
      fpTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      if (target === '3bhk') {
        if (fp3bhk) fp3bhk.style.display = 'grid';
        if (fp4bhk) fp4bhk.style.display = 'none';
      } else if (target === '4bhk') {
        if (fp3bhk) fp3bhk.style.display = 'none';
        if (fp4bhk) fp4bhk.style.display = 'grid';
      }
    });
  });

      // 4. Robust Section Navigation Active Underline & Smooth Scroll Controller
  window.isNavClicking = false;

  window.switchPropNavTab = function(el) {
    if (!el) return;
    var navLinks = document.querySelectorAll('.prop-nav-link');
    navLinks.forEach(function(l) { l.classList.remove('active'); });
    el.classList.add('active');
  };

  var navLinks = document.querySelectorAll('.prop-nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          window.isNavClicking = true;
          window.switchPropNavTab(this);

          var topPos = targetEl.offsetTop - 120;
          window.scrollTo({
            top: topPos,
            behavior: 'smooth'
          });

          setTimeout(function() {
            window.isNavClicking = false;
          }, 900);
        }
      }
    });
  });

  window.addEventListener('scroll', function() {
    if (window.isNavClicking) return;

    var scrollPos = window.scrollY + 180;
    var activeHref = '#overview';

    var allNavLinks = document.querySelectorAll('.prop-nav-link');
    allNavLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var sec = document.querySelector(href);
        if (sec && sec.offsetTop <= scrollPos) {
          activeHref = href;
        }
      }
    });

    if (activeHref) {
      allNavLinks.forEach(function(link) {
        if (link.getAttribute('href') === activeHref) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });

  // 6. Amenities Drawer Overlay Controls
  var amDrawer = document.getElementById('propAmenitiesDrawer');
  var amCloseBtn = document.getElementById('propDrawerClose');

  window.openAmenitiesDrawer = function() {
    if (amDrawer) {
      amDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAmenitiesDrawer = function() {
    if (amDrawer) {
      amDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (amCloseBtn) {
    amCloseBtn.addEventListener('click', window.closeAmenitiesDrawer);
  }

  if (amDrawer) {
    amDrawer.addEventListener('click', function(e) {
      if (e.target === amDrawer) {
        window.closeAmenitiesDrawer();
      }
    });
  }


  // 7. Interactive Tower Analysis Selector
  var towerData = {
    'luma': { name: 'LUMA (Tower 01)', orientation: 'East - West', view: 'Podium Green & Entrance Water Plaza', privacy: 'High (Corner Placement)', noise: 'Low', configs: '3 BHK Regal & 4 BHK Elite' },
    'sora': { name: 'SORA (Tower 02)', orientation: 'East - West', view: 'Direct Lake View & Central Courtyard', privacy: 'High', noise: 'Low', configs: '1 BHK, 3 BHK & 4 BHK Regal' },
    'vana': { name: 'VANA (Tower 03)', orientation: 'East - West', view: 'Unobstructed Lake Frontage', privacy: 'Very High', noise: 'Very Low', configs: '1 BHK, 3 BHK & 4 BHK Elite' },
    'nira': { name: 'NIRA (Tower 04)', orientation: 'East - West', view: 'Twin Lake Vistas & Fitness Park', privacy: 'High', noise: 'Low', configs: '3 BHK Elite & Regal' },
    'kora': { name: 'KORA (Tower 05)', orientation: 'East - West', view: 'South Courtyard & Garden Belts', privacy: 'High', noise: 'Low', configs: '3 BHK Elite & Regal' },
    'mira': { name: 'MIRA (Tower 06)', orientation: 'North - South', view: 'East Green Belt & Open Sky', privacy: 'High', noise: 'Low', configs: '3 BHK & 4 BHK Luxury' },
    'olea': { name: 'OLEA (Tower 07)', orientation: 'North - South', view: 'Clubhouse Deck & Reflexology Pathway', privacy: 'Moderate', noise: 'Low', configs: '3 BHK & 4 BHK Luxury' }
  };

  var towerBtns = document.querySelectorAll('.prop-tower-btn');
  var tName = document.getElementById('t-detail-name');
  var tOrient = document.getElementById('t-detail-orient');
  var tView = document.getElementById('t-detail-view');
  var tPrivacy = document.getElementById('t-detail-privacy');
  var tNoise = document.getElementById('t-detail-noise');
  var tConfigs = document.getElementById('t-detail-configs');

  towerBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = this.getAttribute('data-tower');
      towerBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      if (towerData[key]) {
        var d = towerData[key];
        if (tName) tName.textContent = d.name;
        if (tOrient) tOrient.textContent = d.orientation;
        if (tView) tView.textContent = d.view;
        if (tPrivacy) tPrivacy.textContent = d.privacy;
        if (tNoise) tNoise.textContent = d.noise;
        if (tConfigs) tConfigs.textContent = d.configs;
      }
    });
  });


  // 9. Overview YouTube Video Embed Trigger
  window.playOverviewVideo = function() {
    var box = document.getElementById('propVideoBox') || document.getElementById('overviewVideoBox');
    if (box) {
      box.innerHTML = '<video id="overviewVideoPlayer" controls playsinline preload="auto" width="100%" style="border-radius:12px; width:100%; aspect-ratio:16/9; object-fit:cover; background:#000000;"><source src="../../style-guide/assets/sumadhura_solace_walkthrough.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
      
      var player = document.getElementById('overviewVideoPlayer');
      if (player) {
        var playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise.catch(function(error) {
            console.warn('Playback error, retrying muted:', error);
            player.muted = true;
            player.play();
          });
        }
      }
    }
  };


  // 10. Spacious Floor Plans Tab Controller
  var fpTabsV2 = document.querySelectorAll('.prop-fp-tab-btn-v2');
  var fpGrid3bhk = document.getElementById('fp-v2-3bhk');
  var fpGrid4bhk = document.getElementById('fp-v2-4bhk');

  fpTabsV2.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      if (e) e.preventDefault();
      var target = this.getAttribute('data-tab');
      fpTabsV2.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      if (target === '3bhk') {
        if (fpGrid3bhk) fpGrid3bhk.style.setProperty('display', 'grid', 'important');
        if (fpGrid4bhk) fpGrid4bhk.style.setProperty('display', 'none', 'important');
      } else if (target === '4bhk') {
        if (fpGrid3bhk) fpGrid3bhk.style.setProperty('display', 'none', 'important');
        if (fpGrid4bhk) fpGrid4bhk.style.setProperty('display', 'grid', 'important');
      }
    });
  });


  // 11. Floor Plan Lightbox Modal Controller
  window.openFloorPlanModal = function(imgSrc, title) {
    var modal = document.getElementById('propFloorPlanModal');
    var modalImg = document.getElementById('propFpModalImg');
    var modalTitle = document.getElementById('propFpModalTitle');

    if (modalImg && imgSrc) modalImg.src = imgSrc;
    if (modalTitle && title) modalTitle.textContent = title;
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeFloorPlanModal = function(e) {
    if (e && e.target && e.target.id !== 'propFloorPlanModal' && !e.target.classList.contains('prop-fp-modal-close')) {
      return;
    }
    var modal = document.getElementById('propFloorPlanModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };


  // 12. Floor Plans & Space Analysis v3 Tab Controller
  var fpTabsV3 = document.querySelectorAll('.prop-fp-tab-btn-v3');
  var fpV3_3bhk = document.getElementById('fp-v3-3bhk');
  var fpV3_4bhk = document.getElementById('fp-v3-4bhk');

  fpTabsV3.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      if (e) e.preventDefault();
      var target = this.getAttribute('data-tab');
      fpTabsV3.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      if (target === '3bhk') {
        if (fpV3_3bhk) fpV3_3bhk.style.setProperty('display', 'grid', 'important');
        if (fpV3_4bhk) fpV3_4bhk.style.setProperty('display', 'none', 'important');
      } else if (target === '4bhk') {
        if (fpV3_3bhk) fpV3_3bhk.style.setProperty('display', 'none', 'important');
        if (fpV3_4bhk) fpV3_4bhk.style.setProperty('display', 'grid', 'important');
      }
    });
  });


  // 13. Hero Gallery Auto-Scroll Slideshow Controller
  (function() {
    var mainImg = document.getElementById('propMainImage');
    var thumbs = document.querySelectorAll('.prop-thumb-overlay-item, .prop-thumb-item');
    var galleryWrapper = document.querySelector('.prop-gallery-wrapper');
    
    if (!mainImg || thumbs.length === 0) return;

    var currentIndex = 0;
    var autoScrollTimer = null;
    var isHovered = false;

    function showSlide(index) {
      if (index >= thumbs.length) index = 0;
      if (index < 0) index = thumbs.length - 1;

      currentIndex = index;
      var targetThumb = thumbs[currentIndex];
      var fullUrl = targetThumb.getAttribute('data-full');

      if (fullUrl && mainImg) {
        mainImg.style.transition = 'opacity 0.3s ease';
        mainImg.style.opacity = '0.85';
        
        setTimeout(function() {
          mainImg.src = fullUrl;
          mainImg.style.opacity = '1';
        }, 150);

        thumbs.forEach(function(t) { t.classList.remove('active'); });
        targetThumb.classList.add('active');
      }
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollTimer = setInterval(function() {
        if (!isHovered) {
          showSlide(currentIndex + 1);
        }
      }, 3600);
    }

    function stopAutoScroll() {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }

    thumbs.forEach(function(thumb, idx) {
      thumb.addEventListener('click', function() {
        showSlide(idx);
        startAutoScroll();
      });
    });

    if (galleryWrapper) {
      galleryWrapper.addEventListener('mouseenter', function() { isHovered = true; });
      galleryWrapper.addEventListener('mouseleave', function() { isHovered = false; });
    }

    startAutoScroll();
  })();


  // 14. Fullscreen Hero Gallery Lightbox Controller
  var heroPhotos = [
    { src: '../../style-guide/assets/sumadhura_solace_hero.jpg', title: 'Twin Towers & Infinity Pool View' },
    { src: '../../style-guide/assets/sumadhura_solace_aerial.jpg', title: '11.66-Acre Twin Lake Aerial View' },
    { src: '../../style-guide/assets/bengaluru_couple_tablet.webp', title: 'Luxury Clubhouse & Living Environment' },
    { src: '../../style-guide/assets/sumadhura_solace_google_map.jpg', title: 'Whitefield Prime Location Map' },
    { src: '../../style-guide/assets/sumadhura_solace_3bhk_floorplan.jpg', title: '3 BHK Floor Plan Layout' },
    { src: '../../style-guide/assets/sumadhura_solace_4bhk_floorplan.jpg', title: '4 BHK Floor Plan Layout' }
  ];

  var activeHeroIdx = 0;

  function renderHeroModalSlide(idx) {
    if (idx < 0) idx = heroPhotos.length - 1;
    if (idx >= heroPhotos.length) idx = 0;
    activeHeroIdx = idx;

    var modalImg = document.getElementById('heroGalleryLightboxImg');
    var counterEl = document.getElementById('heroGalleryCounter');
    var titleEl = document.getElementById('heroGalleryTitle');
    var thumbsBox = document.getElementById('heroGalleryLightboxThumbs');

    var p = heroPhotos[activeHeroIdx];
    if (modalImg) modalImg.src = p.src;
    if (counterEl) counterEl.textContent = (activeHeroIdx + 1) + ' / ' + heroPhotos.length;
    if (titleEl) titleEl.textContent = p.title;

    if (thumbsBox && thumbsBox.children.length === 0) {
      thumbsBox.innerHTML = '';
      heroPhotos.forEach(function(item, i) {
        var t = document.createElement('div');
        t.className = 'prop-gallery-lightbox-thumb-item' + (i === activeHeroIdx ? ' active' : '');
        t.innerHTML = '<img src="' + item.src + '" alt="' + item.title + '">';
        t.onclick = function() { renderHeroModalSlide(i); };
        thumbsBox.appendChild(t);
      });
    } else if (thumbsBox) {
      var tItems = thumbsBox.querySelectorAll('.prop-gallery-lightbox-thumb-item');
      tItems.forEach(function(item, i) {
        if (i === activeHeroIdx) item.classList.add('active');
        else item.classList.remove('active');
      });
    }
  }

  window.openHeroGalleryModal = function(startIndex) {
    var modal = document.getElementById('propGalleryLightboxModal');
    renderHeroModalSlide(typeof startIndex === 'number' ? startIndex : 0);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeHeroGalleryModal = function(e) {
    if (e && e.target && e.target.id !== 'propGalleryLightboxModal' && !e.target.classList.contains('prop-gallery-lightbox-close')) {
      return;
    }
    var modal = document.getElementById('propGalleryLightboxModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.nextHeroGallerySlide = function() {
    renderHeroModalSlide(activeHeroIdx + 1);
  };

  window.prevHeroGallerySlide = function() {
    renderHeroModalSlide(activeHeroIdx - 1);
  };

  document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('propGalleryLightboxModal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'ArrowRight') nextHeroGallerySlide();
      if (e.key === 'ArrowLeft') prevHeroGallerySlide();
      if (e.key === 'Escape') closeHeroGalleryModal();
    }
  });


  

    // Unified Single-Source FAQ Accordion Handler
  window.toggleFaqItem = function(qEl) {
    if (!qEl) return;
    var item = qEl.closest ? qEl.closest('.prop-faq-item') : qEl.parentElement;
    if (!item) return;

    var isOpen = item.classList.contains('active');
    
    // Close all FAQ items cleanly
    var allItems = document.querySelectorAll('.prop-faq-item');
    for (var i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
      var ans = allItems[i].querySelector('.prop-faq-a');
      if (ans) {
        ans.style.removeProperty('display');
      }
    }

    // Toggle current item
    if (!isOpen) {
      item.classList.add('active');
      var targetAns = item.querySelector('.prop-faq-a');
      if (targetAns) {
        targetAns.style.display = 'block';
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
      var q = e.target.closest('.prop-faq-q');
      if (q) {
        window.toggleFaqItem(q);
      }
    });
  });

});

// Global AcrenKey Score Breakup Modal Handlers
window.openAcrenKeyScoreModal = function() {
  var modal = document.getElementById('acrenkeyScoreModal');
  if (modal) {
    modal.style.setProperty('display', 'flex', 'important');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAcrenKeyScoreModal = function() {
  var modal = document.getElementById('acrenkeyScoreModal');
  if (modal) {
    modal.style.setProperty('display', 'none', 'important');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.closeAcrenKeyScoreModalOnOverlay = function(e) {
  if (e && e.target && e.target.id === 'acrenkeyScoreModal') {
    window.closeAcrenKeyScoreModal();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var badge = document.querySelector('.prop-hero-score-badge');
  if (badge) {
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.openAcrenKeyScoreModal();
    });
  }
});

document.addEventListener('click', function(e) {
  if (e.target && (e.target.classList.contains('prop-hero-score-badge') || e.target.closest('.prop-hero-score-badge'))) {
    window.openAcrenKeyScoreModal();
  }
});

// Global Smooth Scroll Helper for Floor Plans
window.scrollToFloorPlans = function(e) {
  if (e) e.preventDefault();
  var sec = document.querySelector('#floor-plans') || document.querySelector('#floorplan') || document.querySelector('#configuration') || document.querySelector('#configurations');
  if (sec) {
    var topPos = sec.offsetTop - 100;
    window.scrollTo({ top: topPos, behavior: 'smooth' });
  }
};