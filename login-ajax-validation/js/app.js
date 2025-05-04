// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // User data array - load from localStorage or initialize empty
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormSection = document.getElementById('login-form');
    const registerFormSection = document.getElementById('register-form');
    const successMessage = document.getElementById('success-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Initialize form visibility - hide register form by default
    if (registerFormSection) {
        registerFormSection.classList.add('hidden');
    }

    // Set up form toggle functionality
    function setupFormToggles() {
        const toggleLinks = document.querySelectorAll('.form-toggle');
        toggleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                toggleForms();
            });
        });
    }

    // Toggle between login and registration forms
    function toggleForms() {
        if (loginFormSection && registerFormSection) {
            loginFormSection.classList.toggle('hidden');
            registerFormSection.classList.toggle('hidden');
            clearErrors();
            clearForms();
        }
    }

    // Clear all error messages
    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
    }

    // Clear form inputs
    function clearForms() {
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
    }

    // Show success message
    function showSuccess(message) {
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
    }

    // Form Validations
    function validateName(name) {
        if (!name) return 'Name is required';
        if (name.length < 3) return 'Name must be at least 3 characters';
        return '';
    }

    function validateEmail(email) {
        if (!email) return 'Email is required';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) return 'Invalid email format';
        return '';
    }

    function validateUsername(username) {
        if (!username) return 'Username is required';
        if (username.length < 4) return 'Username must be at least 4 characters';
        if (users.some(user => user.username === username)) return 'Username already exists';
        return '';
    }

    function validatePassword(password) {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return '';
    }

    function validateMobile(mobile) {
        if (!mobile) return 'Mobile number is required';
        const re = /^[0-9]{10}$/;
        if (!re.test(mobile)) return 'Invalid mobile number (10 digits required)';
        return '';
    }

    function validateDOB(dob) {
        if (!dob) return 'Date of birth is required';
        const dobDate = new Date(dob);
        const today = new Date();
        if (dobDate >= today) return 'Date of birth must be in the past';
        return '';
    }

    function validateCity(city) {
        if (!city) return 'City is required';
        return '';
    }

    function validateAddress(address) {
        if (!address) return 'Address is required';
        if (address.length < 10) return 'Address must be at least 10 characters';
        return '';
    }

    // Registration Form Handling
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const mobile = document.getElementById('mobile').value.trim();
            const dob = document.getElementById('dob').value;
            const city = document.getElementById('city').value.trim();
            const address = document.getElementById('address').value.trim();

            // Validate inputs
            const errors = {
                name: validateName(name),
                email: validateEmail(email),
                username: validateUsername(username),
                password: validatePassword(password),
                mobile: validateMobile(mobile),
                dob: validateDOB(dob),
                city: validateCity(city),
                address: validateAddress(address)
            };

            // Display errors if any
            let hasErrors = false;
            for (const [field, error] of Object.entries(errors)) {
                const errorElement = document.getElementById(`${field}-error`);
                if (error) {
                    errorElement.textContent = error;
                    hasErrors = true;
                }
            }

            if (hasErrors) return;

            // Create new user object
            const newUser = {
                name,
                email,
                username,
                password, // Note: In a real app, you should hash the password
                mobile,
                dob,
                city,
                address
            };

            // Simulate AJAX POST request
            simulateAjaxPost(newUser)
                .then(() => {
                    // Add to users array
                    users.push(newUser);
                    // Save to localStorage
                    localStorage.setItem('users', JSON.stringify(users));
                    // Show success message
                    showSuccess('Registration successful! Please login.');
                    // Switch to login form
                    toggleForms();
                })
                .catch(error => {
                    console.error('Error:', error);
                    showSuccess('Registration failed. Please try again.');
                });
        });
    }

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;

            // Validate inputs
            let hasErrors = false;
            if (!username) {
                document.getElementById('login-username-error').textContent = 'Username is required';
                hasErrors = true;
            }
            if (!password) {
                document.getElementById('login-password-error').textContent = 'Password is required';
                hasErrors = true;
            }
            if (hasErrors) return;

            // Check user credentials
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Simulate AJAX login
                simulateAjaxLogin(user)
                    .then(() => {
                        // Store current user in session
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        // Redirect to data page
                        window.location.href = 'data.html';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showSuccess('Login failed. Please try again.');
                    });
            } else {
                document.getElementById('login-password-error').textContent = 'Invalid username or password';
            }
        });
    }

    // Logout Handling
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Display User Data on data.html
    if (document.getElementById('user-data')) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }

        const userDataElement = document.getElementById('user-data');
        users.forEach(user => {
            const row = document.createElement('tr');
            if (user.username === currentUser.username) {
                row.classList.add('table-primary');
            }
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.mobile}</td>
                <td>${new Date(user.dob).toLocaleDateString()}</td>
                <td>${user.city}</td>
                <td>${user.address}</td>
            `;
            userDataElement.appendChild(row);
        });
    }

    // Initialize form toggles
    setupFormToggles();
});

// Simulate AJAX POST request
function simulateAjaxPost(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate network delay
            if (Math.random() < 0.9) { // 90% success rate for simulation
                resolve({ status: 200, message: 'Success' });
            } else {
                reject(new Error('Network error'));
            }
        }, 1000);
    });
}

// Simulate AJAX login
function simulateAjaxLogin(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate network delay
            if (Math.random() < 0.9) { // 90% success rate for simulation
                resolve({ status: 200, message: 'Login successful' });
            } else {
                reject(new Error('Network error'));
            }
        }, 1000);
    });
}