// ========================================
// BINAPANI AUTOMATION - INTERACTIVE SCRIPTS
// ========================================

// === Utility Functions ===
const select = (selector, all = false) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
};

const addClass = (element, className) => element?.classList.add(className);
const removeClass = (element, className) => element?.classList.remove(className);
const toggleClass = (element, className) => element?.classList.toggle(className);
const hasClass = (element, className) => element?.classList.contains(className);

// === Page Load ===
window.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initBackToTop();
    initScrollAnimations();
    initSmoothScrolling();
    initFormValidation();
    initParallax();
});

// === Header Scroll Effect ===
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

// === Mobile Menu Toggle ===
function initMobileMenu() {
    const toggle = select('#mobileMenuToggle');
    const nav = select('#nav');
    const navLinks = select('.nav-link', true);

    toggle?.addEventListener('click', () => {
        toggleClass(nav, 'active');
        toggleClass(toggle, 'active');

        // Animate hamburger icon
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

    // Close menu when clicking on nav links
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

// === Back to Top Button ===
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === Scroll Animations (AOS Alternative) ===
function initScrollAnimations() {
    const animatedElements = select('[data-aos]', true);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    addClass(entry.target, 'aos-animate');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// === Smooth Scrolling for Anchor Links ===
function initSmoothScrolling() {
    const links = select('a[href^="#"]', true);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = select(href);

            if (target) {
                e.preventDefault();

                const headerHeight = select('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === Form Validation & Enhancement ===
function initFormValidation() {
    const form = select('.contact-form');

    if (!form) return;

    // Add focus effects
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            const parent = input.closest('.form-group');
            addClass(parent, 'focused');
        });

        input.addEventListener('blur', () => {
            const parent = input.closest('.form-group');
            removeClass(parent, 'focused');

            // Add "filled" class if input has value
            if (input.value.trim() !== '') {
                addClass(parent, 'filled');
            } else {
                removeClass(parent, 'filled');
            }
        });

        // Check on page load if already filled
        if (input.value.trim() !== '') {
            addClass(input.closest('.form-group'), 'filled');
        }
    });

    // Real-time validation
    const emailInput = select('#email');
    const phoneInput = select('#phone');

    emailInput?.addEventListener('blur', () => {
        validateEmail(emailInput);
    });

    phoneInput?.addEventListener('blur', () => {
        validatePhone(phoneInput);
    });
}

// Email validation
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);

    const parent = input.closest('.form-group');

    if (input.value && !isValid) {
        addClass(parent, 'error');

        // Add error message if doesn't exist
        if (!parent.querySelector('.error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please enter a valid email address';
            errorMsg.style.color = 'var(--color-secondary)';
            errorMsg.style.fontSize = 'var(--font-size-xs)';
            errorMsg.style.marginTop = '0.25rem';
            parent.appendChild(errorMsg);
        }
    } else {
        removeClass(parent, 'error');
        const errorMsg = parent.querySelector('.error-message');
        errorMsg?.remove();
    }
}

// Phone validation
function validatePhone(input) {
    const phoneRegex = /^[0-9]{10}$/;
    const isValid = phoneRegex.test(input.value.replace(/\s/g, ''));

    const parent = input.closest('.form-group');

    if (input.value && !isValid) {
        addClass(parent, 'error');

        if (!parent.querySelector('.error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please enter a valid 10-digit phone number';
            errorMsg.style.color = 'var(--color-secondary)';
            errorMsg.style.fontSize = 'var(--font-size-xs)';
            errorMsg.style.marginTop = '0.25rem';
            parent.appendChild(errorMsg);
        }
    } else {
        removeClass(parent, 'error');
        const errorMsg = parent.querySelector('.error-message');
        errorMsg?.remove();
    }
}

// === Parallax Effect for Backgrounds ===
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

            // Only apply parallax when section is in view
            if (distance > -window.innerHeight && distance < section.element.parentElement.offsetHeight) {
                section.element.style.transform = `translateY(${distance * section.speed}px)`;
            }
        });
    });
}

// === Service Cards Interactive Tilt Effect ===
window.addEventListener('DOMContentLoaded', () => {
    const serviceCards = select('.service-card', true);

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// === Brand Items Hover Effect ===
window.addEventListener('DOMContentLoaded', () => {
    const brandItems = select('.brand-item', true);

    brandItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Scale down other items slightly
            brandItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.transform = 'scale(0.95)';
                    otherItem.style.opacity = '0.6';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            // Reset all items
            brandItems.forEach(otherItem => {
                otherItem.style.transform = 'scale(1)';
                otherItem.style.opacity = '1';
            });
        });
    });
});

// === Phone Click Tracking (Optional Analytics) ===
window.addEventListener('DOMContentLoaded', () => {
    const phoneLinks = select('a[href^="tel:"]', true);

    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone call initiated:', link.getAttribute('href'));
            // You can add analytics tracking here if needed
            // Example: gtag('event', 'phone_call', { phone_number: link.getAttribute('href') });
        });
    });
});

// === Email Click Tracking (Optional Analytics) ===
window.addEventListener('DOMContentLoaded', () => {
    const emailLinks = select('a[href^="mailto:"]', true);

    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email clicked:', link.getAttribute('href'));
            // You can add analytics tracking here if needed
        });
    });
});

// === Active Navigation Highlighting ===
window.addEventListener('scroll', () => {
    const sections = select('section[id]', true);
    const navLinks = select('.nav-link', true);

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
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

// === Performance: Lazy Load Images (if any were added) ===
if ('IntersectionObserver' in window) {
    const lazyImages = select('img[data-src]', true);

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// === Console Welcome Message ===
console.log('%c⚡ Binapani Automation', 'font-size: 24px; font-weight: bold; color: #00d9ff;');
console.log('%cIndustrial Automation & VFD Repair Services', 'font-size: 14px; color: #b4c1d8;');
console.log('%cWebsite developed with premium dark mode design', 'font-size: 12px; color: #7a8ba3;');

// === Emergency Contact Popup (Optional Feature) ===
// Uncomment this if you want a floating emergency contact button
/*
window.addEventListener('DOMContentLoaded', () => {
    const emergencyButton = document.createElement('button');
    emergencyButton.className = 'emergency-floating-button';
    emergencyButton.innerHTML = '🚨 Emergency';
    emergencyButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        background: var(--gradient-secondary);
        color: white;
        border: none;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        font-weight: 700;
        cursor: pointer;
        z-index: 998;
        box-shadow: var(--shadow-glow-secondary);
        animation: pulse-emergency 2s ease-in-out infinite;
    `;
    
    emergencyButton.addEventListener('click', () => {
        window.location.href = 'tel:9641401725';
    });
    
    document.body.appendChild(emergencyButton);
});
*/
