
var akGetBasePath = function() {
  var b = "/";
  var s = document.querySelector('script[src*="website"]');
  if (s && s.getAttribute("src")) {
    var src = s.getAttribute("src");
    var idx = src.lastIndexOf("website");
    if (idx !== -1) b = src.substring(0, idx);
  }
  return b;
};
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function markPageReady() {
    document.documentElement.classList.add('is-ready');
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    markPageReady();
} else {
    document.addEventListener('DOMContentLoaded', markPageReady);
    window.addEventListener('load', markPageReady);
}

window.addEventListener('beforeunload', function () {
    if (!window.location.hash || window.location.hash === '#') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
});

function scrollToHashTarget(smooth) {
    var hash = window.location.hash;
    if (hash && hash.length > 1) {
        try {
            var target = document.querySelector(hash);
            if (target) {
                var headerNav = document.getElementById('header-nav');
                var headerOffset = headerNav ? headerNav.offsetHeight + 10 : 90;
                var elemPos = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: Math.max(0, elemPos - headerOffset),
                    behavior: smooth ? 'smooth' : 'auto'
                });
            }
        } catch (e) {}
    } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash && window.location.hash !== '#') {
        scrollToHashTarget(false);
        setTimeout(function () { scrollToHashTarget(true); }, 150);
    } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
const headerNav = document.getElementById('header-nav');
const hasHero = document.querySelector('.hero-section');

window.addEventListener('scroll', function () {
    if (headerNav) {
        if (window.scrollY > 30) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }
    }
}, { passive: true });

