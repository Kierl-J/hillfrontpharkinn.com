/* ========================================
   Hill Front Phark Inn - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksAll.forEach(function(link) {
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
    // Booking Form - Date Validation
    // ========================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        checkinInput.setAttribute('min', todayStr);
        checkoutInput.setAttribute('min', todayStr);

        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);

            // Clear checkout if it's before the new min
            if (checkoutInput.value && checkoutInput.value < minCheckout) {
                checkoutInput.value = '';
            }
        });
    }

    // ========================================
    // Booking Form Submission
    // ========================================
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Validate dates
            if (new Date(data.checkout) <= new Date(data.checkin)) {
                alert('Check-out date must be after check-in date.');
                return;
            }

            // Show confirmation (in a real app, this would submit to a server)
            const roomTypeSelect = document.getElementById('room-type');
            const selectedRoom = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;

            const message = 'Thank you, ' + data.name + '!\n\n' +
                'Your booking request has been received:\n' +
                '- Room: ' + selectedRoom + '\n' +
                '- Check-in: ' + data.checkin + '\n' +
                '- Check-out: ' + data.checkout + '\n' +
                '- Guests: ' + data.adults + ' adults, ' + data.children + ' children\n\n' +
                'We will contact you at ' + data.email + ' to confirm your reservation.';

            alert(message);
            this.reset();
        });
    }

    // ========================================
    // Newsletter Form Submission
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                alert('Thank you for subscribing! You\'ll receive our latest offers at ' + email);
                emailInput.value = '';
            }
        });
    }

    // ========================================
    // Animate Elements on Scroll
    // ========================================
    const animateElements = document.querySelectorAll('.room-card, .amenity-card, .testimonial-card, .gallery-item');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        animateElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .room-card, .amenity-card, .testimonial-card, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .room-card.animate-in, .amenity-card.animate-in, .testimonial-card.animate-in, .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check initial state

    // ========================================
    // Counter Animation for Stats
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;

            statNumbers.forEach(function(stat) {
                const target = stat.textContent;
                const numericPart = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');

                let current = 0;
                const increment = numericPart / 50;
                const duration = 50;

                const counter = setInterval(function() {
                    current += increment;
                    if (current >= numericPart) {
                        stat.textContent = numericPart + suffix;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, duration);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check initial state

});
