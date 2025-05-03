// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // Add this to prevent background scrolling
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Slider functionality
let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

// Event listeners for slider controls
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active menu item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Image Slider Functionality
const initSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideInterval = 5000;
    let slideTimer;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        sliderDots.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
    });

    const dots = document.querySelectorAll('.dot');

    // Previous and Next buttons
    document.querySelector('.prev')?.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetTimer();
    });

    document.querySelector('.next')?.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetTimer();
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide, slideInterval);
    }

    function autoSlide() {
        goToSlide(currentSlide + 1);
    }

    // Start automatic sliding
    resetTimer();
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const course = document.getElementById('course').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate phone number (basic Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // If validation passes, you can handle form submission here
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }
            });
        });
    }
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}); 