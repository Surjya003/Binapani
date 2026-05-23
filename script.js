/* ========================================
   BINAPANI AUTOMATION — PREMIUM SCRIPTS
   ========================================

   TABLE OF CONTENTS
   -----------------
   1.  Utility Helpers (select, addClass, etc.)
   2.  Initialization (DOMContentLoaded)
   3.  Loading Screen
   4.  Custom Cursor
   5.  Header Scroll Effect
   6.  Mobile Menu Toggle
   7.  Back to Top Button
   8.  Scroll Animations (AOS-like)
   9.  Smooth Scrolling
   10. Parallax Backgrounds
   11. Typed Text Effect
   12. Animated Counters
   13. Particle Canvas
   14. Service Card Tilt
   15. Brand Hover Effect
   16. Active Navigation Highlight
   17. Console Welcome

   ======================================== */


// ========================================
// 1. UTILITY HELPERS
// ========================================

/**
 * Shorthand for querySelector / querySelectorAll.
 * @param {string}  selector - CSS selector string
 * @param {boolean} all      - If true, returns NodeList (querySelectorAll)
 * @returns {Element|NodeList|null}
 */
const select = (selector, all = false) =>
    all ? document.querySelectorAll(selector) : document.querySelector(selector);

/** Safely add a class to an element */
const addClass = (el, cls) => el?.classList.add(cls);

/** Safely remove a class from an element */
const removeClass = (el, cls) => el?.classList.remove(cls);

/** Safely toggle a class on an element */
const toggleClass = (el, cls) => el?.classList.toggle(cls);

/** Check if an element has a class */
const hasClass = (el, cls) => el?.classList.contains(cls);


// ========================================
// 2. INITIALIZATION
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initHeader();
    initMobileMenu();
    initBackToTop();
    initScrollAnimations();
    initSmoothScrolling();
    initParallax();
    initTypedText();
    initCounters();
    initParticles();
    initServiceTilt();
    initBrandHover();
    initProductTilt();
    initHeroToggle();
    initContactForm();
});


// ========================================
// 3. LOADING SCREEN
// ========================================

/**
 * Shows a branded loading screen, then fades it out
 * after the page finishes loading (with a fallback timeout).
 */
function initLoader() {
    const loader = select('#loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => addClass(loader, 'loaded'), 2000);
    });

    // Fallback: force-hide after 3.5s even if load event is slow
    setTimeout(() => addClass(loader, 'loaded'), 3500);
}


// ========================================
// 4. CUSTOM CURSOR
// ========================================

/**
 * Creates a custom dot + ring cursor effect on desktop.
 * Skipped on screens narrower than 768px.
 */
function initCursor() {
    const dot = select('#cursorDot');
    const ring = select('#cursorRing');
    if (!dot || !ring || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 3 + 'px';
        dot.style.top = mouseY - 3 + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX - 16 + 'px';
        ring.style.top = ringY - 16 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Enlarge cursor ring when hovering interactive elements
    const hoverTargets = select('a, button, .service-card, .brand-item, .why-item, .testimonial-card, .product-card, .drive-panel-card, .auto-service-card', true);
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => addClass(ring, 'hover'));
        el.addEventListener('mouseleave', () => removeClass(ring, 'hover'));
    });
}


// ========================================
// 5. HEADER SCROLL EFFECT
// ========================================

/**
 * Adds a `.scrolled` class to the header when the user
 * scrolls past the header height (triggers shadow + bg change).
 */
function initHeader() {
    const header = select('.header');
    const headerHeight = header?.offsetHeight || 0;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            addClass(header, 'scrolled');
        } else {
            removeClass(header, 'scrolled');
        }
    });
}


// ========================================
// 6. MOBILE MENU TOGGLE
// ========================================

/**
 * Handles hamburger menu open/close on mobile.
 * Animates the three-bar icon into an X shape.
 */
