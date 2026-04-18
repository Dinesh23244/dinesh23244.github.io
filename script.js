document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTopBtn = document.getElementById('back-to-top');
    const yearSpan = document.getElementById('current-year');

    // Header Scroll Effect & Glassmorphism
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-overlay-active'); // For background dimming if we add it
        const icon = mobileToggle.querySelector('i');

        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-overlay-active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-overlay-active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Only prevent default if it's a valid ID on the page
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70; // Adjust according to header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Back To Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Spy (Highlight active nav link)
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Active when section is near top center
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        spyObserver.observe(section);
    });

    // Scroll Reveal Animation
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Add fade-in class to sections for animation
    sections.forEach(section => {
        section.classList.add('hidden');
        revealObserver.observe(section);
    });

    // Dynamic Copyright Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // Dynamic Publications Fetcher
    const publicationsGrid = document.getElementById('dynamic-publications-grid');
    if (publicationsGrid) {
        fetch('publications.json')
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(data => {
                publicationsGrid.innerHTML = ''; // Clear loading text
                
                if (data.publications && data.publications.length > 0) {
                    data.publications.forEach((pub, index) => {
                        const article = document.createElement('article');
                        article.className = 'project-card fade-in';
                        
                        let formattedAuthors = pub.authors.replace(/Dinesh Palanimuthu/gi, '<strong class="author-highlight">Dinesh Palanimuthu</strong>');
                        
                        article.innerHTML = `
                            <div class="project-info">
                                <div class="paper-id">Paper ${String(index + 1).padStart(2, '0')}</div>
                                <h3>${pub.title}</h3>
                                <p>${pub.journal}</p>
                                <div class="tech-stack">
                                    <span>${pub.year}</span>
                                </div>
                                <div class="project-links">
                                    <a href="${pub.url}" target="_blank"><i class="fas fa-external-link-alt"></i> Read Publication</a>
                                </div>
                                <p class="paper-authors">
                                    <i class="fas fa-users"></i> Authors: ${formattedAuthors}
                                </p>
                            </div>
                        `;
                        publicationsGrid.appendChild(article);
                    });
                } else {
                    publicationsGrid.innerHTML = '<p>No publications found.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading publications:', error);
                publicationsGrid.innerHTML = '<p>Error loading publications from database.</p>';
            });
    }
});
