document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const passwordDisplay = document.getElementById('password-display');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const copyPasswordBtn = document.getElementById('copy-password');
    const lengthInput = document.getElementById('length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const specialCheckbox = document.getElementById('special');
    const messageDiv = document.getElementById('message');

    let currentPassword = '';
    let isPasswordVisible = false;

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSpecial = specialCheckbox.checked;

        if (!useUppercase && !useLowercase && !useNumbers && !useSpecial) {
            showMessage('Пожалуйста, выберите хотя бы один тип символов', 'error');
            return null;
        }

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let allowedChars = '';
        if (useUppercase) allowedChars += uppercaseChars;
        if (useLowercase) allowedChars += lowercaseChars;
        if (useNumbers) allowedChars += numberChars;
        if (useSpecial) allowedChars += specialChars;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars.charAt(randomIndex);
        }

        return password;
    }

    function updatePasswordDisplay() {
        if (isPasswordVisible) {
            passwordDisplay.textContent = currentPassword;
        } else {
            passwordDisplay.textContent = '•'.repeat(currentPassword.length);
        }
    }

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    generateBtn.addEventListener('click', function() {
        const newPassword = generatePassword();
        if (newPassword !== null) {
            currentPassword = newPassword;
            isPasswordVisible = false; 
            updatePasswordDisplay();
            showMessage('Пароль успешно сгенерирован!', 'success');
        }
    });

    togglePasswordBtn.addEventListener('click', function() {
        if (currentPassword === '') {
            showMessage('Сначала сгенерируйте пароль', 'error');
            return;
        }
        isPasswordVisible = !isPasswordVisible;
        updatePasswordDisplay();
        togglePasswordBtn.innerHTML = isPasswordVisible ? '<span class="eye-icon">👁️‍🗨️</span>' : '<span class="eye-icon">👁️</span>';
    });

    copyPasswordBtn.addEventListener('click', function() {
        if (currentPassword === '') {
            showMessage('Нечего копировать - сначала сгенерируйте пароль', 'error');
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(currentPassword).then(
            () => {
                showMessage('Пароль скопирован в буфер обмена!', 'success');
            },
            () => {
                showMessage('Не удалось скопировать пароль', 'error');
            }
        );
    });

    lengthInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    generateBtn.click();
});