function initMobileMenu() {
    const toggle = select('#mobileMenuToggle');
    const nav = select('#nav');
    const navLinks = select('.nav-link', true);

    toggle?.addEventListener('click', () => {
        toggleClass(nav, 'active');
        toggleClass(toggle, 'active');
        const spans = toggle.querySelectorAll('span');
        if (hasClass(toggle, 'active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            removeClass(nav, 'active');
            removeClass(toggle, 'active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}


// ========================================
// 7. BACK TO TOP BUTTON
// ========================================

/**
 * Shows/hides a "back to top" button after scrolling 500px.
 * Clicking it smoothly scrolls to the top.
 */
function initBackToTop() {
    const button = select('#backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            addClass(button, 'visible');
        } else {
            removeClass(button, 'visible');
        }
    });

    button?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ========================================
// 8. SCROLL ANIMATIONS (AOS-like)
// ========================================

/**
 * Triggers CSS animations on elements with [data-aos] attributes
 * when they enter the viewport. Supports optional data-aos-delay.
 */
function initScrollAnimations() {
    const elements = select('[data-aos]', true);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => addClass(entry.target, 'aos-animate'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => {
        // Immediately animate elements already visible on load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const delay = el.getAttribute('data-aos-delay') || 0;
            setTimeout(() => addClass(el, 'aos-animate'), delay);
        } else {
            observer.observe(el);
        }
    });
}


// ========================================
// 9. SMOOTH SCROLLING
// ========================================

/**
 * Enables smooth-scroll behavior for all anchor links
 * that point to an on-page section (href="#...").
 */
function initSmoothScrolling() {
    const links = select('a[href^="#"]', true);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = select(href);
            if (target) {
                e.preventDefault();
                const headerHeight = select('.header')?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ========================================
// 10. PARALLAX BACKGROUNDS
// ========================================

/**
 * Applies a subtle vertical parallax shift to
 * background elements as the user scrolls.
 */
function initParallax() {
    const sections = [
        { element: select('.hero-background'), speed: 0.5 },
        { element: select('.services-background'), speed: 0.3 },
        { element: select('.coverage-background'), speed: 0.4 }
    ];

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            if (!section.element) return;
            const scrolled = window.pageYOffset;
            const sectionTop = section.element.parentElement.offsetTop;
            const distance = scrolled - sectionTop;
            if (distance > -window.innerHeight && distance < section.element.parentElement.offsetHeight) {
                section.element.style.transform = `translateY(${distance * section.speed}px)`;
            }
        });
    });
}


// ========================================
// 11. TYPED TEXT EFFECT
// ========================================

/**
 * Typewriter effect that cycles through industry keywords
 * in the hero section (type → pause → delete → next word).
 */
function initTypedText() {
    const typedEl = select('#typedText');
    if (!typedEl) return;

    const words = ['Steel Plants', 'Power Plants', 'Sponge Iron', 'Heavy Industry', 'Rolling Mills'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}


// ========================================
// 12. ANIMATED COUNTERS
// ========================================

/**
 * Animates numeric counters from 0 to their target value
 * when they scroll into view (eased cubic animation).
 */
function initCounters() {
    const heroCounters = select('.counter', true);
    const trustCounters = select('.trust-stat-number[data-count]', true);
    const allCounters = [...heroCounters, ...trustCounters];
    if (!allCounters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
                    counter.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    allCounters.forEach(counter => observer.observe(counter));
}


// ========================================
// 13. PARTICLE CANVAS
// ========================================

/**
 * Renders floating particles with connecting lines
 * on the hero section's canvas element.
 * Pauses when the hero section leaves the viewport.
 */
function initParticles() {
    const canvas = select('#particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '#2b6cb0' : '#63b3ed';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.001;
            if (this.opacity <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles (scaled to screen width)
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw each particle
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - dist / 120) * 0.15;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        animFrameId = requestAnimationFrame(animate);
    }
    animate();

    // Pause animation when hero section is not visible
    const heroSection = select('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animFrameId) animate();
            } else {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
        });
    });
    if (heroSection) heroObserver.observe(heroSection);
}


// ========================================
// 14. SERVICE CARD TILT
// ========================================

/**
 * Adds a 3D tilt effect to service cards on mouse move.
 * Disabled on mobile (< 768px).
 */
function initServiceTilt() {
    if (window.innerWidth < 768) return;

    const cards = select('.service-card', true);
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}


// ========================================
// 15. BRAND HOVER EFFECT
// ========================================

/**
 * Dims sibling brand items when one is hovered,
 * creating a spotlight / focus effect.
 */
function initBrandHover() {
    const items = select('.brand-item', true);

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            items.forEach(other => {
                if (other !== item) {
                    other.style.transform = 'scale(0.97)';
                    other.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            items.forEach(other => {
                other.style.transform = 'scale(1)';
                other.style.opacity = '1';
            });
        });
    });
}


// ========================================
// 16. ACTIVE NAVIGATION HIGHLIGHT
// ========================================

/**
 * Updates the `.active` class on nav links based on
 * which section is currently in the viewport.
 */
window.addEventListener('scroll', () => {
    const sections = select('section[id]', true);
    const navLinks = select('.nav-link', true);
    let current = '';

    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        removeClass(link, 'active');
        if (link.getAttribute('href') === `#${current}`) {
            addClass(link, 'active');
        }
    });
});


