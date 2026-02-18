// ═══════════════════════════════════════════════════════════════
// Casa Real Bordados — Interactive Features
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

    // ─── Header scroll effect ───
    const header = document.querySelector('body > header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const scrollY = window.pageYOffset;
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check

    // ─── Hamburger Menu ───
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');

    function toggleMenu() {
        const isOpen = nav.classList.contains('open');
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');

        if (isOpen) {
            navOverlay.classList.remove('active');
            setTimeout(() => { navOverlay.style.display = 'none'; }, 300);
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            navOverlay.style.display = 'block';
            // Trigger reflow
            navOverlay.offsetHeight;
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        navOverlay.classList.remove('active');
        setTimeout(() => { navOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu on nav link click
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                closeMenu();
            }
        });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            closeMenu();
        }
    });

    // ─── Active page highlighting ───
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });

    // ─── Scroll Reveal ───
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once revealed, stop observing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Scroll to top button ───
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    }, { passive: true });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Product Tabs ───
    function initProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        function showTab(tabId) {
            tabContents.forEach(c => c.classList.remove('active'));
            tabButtons.forEach(b => b.classList.remove('active'));

            const content = document.getElementById(tabId);
            if (content) content.classList.add('active');

            const btn = document.querySelector(`[data-tab="${tabId}"]`);
            if (btn) btn.classList.add('active');

            // Re-trigger reveal for stagger children in the new tab
            const staggerEls = content ? content.querySelectorAll('.reveal-stagger') : [];
            staggerEls.forEach(el => {
                el.classList.remove('visible');
                void el.offsetHeight; // reflow
                el.classList.add('visible');
            });
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                showTab(this.getAttribute('data-tab'));
            });
        });

        if (tabButtons.length > 0) {
            showTab(tabButtons[0].getAttribute('data-tab'));
        }
    }

    if (document.querySelector('.product-tabs')) {
        initProductTabs();
    }

    // ─── Link click micro-animations ───
    const interactiveLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    interactiveLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 200);
        });
    });

    console.log('🧵 Casa Real Bordados — Site loaded successfully');
});