function ensureHeaderCtaBadges() {
    var navCtas = document.querySelectorAll('.header-nav .nav-cta-btn, .header-nav .primary-cta-btn, .header-nav .mobile-drawer-cta');
    navCtas.forEach(function (btn) {
        if (!btn.querySelector('.cta-arrow-badge')) {
            var badge = document.createElement('span');
            badge.className = 'cta-arrow-badge';
            badge.setAttribute('aria-hidden', 'true');
            badge.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4.5" y1="11.5" x2="11.5" y2="4.5"></line><polyline points="6.5 4.5 11.5 4.5 11.5 9.5"></polyline></svg>';
            btn.appendChild(badge);
        }
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureHeaderCtaBadges);
} else {
    ensureHeaderCtaBadges();
}
const mobileBtn = document.getElementById('mobile-toggle-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileDrawerClose = document.getElementById('mobile-drawer-close');
function openMobileDrawer() {
if (mobileDrawer) mobileDrawer.classList.add('is-active');
if (mobileNavOverlay) mobileNavOverlay.classList.add('is-active');
if (mobileBtn) {
mobileBtn.classList.add('is-active');
mobileBtn.setAttribute('aria-expanded', 'true');
}
document.body.classList.add('drawer-open');
}
function closeMobileDrawer() {
if (mobileDrawer) mobileDrawer.classList.remove('is-active');
if (mobileNavOverlay) mobileNavOverlay.classList.remove('is-active');
if (mobileBtn) {
mobileBtn.classList.remove('is-active');
mobileBtn.setAttribute('aria-expanded', 'false');
}
document.body.classList.remove('drawer-open');
}
if (mobileBtn) {
mobileBtn.addEventListener('click', function (e) {
e.stopPropagation();
if (mobileDrawer && mobileDrawer.classList.contains('is-active')) {
closeMobileDrawer();
} else {
openMobileDrawer();
}
});
}
if (mobileDrawerClose) {
mobileDrawerClose.addEventListener('click', function () {
closeMobileDrawer();
});
}
if (mobileNavOverlay) {
mobileNavOverlay.addEventListener('click', function () {
closeMobileDrawer();
});
}
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-active')) {
closeMobileDrawer();
}
});
if (mobileDrawer) {
const drawerLinks = mobileDrawer.querySelectorAll('a');
drawerLinks.forEach(function (link) {
link.addEventListener('click', function () {
closeMobileDrawer();
});
});
}
const hubGridMatrix = document.querySelector('.hub-grid-matrix');
if (hubGridMatrix) {
const observerOptions = {
root: null,
threshold: 0.2
};
const observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add('animated');
} else {
entry.target.classList.remove('animated');
}
});
}, observerOptions);
observer.observe(hubGridMatrix);
}
const processCards = document.querySelectorAll('.market-lens-card');
const processSection = document.getElementById('buyers-checklist');
const processImg = document.getElementById('process-visual-img');
const stepImages = {
0: 'style-guide/assets/market_lens_ready_vs_uc.webp?v=20260816_flush_cache_v62',
1: 'style-guide/assets/market_lens_builder.webp?v=20260816_flush_cache_v62',
2: 'style-guide/assets/market_lens_corridor.webp?v=20260816_flush_cache_v62',
3: 'style-guide/assets/market_lens_floor.webp?v=20260816_flush_cache_v62',
4: 'style-guide/assets/market_lens_home_inv.webp?v=20260816_flush_cache_v62'
};
function updateStepVisual(stepIndex) {
if (!processImg) return;
const targetSrc = stepImages[stepIndex] || stepImages[0];
if (processImg.getAttribute('src') !== targetSrc) {
processImg.classList.add('fade-out');
setTimeout(function () {
processImg.setAttribute('src', targetSrc);
processImg.classList.remove('fade-out');
}, 180);
}
}
if (processCards.length > 0 && processSection) {
let currentStep = 0;
let stepTimer = null;
let isUserHovering = false;
function highlightStep(index) {
processCards.forEach(function (card, i) {
if (i === index) {
card.classList.add('active-step');
} else {
card.classList.remove('active-step');
}
});
updateStepVisual(index);
}
function advanceStep() {
if (isUserHovering) return;
highlightStep(currentStep);
currentStep = (currentStep + 1) % processCards.length;
}
function startLoop() {
if (!stepTimer) {
advanceStep();
stepTimer = setInterval(advanceStep, 2200);
}
}
function stopLoop() {
if (stepTimer) {
clearInterval(stepTimer);
stepTimer = null;
}
}
processCards.forEach(function (card, idx) {
card.addEventListener('mouseenter', function () {
isUserHovering = true;
stopLoop();
highlightStep(idx);
});
card.addEventListener('mouseleave', function () {
isUserHovering = false;
currentStep = (idx + 1) % processCards.length;
startLoop();
});
card.addEventListener('click', function () {
highlightStep(idx);
});
});
const processObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
startLoop();
} else {
stopLoop();
}
});
}, { threshold: 0.2 });
processObserver.observe(processSection);
}
const frameworkCards = document.querySelectorAll('.framework-card');
const frameworkSection = document.getElementById('framework');
if (frameworkCards.length > 0 && frameworkSection) {
let currentFrameworkStep = 0;
let frameworkTimer = null;
let isFrameworkHovering = false;
function highlightFrameworkStep(index) {
frameworkCards.forEach(function (card, i) {
if (i === index) {
card.classList.add('active-step');
} else {
card.classList.remove('active-step');
}
});
}
function advanceFrameworkStep() {
if (isFrameworkHovering) return;
highlightFrameworkStep(currentFrameworkStep);
currentFrameworkStep = (currentFrameworkStep + 1) % frameworkCards.length;
}
function startFrameworkLoop() {
if (!frameworkTimer) {
advanceFrameworkStep();
frameworkTimer = setInterval(advanceFrameworkStep, 2200);
}
}
function stopFrameworkLoop() {
if (frameworkTimer) {
clearInterval(frameworkTimer);
frameworkTimer = null;
}
}
frameworkCards.forEach(function (card, idx) {
card.addEventListener('mouseenter', function () {
isFrameworkHovering = true;
stopFrameworkLoop();
highlightFrameworkStep(idx);
});
card.addEventListener('mouseleave', function () {
isFrameworkHovering = false;
currentFrameworkStep = (idx + 1) % frameworkCards.length;
startFrameworkLoop();
});
card.addEventListener('click', function () {
highlightFrameworkStep(idx);
});
});
const frameworkObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
startFrameworkLoop();
} else {
stopFrameworkLoop();
}
});
}, { threshold: 0.2 });
frameworkObserver.observe(frameworkSection);
}
const wawRevealEls = document.querySelectorAll('.waw-reveal');
if (wawRevealEls.length > 0) {
var wawDelay = 0;
const wawObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
} else {
entry.target.classList.remove('is-visible');
}
});
}, { threshold: 0.15 });
wawRevealEls.forEach(function (el) {
wawObserver.observe(el);
});
}
const frameworkGrid = document.querySelector('.framework-grid');
const dots = document.querySelectorAll('.framework-carousel-dots .dot-btn');
if (frameworkGrid && dots.length > 0) {
let currentCardIndex = 0;
function updateDots(index) {
dots.forEach((dot, idx) => {
if (idx === index) {
dot.classList.add('active');
} else {
dot.classList.remove('active');
}
});
}
function scrollToCard(index) {
if (window.innerWidth > 991) return;
const wrappers = frameworkGrid.querySelectorAll('.framework-card-wrapper');
if (wrappers[index]) {
const targetCard = wrappers[index];
const scrollLeftPos = targetCard.offsetLeft - frameworkGrid.offsetLeft - 20;
frameworkGrid.scrollTo({
left: scrollLeftPos,
behavior: 'smooth'
});
currentCardIndex = index;
updateDots(index);
}
}
let cardWidth = 0;
function updateCardWidth() {
const wrappers = frameworkGrid.querySelectorAll('.framework-card-wrapper');
if (wrappers.length > 0) {
cardWidth = wrappers[0].offsetWidth + 16;
}
}
updateCardWidth();
window.addEventListener('resize', updateCardWidth);
let isScrollDebouncing = false;
frameworkGrid.addEventListener('scroll', () => {
if (!isScrollDebouncing) {
window.requestAnimationFrame(() => {
const wrappers = frameworkGrid.querySelectorAll('.framework-card-wrapper');
if (wrappers.length > 0) {
const scrollLeft = frameworkGrid.scrollLeft;
if (!cardWidth) updateCardWidth();
const calculatedIndex = Math.round(scrollLeft / (cardWidth || 1));
const clampedIndex = Math.max(0, Math.min(wrappers.length - 1, calculatedIndex));
if (clampedIndex !== currentCardIndex) {
currentCardIndex = clampedIndex;
updateDots(clampedIndex);
}
}
isScrollDebouncing = false;
});
isScrollDebouncing = true;
}
}, { passive: true });
dots.forEach((dot, idx) => {
dot.addEventListener('click', () => {
scrollToCard(idx);
});
});
}
const testimonialsContainer = document.querySelector('.credentials-col');
const testimonialDots = document.querySelectorAll('.testimonials-carousel-dots .dot-btn');
if (testimonialsContainer && testimonialDots.length > 0) {
let currentTestimonialIndex = 0;
function updateTestimonialDots(index) {
testimonialDots.forEach((dot, idx) => {
if (idx === index) {
dot.classList.add('active');
} else {
dot.classList.remove('active');
}
});
}
function scrollToTestimonial(index) {
if (window.innerWidth > 991) return;
const tCards = testimonialsContainer.querySelectorAll('.testimonial-card');
if (tCards[index]) {
const targetCard = tCards[index];
const scrollLeftPos = targetCard.offsetLeft - testimonialsContainer.offsetLeft - 20;
testimonialsContainer.scrollTo({
left: scrollLeftPos,
behavior: 'smooth'
});
currentTestimonialIndex = index;
updateTestimonialDots(index);
}
}
let tCardWidth = 0;
function updateTCardWidth() {
const tCards = testimonialsContainer.querySelectorAll('.testimonial-card');
if (tCards.length > 0) {
tCardWidth = tCards[0].offsetWidth + 16;
}
}
updateTCardWidth();
window.addEventListener('resize', updateTCardWidth);
let isTScrollDebouncing = false;
testimonialsContainer.addEventListener('scroll', () => {
if (!isTScrollDebouncing) {
window.requestAnimationFrame(() => {
const tCards = testimonialsContainer.querySelectorAll('.testimonial-card');
if (tCards.length > 0) {
const scrollLeft = testimonialsContainer.scrollLeft;
if (!tCardWidth) updateTCardWidth();
const calculatedIndex = Math.round(scrollLeft / (tCardWidth || 1));
const clampedIndex = Math.max(0, Math.min(tCards.length - 1, calculatedIndex));
if (clampedIndex !== currentTestimonialIndex) {
currentTestimonialIndex = clampedIndex;
updateTestimonialDots(clampedIndex);
}
}
isTScrollDebouncing = false;
});
isTScrollDebouncing = true;
}
}, { passive: true });
testimonialDots.forEach((dot, idx) => {
dot.addEventListener('click', () => {
scrollToTestimonial(idx);
});
});
}
const premiumRevealElements = document.querySelectorAll('.premium-reveal');
const premiumObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
const el = entry.target;
if (entry.isIntersecting) {
if (el.dataset.staggerChildren) {
const children = el.querySelectorAll(el.dataset.staggerChildren);
children.forEach((child, index) => {
child.style.transitionDelay = `${index * 80}ms`;
child.classList.add('revealed');
});
}
el.classList.add('revealed');
} else {
if (el.dataset.staggerChildren) {
const children = el.querySelectorAll(el.dataset.staggerChildren);
children.forEach((child) => {
child.style.transitionDelay = '0ms';
child.classList.remove('revealed');
});
}
el.classList.remove('revealed');
}
});
}, {
root: null,
threshold: 0.08,
rootMargin: '0px 0px -40px 0px'
});
    premiumRevealElements.forEach(el => {
        premiumObserver.observe(el);
    });

    // Editorial & Long-Form Reading Progress Bar
    const hasLongContent = document.querySelector('.blog-article-content, .privacy-body, .prop-container, .editorial-layout, .blog-post-content');
    if (hasLongContent) {
        let track = document.querySelector('.reading-progress-track');
        if (!track) {
            track = document.createElement('div');
            track.className = 'reading-progress-track';
            track.innerHTML = '<div class="reading-progress-fill"></div>';
            document.body.appendChild(track);
        }
        const fill = track.querySelector('.reading-progress-fill');
        window.addEventListener('scroll', function () {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0 && fill) {
                const progress = (window.scrollY / totalHeight) * 100;
                fill.style.width = Math.min(100, Math.max(0, progress)) + '%';
            }
        }, { passive: true });
    }
});



