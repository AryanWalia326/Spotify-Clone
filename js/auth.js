// Authentication Manager for Spotify Clone
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('spotifyCloneUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('spotifyCloneCurrentUser')) || null;
        this.init();
    }

    init() {
        // Check if user is already logged in when visiting auth pages
        if (this.currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
            window.location.href = 'index.html';
        }
    }

    saveUsers() {
        localStorage.setItem('spotifyCloneUsers', JSON.stringify(this.users));
    }

    saveCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('spotifyCloneCurrentUser', JSON.stringify(user));
    }

    clearCurrentUser() {
        this.currentUser = null;
        localStorage.removeItem('spotifyCloneCurrentUser');
    }

    userExists(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    usernameExists(username) {
        return this.users.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    validateUser(emailOrUsername, password) {
        return this.users.find(user => 
            (user.email.toLowerCase() === emailOrUsername.toLowerCase() || 
             user.username.toLowerCase() === emailOrUsername.toLowerCase()) && 
            user.password === password
        );
    }

    createUser(userData) {
        const newUser = {
            id: Date.now(),
            username: userData.username,
            email: userData.email.toLowerCase(),
            password: userData.password,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    updateLastLogin(user) {
        const userIndex = this.users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            this.users[userIndex].lastLogin = new Date().toISOString();
            this.saveUsers();
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    logout() {
        this.clearCurrentUser();
        window.location.href = 'login.html';
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(password) {
    // At least 8 characters, contains letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideError(inputId) {
    const errorElement = document.getElementById(inputId + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

function showSuccess(message) {
    let successElement = document.querySelector('.success-message');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        const form = document.querySelector('.auth-form');
        form.insertBefore(successElement, form.firstChild);
    }
    successElement.textContent = message;
    successElement.classList.add('show');
}

function setLoading(isLoading) {
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.querySelector('.auth-form');
    
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        form.classList.add('loading');
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.classList.remove('loading');
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });

        // Real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        emailInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('email', 'Email or username is required');
            } else {
                hideError('email');
            }
        });

        passwordInput.addEventListener('blur', function() {
            if (this.value === '') {
                showError('password', 'Password is required');
            } else {
                hideError('password');
            }
        });
    }

    // Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });

        // Real-time validation
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        usernameInput.addEventListener('blur', function() {
            const username = this.value.trim();
            if (username === '') {
                showError('username', 'Username is required');
            } else if (username.length < 3) {
                showError('username', 'Username must be at least 3 characters');
            } else if (authManager.usernameExists(username)) {
                showError('username', 'Username already exists');
            } else {
                hideError('username');
            }
        });

        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email === '') {
                showError('email', 'Email is required');
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
            } else if (authManager.userExists(email)) {
                showError('email', 'An account with this email already exists');
            } else {
                hideError('email');
            }
        });

        passwordInput.addEventListener('blur', function() {
            const password = this.value;
            if (password === '') {
                showError('password', 'Password is required');
            } else if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters');
            } else if (!isStrongPassword(password)) {
                showError('password', 'Password must contain letters and numbers');
            } else {
                hideError('password');
            }
        });

        confirmPasswordInput.addEventListener('blur', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;
            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
            } else if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
            } else {
                hideError('confirmPassword');
            }
        });
    }

    // Forgot Password Handler
    const forgotPasswordLink = document.getElementById('forgotPassword');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset functionality would be implemented here. For demo purposes, please create a new account.');
        });
    }
});

// Login Handler
function handleLogin() {
    clearAllErrors();
    setLoading(true);

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validation
    let hasErrors = false;

    if (!email) {
        showError('email', 'Email or username is required');
        hasErrors = true;
    }

    if (!password) {
        showError('password', 'Password is required');
        hasErrors = true;
    }

    if (hasErrors) {
        setLoading(false);
        return;
    }

    // Simulate API call delay
    setTimeout(() => {
        const user = authManager.validateUser(email, password);
        
        if (user) {
            authManager.updateLastLogin(user);
            authManager.saveCurrentUser(user);
            
            showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError('password', 'Incorrect email/username or password');
            setLoading(false);
        }
    }, 1000);
}

// Signup Handler
function handleSignup() {
    clearAllErrors();
    setLoading(true);

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;
    const privacyAccepted = document.getElementById('privacy').checked;

    // Validation
    let hasErrors = false;

    if (!username) {
        showError('username', 'Username is required');
        hasErrors = true;
    } else if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters');
        hasErrors = true;
    } else if (authManager.usernameExists(username)) {
        showError('username', 'Username already exists');
        hasErrors = true;
    }

    if (!email) {
        showError('email', 'Email is required');
        hasErrors = true;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    } else if (authManager.userExists(email)) {
        showError('email', 'An account with this email already exists');
        hasErrors = true;
    }

    if (!password) {
        showError('password', 'Password is required');
        hasErrors = true;
    } else if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        hasErrors = true;
    } else if (!isStrongPassword(password)) {
        showError('password', 'Password must contain letters and numbers');
        hasErrors = true;
    }

    if (!confirmPassword) {
        showError('confirmPassword', 'Please confirm your password');
        hasErrors = true;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        hasErrors = true;
    }

    if (!termsAccepted) {
        showError('terms', 'You must agree to the Terms and Conditions');
        hasErrors = true;
    }

    if (!privacyAccepted) {
        showError('privacy', 'You must agree to the Privacy Policy');
        hasErrors = true;
    }

    if (hasErrors) {
        setLoading(false);
        return;
    }

    // Simulate API call delay
    setTimeout(() => {
        const newUser = authManager.createUser({
            username,
            email,
            password
        });

        authManager.saveCurrentUser(newUser);
        showSuccess('Account created successfully! Redirecting...');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, authManager };
}