/* ===================================================================
   VAMSHI KASTURI - PORTFOLIO INTERACTION ENGINE (main.js)
   Navigation, Micro-animations, Skills Filter, AJAX Contact & Reveal
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Navigation ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('#header');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // --- 2. Header Scroll Effect & Back-to-Top ---
    const backToTopBtn = document.querySelector('#backToTop');

    const handleScrollEffects = () => {
        const scrollPos = window.scrollY;

        // Header glass blur effect
        if (header) {
            if (scrollPos > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top floating button visibility
        if (backToTopBtn) {
            if (scrollPos > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // --- 3. ScrollSpy Navigation Highlighting ---
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects(); // Initial check

    // Smooth scroll for Back to Top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 4. Typed.js Animated Text Effect ---
    if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: [
                'Full-Stack Developer',
                'MERN Stack Specialist',
                'React.js Developer',
                'Node.js & Express Engineer',
                'UI/UX Enthusiast'
            ],
            typeSpeed: 75,
            backSpeed: 45,
            backDelay: 1600,
            loop: true
        });
    }

    // --- 5. Skill Filtering System ---
    const filterTabs = document.querySelectorAll('.skill-items .items');
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');

    if (filterTabs.length && skillCards.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');

                const filterValue = tab.getAttribute('data-filter');

                skillCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 6. ScrollReveal Animations ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '50px',
            duration: 1200,
            delay: 150,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            reset: false
        });

        sr.reveal('.section-header', { origin: 'top' });
        sr.reveal('.badge-pill, .hero-intro', { origin: 'top', delay: 100 });
        sr.reveal('.hero-title', { origin: 'left', delay: 200 });
        sr.reveal('.hero-subtitle', { origin: 'left', delay: 300 });
        sr.reveal('.hero-description', { origin: 'left', delay: 400 });
        sr.reveal('.home-buttons, .hero-actions', { origin: 'bottom', delay: 500 });
        sr.reveal('.home-img-wrapper', { origin: 'right', delay: 300 });

        sr.reveal('.about-card', { origin: 'left', delay: 200 });
        sr.reveal('.about-content', { origin: 'right', delay: 300 });

        sr.reveal('.skills-filter', { origin: 'top', delay: 150 });
        sr.reveal('.skill-card', { origin: 'bottom', interval: 60 });

        sr.reveal('.timeline-item', { origin: 'bottom', interval: 150 });
        sr.reveal('.projects-card', { origin: 'bottom', interval: 150 });

        sr.reveal('.contact-info-panel', { origin: 'left', delay: 200 });
        sr.reveal('.contact-form-panel', { origin: 'right', delay: 300 });
    }

    // --- 7. AJAX Contact Form Submission (Web3Forms) ---
    const contactForm = document.querySelector('#contact-form');
    const submitBtn = document.querySelector('#submit-btn');
    const formFeedback = document.querySelector('#form-feedback');

    if (contactForm && submitBtn && formFeedback) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');

            // Set loading state
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-flex';
            formFeedback.style.display = 'none';

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (response.status === 200 && result.success) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you soon.';
                    contactForm.reset();
                } else {
                    formFeedback.className = 'form-feedback error';
                    formFeedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${result.message || 'Something went wrong. Please try again or email me directly.'}`;
                }
            } catch (err) {
                console.error('Contact form submission error:', err);
                formFeedback.className = 'form-feedback error';
                formFeedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please email me directly at kasturivamshi884@gmail.com.';
            } finally {
                formFeedback.style.display = 'block';
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoader) btnLoader.style.display = 'none';

                // Auto-hide feedback after 8 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 8000);
            }
        });
    }

    // --- 8. Dynamic Copyright Year ---
    const spanYear = document.querySelector('#span-year');
    if (spanYear) {
        spanYear.textContent = new Date().getFullYear();
    }
});
