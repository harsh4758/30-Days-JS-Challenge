const passWordBox = document.getElementById('password');
const generateButton = document.getElementById('generate-btn');
const copyButton = document.getElementById('copy-btn');
const lengthInput = document.getElementById('length-input');

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/";

function generatePassword() {
    const length = Math.max(4, parseInt(lengthInput.value) || 12);

    const includeUpper = document.getElementById('includeUpper').checked;
    const includeLower = document.getElementById('includeLower').checked;
    const includeNumber = document.getElementById('includeNumber').checked;
    const includeSymbol = document.getElementById('includeSymbol').checked;

    let password = "";
    let allowedChars = "";

    // Add characters based on checked options
    if (includeUpper) {
        allowedChars += upperCase;
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
    }
    if (includeLower) {
        allowedChars += lowerCase;
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    }
    if (includeNumber) {
        allowedChars += numbers;
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (includeSymbol) {
        allowedChars += symbols;
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (allowedChars.length === 0) {
        alert("Please select at least one character type!");
        return "";
    }

    // Fill remaining characters
    for (let i = password.length; i < length; i++) {
        password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }

    // Shuffle the password to randomize guaranteed characters
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

function evaluateStrength(password) {
    const strengthText = document.getElementById('strength');
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        strengthText.textContent = "Strength: Weak";
        strengthText.style.color = "red";
    } else if (strength === 3 || strength === 4) {
        strengthText.textContent = "Strength: Medium";
        strengthText.style.color = "orange";
    } else {
        strengthText.textContent = "Strength: Strong";
        strengthText.style.color = "green";
    }
}

// Generate button click
generateButton.addEventListener('click', () => {
    const newPassword = generatePassword();
    passWordBox.value = newPassword;
    if (newPassword) evaluateStrength(newPassword);
});

// Copy button click
copyButton.addEventListener('click', () => {
    const password = passWordBox.value.trim();
    if (!password) {
        alert('No password to copy!');
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy password.');
    });
});