// ========================================
// 17. CONSOLE WELCOME
// ========================================

// ========================================
// 18. PRODUCT CARD TILT
// ========================================

/**
 * Adds a 3D tilt effect to product cards on mouse move.
 * Disabled on mobile (< 768px).
 */
function initProductTilt() {
    if (window.innerWidth < 768) return;

    const cards = select('.product-card, .drive-panel-card, .auto-service-card', true);
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}


// ========================================
// 19. HERO BACKGROUND VIEW TOGGLE
// ========================================

/**
 * Handles toggling the Hero background between the cinematic photo scene
 * and the active animated 3D SVG blast furnace scene.
 */
function initHeroToggle() {
    const toggleBtn = select('#heroViewToggle');
    const hero = select('.hero');
    if (!toggleBtn || !hero) return;

    toggleBtn.addEventListener('click', () => {
        const isActive = toggleClass(hero, 'svg-active');
        const btnText = toggleBtn.querySelector('.btn-text');
        const btnIcon = toggleBtn.querySelector('i');

        if (isActive) {
            if (btnText) btnText.textContent = 'Switch to Photo Scene';
            if (btnIcon) {
                removeClass(btnIcon, 'fa-cubes');
                addClass(btnIcon, 'fa-image');
            }
            showToast('Activated Control Center 3D Vector Scene', 'success');
        } else {
            if (btnText) btnText.textContent = 'Switch to Animated 3D Scene';
            if (btnIcon) {
                removeClass(btnIcon, 'fa-image');
                addClass(btnIcon, 'fa-cubes');
            }
            showToast('Returned to Cinematic Industrial Photo Scene', 'success');
        }
    });
}


// ========================================
// 20. CONTACT FORM HANDLER
// ========================================

/**
 * Catches the contact form submit, runs local validation,
 * displays a button loading spinner, and fires a sleek custom toast notification.
 */
function initContactForm() {
    const form = select('#contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve field values
        const name = select('#formName')?.value.trim();
        const phone = select('#formPhone')?.value.trim();
        const email = select('#formEmail')?.value.trim();
        const requirement = select('#formRequirement')?.value;
        const message = select('#formMessage')?.value.trim();
        const consent = select('#formConsent')?.checked;

        // Custom validation check
        if (!name || !phone || !requirement || !message || !consent) {
            showToast('Please fill in all required fields and accept consent.', 'error');
            return;
        }

        // Phone number validation (must be 10 digits after cleaning formatting)
        const cleanPhone = phone.replace(/[\s-+()]/g, '');
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(cleanPhone)) {
            showToast('Please enter a valid 10-digit phone number.', 'error');
            return;
        }

        // Submit state trigger
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Submitting...';

        // Simulate secure API dispatch (1.5 seconds)
        setTimeout(() => {
            // Reset button and state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Reset all form inputs
            form.reset();

            // Fire premium green custom toast
            showToast('Thank you! Your inquiry has been received. Our team will contact you shortly.', 'success');
        }, 1500);
    });
}


// ========================================
// 21. PREMIUM GLASSMORPHIC TOAST ALERTS
// ========================================

/**
 * Spawns and animations a highly aesthetic custom glassmorphic alert toast.
 * @param {string} message - Content to display
 * @param {'success'|'error'} type - Style modifier
 */
function showToast(message, type = 'success') {
    let container = select('#toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.position = 'fixed';
        container.style.top = '2.5rem';
        container.style.right = '2.5rem';
        container.style.zIndex = '99999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '0.75rem';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.style.background = type === 'success' ? 'rgba(39, 174, 96, 0.95)' : 'rgba(192, 57, 43, 0.95)';
    toast.style.color = '#ffffff';
    toast.style.padding = '1rem 1.75rem';
    toast.style.borderRadius = '8px';
    toast.style.backdropFilter = 'blur(16px)';
    toast.style.webkitBackdropFilter = 'blur(16px)';
    toast.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.25)';
    toast.style.border = '1px solid rgba(255, 255, 255, 0.18)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.875rem';
    toast.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '600';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.9)';
    toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.style.pointerEvents = 'auto';

    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    icon.style.fontSize = '1.25rem';
    icon.style.color = '#ffffff';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    textSpan.style.lineHeight = '1.4';

    toast.appendChild(icon);
    toast.appendChild(textSpan);
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px) scale(0.9)';
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 400);
    }, 4500);
}


console.log('%c⚡ Binapani Automation', 'font-size: 24px; font-weight: bold; color: #1a365d;');
console.log('%cIndustrial Automation & VFD Services | binapaniautomation.com', 'font-size: 12px; color: #78909c;');
