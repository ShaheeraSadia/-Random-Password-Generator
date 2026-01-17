// Get DOM elements
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const copyIcon = document.getElementById('copyIcon');
const strengthIndicator = document.getElementById('strengthIndicator');

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Update length value display
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';
    let password = '';

    // Build character set based on selections
    if (uppercaseCheckbox.checked) charset += UPPERCASE;
    if (lowercaseCheckbox.checked) charset += LOWERCASE;
    if (numbersCheckbox.checked) charset += NUMBERS;
    if (symbolsCheckbox.checked) charset += SYMBOLS;

    // Validate selection
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }

    // Generate password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordOutput.value = password;
    copyIcon.textContent = '📋';
    
    // Show strength indicator
    checkPasswordStrength(password);
}

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    strengthIndicator.className = 'strength-indicator';
    
    if (strength <= 2) {
        strengthIndicator.classList.add('weak');
        strengthIndicator.textContent = '⚠️ Weak Password';
    } else if (strength <= 4) {
        strengthIndicator.classList.add('medium');
        strengthIndicator.textContent = '⚡ Medium Strength';
    } else {
        strengthIndicator.classList.add('strong');
        strengthIndicator.textContent = '✅ Strong Password';
    }
}

// Copy to clipboard function
function copyToClipboard() {
    if (passwordOutput.value === '') {
        alert('Generate a password first!');
        return;
    }

    passwordOutput.select();
    document.execCommand('copy');
    
    // Visual feedback
    copyIcon.textContent = '✅';
    setTimeout(() => {
        copyIcon.textContent = '📋';
    }, 2000);
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generate password on page load
window.addEventListener('load', generatePassword);