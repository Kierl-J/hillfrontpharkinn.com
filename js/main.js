/* ========================================
   Hillfront Phark Inn - Luxury JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Preloader
    // ========================================
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2000);
    });

    // Fallback: Hide preloader after 4 seconds max
    setTimeout(function() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 4000);

    // ========================================
    // Custom Cursor
    // ========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .suite-card, .experience-card, .gallery-item');

        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ========================================
    // Smooth Scrolling
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;

            statNumbers.forEach(function(stat) {
                const target = stat.getAttribute('data-count') || stat.textContent;
                const numericPart = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                const hasPlus = target.includes('+');

                let current = 0;
                const duration = 2000;
                const increment = numericPart / (duration / 16);
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = Math.floor(numericPart * easeOutQuart);

                    stat.textContent = current + (hasPlus ? '+' : '') + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = numericPart + (hasPlus ? '+' : '') + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.suite-card, .experience-card, .gallery-item, .testimonial-card, .section-header, .about-content, .contact-content');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }

    // Add reveal animation styles
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .suite-card, .experience-card, .gallery-item, .testimonial-card, .section-header, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .suite-card.revealed, .experience-card.revealed, .gallery-item.revealed, .testimonial-card.revealed, .section-header.revealed, .about-content.revealed, .contact-content.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .suite-card:nth-child(2), .experience-card:nth-child(2), .gallery-item:nth-child(2) { transition-delay: 0.1s; }
        .suite-card:nth-child(3), .experience-card:nth-child(3), .gallery-item:nth-child(3) { transition-delay: 0.2s; }
        .suite-card:nth-child(4), .experience-card:nth-child(4), .gallery-item:nth-child(4) { transition-delay: 0.3s; }
        .gallery-item:nth-child(5) { transition-delay: 0.4s; }
        .gallery-item:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(revealStyle);

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                hero.style.setProperty('--scroll', scrolled * 0.5 + 'px');
            }
        });
    }

    // ========================================
    // Booking Form - Date Validation
    // ========================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        checkinInput.setAttribute('min', todayStr);
        checkoutInput.setAttribute('min', todayStr);

        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);

            if (checkoutInput.value && checkoutInput.value < minCheckout) {
                checkoutInput.value = '';
            }
        });
    }

    // ========================================
    // Reservation Form Submission
    // ========================================
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Validate dates
            if (new Date(data.checkout) <= new Date(data.checkin)) {
                showNotification('Check-out date must be after check-in date.', 'error');
                return;
            }

            // Get room type text
            const suiteSelect = document.getElementById('suite');
            const selectedSuite = suiteSelect.options[suiteSelect.selectedIndex].text;

            // Calculate nights
            const checkin = new Date(data.checkin);
            const checkout = new Date(data.checkout);
            const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

            // Show success notification
            showNotification(
                'Thank you, ' + data.name + '! Your reservation request for ' + selectedSuite +
                ' (' + nights + ' night' + (nights > 1 ? 's' : '') + ') has been received. ' +
                'We will contact you at ' + data.email + ' to confirm your booking.',
                'success'
            );

            this.reset();
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                showNotification('Thank you for subscribing! Exclusive offers will be sent to ' + email, 'success');
                emailInput.value = '';
            }
        });
    }

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
                <p class="notification-message">${message}</p>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        const notificationStyle = document.createElement('style');
        notificationStyle.id = 'notification-style';
        if (!document.getElementById('notification-style')) {
            notificationStyle.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    max-width: 400px;
                    padding: 20px 25px;
                    background: #0a0a0a;
                    border: 1px solid #c9a962;
                    border-radius: 0;
                    z-index: 10000;
                    animation: slideIn 0.5s ease;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }
                .notification-success { border-left: 4px solid #c9a962; }
                .notification-error { border-left: 4px solid #dc3545; }
                .notification-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }
                .notification-icon {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #c9a962;
                    color: #0a0a0a;
                    border-radius: 50%;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                .notification-error .notification-icon { background: #dc3545; color: white; }
                .notification-message {
                    color: #f5f0e8;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin: 0;
                    flex: 1;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    transition: color 0.3s ease;
                }
                .notification-close:hover { color: #c9a962; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                @media (max-width: 480px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(notificationStyle);
        }

        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            closeNotification(notification);
        });

        // Auto close after 6 seconds
        setTimeout(function() {
            closeNotification(notification);
        }, 6000);
    }

    function closeNotification(notification) {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // Gallery Lightbox
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${src}" alt="${alt}">
                <p class="lightbox-caption">${alt}</p>
            </div>
        `;

        // Add lightbox styles
        const lightboxStyle = document.createElement('style');
        lightboxStyle.id = 'lightbox-style';
        if (!document.getElementById('lightbox-style')) {
            lightboxStyle.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100000;
                    animation: fadeIn 0.3s ease;
                    padding: 20px;
                    box-sizing: border-box;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border: 2px solid #c9a962;
                }
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: #c9a962;
                    font-size: 2.5rem;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .lightbox-close:hover { transform: rotate(90deg); }
                .lightbox-caption {
                    text-align: center;
                    color: #f5f0e8;
                    margin-top: 15px;
                    font-style: italic;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(lightboxStyle);
        }

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                closeLightbox(lightbox);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    function closeLightbox(lightbox) {
        lightbox.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(function() {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // ========================================
    // Testimonial Slider (if multiple)
    // ========================================
    const testimonialGrid = document.querySelector('.testimonials-grid');

    if (testimonialGrid) {
        const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');

        if (testimonials.length > 3) {
            let currentIndex = 0;

            // Auto-rotate testimonials on mobile
            if (window.innerWidth <= 768) {
                setInterval(function() {
                    testimonials[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    testimonials[currentIndex].classList.add('active');
                }, 5000);
            }
        }
    }

    // ========================================
    // Form Input Animation
    // ========================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formInputs.forEach(function(input) {
        // Check if input has value on load
        if (input.value) {
            input.classList.add('has-value');
        }

        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
        });
    }

    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const scrollLine = document.querySelector('.scroll-line');

    if (scrollLine) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollLine.style.transform = 'scaleX(' + (scrolled / 100) + ')';
        });
    }

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // ========================================
    // Print Styles Handler
    // ========================================
    window.addEventListener('beforeprint', function() {
        // Hide non-essential elements for printing
        document.querySelectorAll('.preloader, .cursor, .cursor-follower, .back-to-top').forEach(function(el) {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore elements after printing
        document.querySelectorAll('.preloader, .cursor, .cursor-follower, .back-to-top').forEach(function(el) {
            el.style.display = '';
        });
    });

});
