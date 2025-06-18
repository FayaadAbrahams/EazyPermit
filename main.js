// main.js - EazyPermit Application Entry Point

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('EazyPermit application loaded');

    // Initialize the application
    initializeApp();
});

// Main application initialization
function initializeApp() {
    // Check which page we're on and initialize accordingly
    const currentPage = getCurrentPage();

    switch (currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'login':
            initializeLoginPage();
            break;
        case 'dashboard':
            initializeDashboard();
            break;
        case 'register':
            initializeRegisterPage();
            break;
        default:
            console.log('Unknown page, using default initialization');
    }

    // Initialize common components
    initializeNavigation();
    initializeFormValidation();
}

// Detect current page based on URL or body class
function getCurrentPage() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop().split('.')[0];

    if (fileName === '' || fileName === 'index') return 'index';
    return fileName;
}

// Home page initialization
function initializeHomePage() {
    console.log('Initializing home page');

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize any home page specific features
    initializeCallToActionButtons();
}

// Login page initialization
function initializeLoginPage() {
    console.log('Initializing login page');

    const loginForm = document.getElementById('loginForm') || document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Add password visibility toggle
    addPasswordToggle();
}

// Register page initialization
function initializeRegisterPage() {
    console.log('Initializing register page');

    const registerForm = document.getElementById('registerForm') || document.querySelector('form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    // Add password strength indicator
    addPasswordStrengthIndicator();
}

// Dashboard initialization
function initializeDashboard() {
    console.log('Initializing dashboard');

    // Load user data
    loadUserDashboard();

    // Initialize dashboard widgets
    initializeDashboardWidgets();
}

// Navigation initialization
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Highlight current page in navigation
    highlightCurrentNavItem();
}

// Form validation initialization
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

// Login handler
function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Show loading state
    showLoading('Logging in...');

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        hideLoading();

        // Mock successful login - replace with actual authentication
        if (email && password) {
            localStorage.setItem('user', JSON.stringify({ email: email }));
            showSuccess('Login successful!');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showError('Invalid credentials');
        }
    }, 1500);
}

// Registration handler
function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };

    // Validation
    if (!validateRegistrationData(userData)) {
        return;
    }

    showLoading('Creating account...');

    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccess('Account created successfully!');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
}

// Validation functions
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();

    clearFieldError(event);

    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'password':
            if (value && value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            }
            break;
    }
}

function validateRegistrationData(data) {
    if (!data.name || !data.email || !data.password) {
        showError('Please fill in all required fields');
        return false;
    }

    if (!isValidEmail(data.email)) {
        showError('Please enter a valid email address');
        return false;
    }

    if (data.password.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }

    if (data.password !== data.confirmPassword) {
        showError('Passwords do not match');
        return false;
    }

    return true;
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// UI Helper functions
function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
}

function showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-overlay">
            <div class="loader-content">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

function showFieldError(field, message) {
    // Remove existing error
    clearFieldError({ target: field });

    // Add error class
    field.classList.add('error');

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;

    // Insert after field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');

    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Dashboard specific functions
function loadUserDashboard() {
    // Load user data from localStorage or API
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Update UI with user data
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement && user.name) {
        userNameElement.textContent = user.name;
    }
}

function initializeDashboardWidgets() {
    // Initialize any dashboard widgets like charts, stats, etc.
    console.log('Dashboard widgets initialized');
}

function initializeCallToActionButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function addPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const container = field.parentNode;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            border: none;
            background: none;
            cursor: pointer;
        `;

        // Make container relative if not already
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        container.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function () {
            const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
            field.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '👁️' : '🙈';
        });
    });
}

function addPasswordStrengthIndicator() {
    const passwordField = document.querySelector('input[type="password"]');
    if (!passwordField) return;

    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'password-strength';
    strengthDiv.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Password strength: <span>Weak</span></div>
    `;

    passwordField.parentNode.insertBefore(strengthDiv, passwordField.nextSibling);

    passwordField.addEventListener('input', function () {
        const strength = calculatePasswordStrength(this.value);
        updatePasswordStrengthIndicator(strengthDiv, strength);
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;

    return score;
}

function updatePasswordStrengthIndicator(container, strength) {
    const fill = container.querySelector('.strength-fill');
    const text = container.querySelector('.strength-text span');

    const colors = ['#ff4444', '#ff8800', '#ffaa00', '#88cc00', '#00cc44'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    fill.style.width = `${(strength / 5) * 100}%`;
    fill.style.backgroundColor = colors[strength - 1] || colors[0];
    text.textContent = labels[strength - 1] || labels[0];
}

function highlightCurrentNavItem() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Export functions for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        validateField,
        isValidEmail,
        isValidPhone
    };
}