// Fix for background video showing grey screen on tab switch
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(function(video) {
            if (video.paused) {
                video.play().catch(function(e) { console.log('Autoplay prevented:', e); });
            }
        });
    }
});

// Re-verify hash target position once full page (images/fonts) loads
window.addEventListener('load', function () {
    if (window.location.hash && window.location.hash.length > 1) {
        setTimeout(function () { scrollToHashTarget(true); }, 80);
    }
});

// Handle in-page hash changes dynamically
window.addEventListener('hashchange', function () {
    scrollToHashTarget(true);
});



// Floating Advisor Concierge Unit Auto-mount for All Pages
(function() {
    var sharedAudioCtx = null;
    var chimePlayed = false;
    var chimePending = false;

    function getAudioContext() {
        if (!sharedAudioCtx) {
            var AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                try { sharedAudioCtx = new AudioCtx(); } catch(e) {}
            }
        }
        return sharedAudioCtx;
    }

    function triggerChime(ctx) {
        try {
            var t = ctx.currentTime;
            // Note 1: Soft warm bloop (D5 -> A5)
            var osc1 = ctx.createOscillator();
            var gain1 = ctx.createGain();
            osc1.type = "sine";
            osc1.frequency.setValueAtTime(587.33, t);
            osc1.frequency.exponentialRampToValueAtTime(880, t + 0.07);
            gain1.gain.setValueAtTime(0.001, t);
            gain1.gain.linearRampToValueAtTime(0.24, t + 0.015);
            gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(t);
            osc1.stop(t + 0.15);
            
            // Note 2: Bright crystalline glass chime (D6)
            var osc2 = ctx.createOscillator();
            var gain2 = ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(1174.66, t + 0.08);
            gain2.gain.setValueAtTime(0.001, t + 0.08);
            gain2.gain.linearRampToValueAtTime(0.28, t + 0.095);
            gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(t + 0.08);
            osc2.stop(t + 0.48);
            chimePlayed = true;
            chimePending = false;
            return true;
        } catch(e) {
            return false;
        }
    }

    function playChatSound(force) {
        if (chimePlayed && !force) return;
        var ctx = getAudioContext();
        if (ctx) {
            if (ctx.state === "running") {
                triggerChime(ctx);
                return;
            } else if (ctx.state === "suspended") {
                ctx.resume().then(function() {
                    if (ctx.state === "running") {
                        triggerChime(ctx);
                    } else {
                        chimePending = true;
                    }
                }).catch(function() {
                    chimePending = true;
                });
            }
        }
        
        // HTML5 Audio fallback
        try {
            var chimeUrl = (window.location.origin && window.location.origin.indexOf("http") === 0 ? "/style-guide/assets/advisor-chime.wav" : "https://acrenkey.com/style-guide/assets/advisor-chime.wav");
            var audio = new Audio(chimeUrl);
            audio.volume = 0.6;
            var p = audio.play();
            if (p && p.then) {
                p.then(function() {
                    chimePlayed = true;
                    chimePending = false;
                }).catch(function() {
                    chimePending = true;
                });
            }
        } catch(e) {
            chimePending = true;
        }
    }

    // Expose globally for direct validation
    window.playAdvisorChime = function() {
        playChatSound(true);
    };

    // Eagerly unlock audio & flush pending chime on first user gesture anywhere on the page
    function unlockOnGesture() {
        var ctx = getAudioContext();
        if (ctx && ctx.state === "suspended") {
            ctx.resume().then(function() {
                if (chimePending) {
                    triggerChime(ctx);
                }
            }).catch(function() {});
        } else if (chimePending && ctx && ctx.state === "running") {
            triggerChime(ctx);
        } else if (chimePending) {
            playChatSound(true);
        }
    }

    // Attach to all user interaction events
    ["pointerdown", "touchstart", "click", "keydown", "scroll"].forEach(function(evt) {
        window.addEventListener(evt, unlockOnGesture, { passive: true });
    });

    window.triggerAbhaChat = function() {
        if (window.playAdvisorChime) {
            window.playAdvisorChime();
        }
        if (typeof window.openAbhaModal === "function") {
            window.openAbhaModal();
            return;
        }
        var script = document.getElementById("abhaFormScript") || document.querySelector('script[src*="abha-form"]');
        if (!script) {
            var basePath = "/";
            var webScript = document.querySelector('script[src*="website"]');
            if (webScript && webScript.getAttribute("src")) {
                var src = webScript.getAttribute("src");
                var idx = src.lastIndexOf("website");
                if (idx !== -1) basePath = src.substring(0, idx);
            }
            if (!document.getElementById("abhaFormStyles") && !document.querySelector('link[href*="abha-form"]')) {
                var link = document.createElement("link");
                link.id = "abhaFormStyles";
                link.rel = "stylesheet";
                link.href = basePath + "abha-form.min.css?v=20260908_qc_v9";
                document.head.appendChild(link);
            }
            script = document.createElement("script");
            script.id = "abhaFormScript";
            script.src = basePath + "abha-form.min.js?v=20260908_qc_v9";
            script.defer = true;
            script.onload = function() {
                if (typeof window.openAbhaModal === "function") {
                    window.openAbhaModal();
                } else if (typeof window.openModal === "function") {
                    window.openModal();
                }
            };
            document.body.appendChild(script);
        } else {
            var pollCount = 0;
            var pollTimer = setInterval(function() {
                pollCount++;
                if (typeof window.openAbhaModal === "function") {
                    clearInterval(pollTimer);
                    window.openAbhaModal();
                } else if (pollCount > 15) {
                    clearInterval(pollTimer);
                    if (typeof window.openModal === "function") window.openModal();
                }
            }, 50);
        }
    };

    function mountAdvisorUnit() {
        try {
            sessionStorage.removeItem("advisor_dismissed");
            localStorage.removeItem("advisor_dismissed");
        } catch (e) {}

        if (window.location.pathname.indexOf("thankyou") !== -1 || document.querySelector(".thankyou-viewport") || (document.body && document.body.classList.contains("page-thankyou"))) {
            return;
        }
        var aside = document.getElementById("advisorFloatingUnit");
        if (!aside) {
            aside = document.createElement("aside");
            aside.className = "advisor-floating-unit is-minimized";
            aside.id = "advisorFloatingUnit";
            aside.setAttribute("aria-label", "Home Buying Advisor Assistance");
            aside.setAttribute("title", "");
            var modal = document.getElementById("lfModalOverlay");
            if (modal && modal.parentNode) {
                modal.parentNode.insertBefore(aside, modal);
            } else {
                document.body.appendChild(aside);
            }
        } else {
            aside.style.display = "";
            aside.classList.remove("is-hidden");
        }
        
        aside.innerHTML = 
          "<div class=\"advisor-speech-bubble\" id=\"advisorSpeechBubble\" role=\"status\" aria-live=\"polite\" onclick=\"if(window.triggerAbhaChat){window.triggerAbhaChat();}else{if(window.playAdvisorChime)window.playAdvisorChime();if(window.openAbhaModal){window.openAbhaModal();}else if(window.openModal){window.openModal();}} return false;\" title=\"\">" +
            "<div class=\"advisor-speech-title\">Hi! I'm Abha</div>" +
            "<div class=\"advisor-speech-desc\">How can I help you today?</div>" +
            "<div class=\"advisor-bubble-tail\" aria-hidden=\"true\">" +
              "<svg width=\"16\" height=\"9\" viewBox=\"0 0 16 9\" fill=\"none\">" +
                "<path d=\"M0 0H16L8.8 7.6C8.4 8 7.6 8 7.2 7.6L0 0Z\" fill=\"#FAFAFA\"/>" +
                "<path d=\"M0 0L7.2 7.6C7.6 8 8.4 8 8.8 7.6L16 0\" stroke=\"rgba(229, 184, 153, 0.5)\" stroke-width=\"1\" fill=\"none\"/>" +
              "</svg>" +
            "</div>" +
          "</div>" +
          "<div class=\"advisor-main-card\">" +
            "<div class=\"advisor-avatar-wrap\">" +
              "<img src=\"" + akGetBasePath() + "style-guide/assets/advisor-abha.webp" + "\" alt=\"Abha - Home Buying Advisor\" class=\"advisor-avatar-img\" width=\"76\" height=\"76\" loading=\"lazy\">" +
              "<span class=\"advisor-status-dot\" aria-label=\"Abha is online\"></span>" +
            "</div>" +
            "<div class=\"advisor-card-content\">" +
              "<div class=\"advisor-card-heading\">" +
                "<span>Ask Abha</span>" +
                "<button class=\"advisor-close-btn\" id=\"advisorCloseBtn\" aria-label=\"Dismiss advisor widget\" type=\"button\" title=\"Close\">" +
                  "<svg width=\"9\" height=\"9\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">" +
                    "<line x1=\"2\" y1=\"2\" x2=\"10\" y2=\"10\"></line>" +
                    "<line x1=\"10\" y1=\"2\" x2=\"2\" y2=\"10\"></line>" +
                  "</svg>" +
                "</button>" +
              "</div>" +
              "<div class=\"advisor-status-row\">" +
                "<span class=\"advisor-status-text\">Property Concierge · Online Now</span>" +
              "</div>" +
              "<a href=\"#\" class=\"advisor-talk-btn\" onclick=\"if(window.triggerAbhaChat){window.triggerAbhaChat();}else{if(window.playAdvisorChime)window.playAdvisorChime();if(window.openAbhaModal){window.openAbhaModal();}else if(window.openModal){window.openModal();}} return false;\" aria-label=\"Start chat with Abha\">" +
                "<span>Start Chat</span>" +
                "<svg class=\"advisor-talk-arrow\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">" +
                  "<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>" +
                  "<polyline points=\"12 5 19 12 12 19\"></polyline>" +
                "</svg>" +
              "</a>" +
            "</div>" +
          "</div>";
        
        function minimizeAdvisor() {
            if (!aside) return;
            aside.classList.add("is-minimized");
            aside.setAttribute("aria-expanded", "false");
            aside.setAttribute("title", "");
            var mainCard = aside.querySelector(".advisor-main-card");
            if (mainCard) {
                mainCard.setAttribute("tabindex", "0");
                mainCard.setAttribute("role", "button");
                mainCard.setAttribute("aria-label", "Open chat with Abha");
            }
        }

        function expandAdvisor() {
            if (!aside) return;
            aside.classList.remove("is-minimized");
            aside.setAttribute("aria-expanded", "true");
            aside.removeAttribute("title");
            var mainCard = aside.querySelector(".advisor-main-card");
            if (mainCard) {
                mainCard.removeAttribute("tabindex");
                mainCard.removeAttribute("role");
                mainCard.removeAttribute("aria-label");
            }
            if (bubblePopped) {
                var bubble = aside.querySelector(".advisor-speech-bubble");
                if (bubble) {
                    bubble.classList.add("is-popped");
                }
            }
        }

        // Attach minimize button handler
        var closeBtn = document.getElementById("advisorCloseBtn") || (aside ? aside.querySelector(".advisor-close-btn") : null);
        if (closeBtn) {
            closeBtn.setAttribute("title", "Minimize");
            closeBtn.setAttribute("aria-label", "Minimize advisor widget");
            closeBtn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                minimizeAdvisor();
            });
        }

        // Open Talk to Abha modal when minimized card/avatar is clicked
        var mainCard = aside.querySelector(".advisor-main-card");
        if (mainCard) {
            mainCard.addEventListener("click", function(e) {
                if (aside.classList.contains("is-minimized")) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.triggerAbhaChat) {
                        window.triggerAbhaChat();
                    } else {
                        if (window.playAdvisorChime) window.playAdvisorChime();
                        if (window.openAbhaModal) window.openAbhaModal();
                        else if (window.openModal) window.openModal();
                    }
                }
            });
            mainCard.addEventListener("keydown", function(e) {
                if (aside.classList.contains("is-minimized") && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.triggerAbhaChat) {
                        window.triggerAbhaChat();
                    } else {
                        if (window.playAdvisorChime) window.playAdvisorChime();
                        if (window.openAbhaModal) window.openAbhaModal();
                        else if (window.openModal) window.openModal();
                    }
                }
            });
        }
        
        // Start minimized as a chat head avatar in the first fold
        minimizeAdvisor();
        
        var bubblePopped = false;
        function triggerBubblePop() {
            if (bubblePopped) return;
            var bubble = document.getElementById("advisorSpeechBubble") || (aside ? aside.querySelector(".advisor-speech-bubble") : null);
            if (bubble) {
                bubblePopped = true;
                bubble.classList.add("is-popped");
                playChatSound();
            }
        }

        function getFoldThreshold() {
            var vh = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || 800;
            return Math.max(Math.min(Math.round(vh * 0.45), 450), 260);
        }

        function onScrollCheckFold() {
            var scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            var isDesktop = window.innerWidth >= 992;
            var threshold = isDesktop ? getFoldThreshold() : 0;
            
            if (scrollY >= threshold || !isDesktop) {
                if (aside && !aside.classList.contains("is-visible")) {
                    aside.classList.add("is-visible");
                    if (!bubblePopped) {
                        setTimeout(triggerBubblePop, 500);
                    }
                }
            }
        }

        window.addEventListener("scroll", onScrollCheckFold, { passive: true });
        setTimeout(onScrollCheckFold, 150);
        window.addEventListener("hashchange", function() {
            setTimeout(onScrollCheckFold, 150);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountAdvisorUnit);
    } else {
        mountAdvisorUnit();
    }
})();
