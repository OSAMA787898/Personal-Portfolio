// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
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

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Get the submit button elements
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(e.target);
    
    // Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycby1o_PD6Sx7D9hITnATjzWFTifJ8cM1hyY8AcDLx6PceSl7W_nQIzySBI_Px2Oj0-kZ/exec';

    // Send data to Google Sheet
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Show success message
        alert('Thank you! Your message has been sent successfully.');
        
        // Reset form
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Oops! Something went wrong. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        btnText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
    });

    return false;
};

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for animation
document.querySelectorAll('.service-card, .team-member, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll(); 