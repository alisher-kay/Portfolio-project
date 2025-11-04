// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
});

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.portfolio-item, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;

    // Validate name
    if (name.value.trim() === '') {
        showFieldError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject.value.trim() === '') {
        showFieldError(subject, 'Subject is required');
        isValid = false;
    } else if (subject.value.trim().length < 3) {
        showFieldError(subject, 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        showFieldError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (value === '') {
                showFieldError(field, 'Name is required');
            } else if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showFieldError(field, 'Email is required');
            } else if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'subject':
            if (value === '') {
                showFieldError(field, 'Subject is required');
            } else if (value.length < 3) {
                showFieldError(field, 'Subject must be at least 3 characters');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'message':
            if (value === '') {
                showFieldError(field, 'Message is required');
            } else if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
            } else {
                clearFieldError(field);
            }
            break;
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#e5e7eb';
    field.style.backgroundColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function submitForm() {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showSuccessMessage();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 2000);
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Scroll to Top Function
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced scroll listener for performance
window.addEventListener('scroll', debounce(function() {
    updateActiveNavLink();
}, 10));

// Typing animation for hero section (optional enhancement)
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    const texts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Uncomment the line below to enable typing animation
    // typeText();
}

// Initialize typing animation (commented out by default)
// document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}