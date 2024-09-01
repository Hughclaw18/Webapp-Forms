document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const loginErrorMessage = document.getElementById('loginErrorMessage');

        // Email and password patterns for validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^\w@#])(?!.*\s)[A-Za-z\d@#]{8,}$/; // At least 8 characters, letters, numbers, @, # only

        // Clear any previous error messages
        loginErrorMessage.textContent = '';

        // Email validation
        if (!emailPattern.test(loginEmail)) {
            loginErrorMessage.textContent = 'Please enter a valid organization-provided email address.';
            return;
        }

        // Password match validation
        if (loginPassword !== confirmPassword) {
            loginErrorMessage.textContent = 'Passwords do not match.';
            return;
        }

        // Password format validation
        if (!passwordPattern.test(loginPassword)) {
            loginErrorMessage.textContent = 'Invalid password. Ensure it meets the required criteria.';
            return;
        }

        // If all validations pass, proceed to registration section
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registrationSection').style.display = 'block';
    });

    // Toggle password visibility function
    function togglePasswordVisibility(toggleId, passwordId) {
        document.getElementById(toggleId).addEventListener('click', function() {
            const passwordField = document.getElementById(passwordId);
            passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    togglePasswordVisibility('toggleLoginPassword', 'loginPassword');
    togglePasswordVisibility('toggleConfirmPassword', 'confirmPassword');

    // Handle registration form submission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('name').value.trim();
        let gender = document.getElementById('gender').value;
        let Department = document.getElementById('Department').value;
        let rollNumber = document.getElementById('rollNumber').value.trim();
        let dob = document.getElementById('dob').value;
        let email = document.getElementById('email').value.trim();
        let phone = document.getElementById('phone').value.trim();
        let description = document.getElementById('text-box').value.trim(); // Get the value of the text area
        let errorMessage = document.getElementById('errorMessage');
        let wordCountError = document.getElementById('error-message');

        // Get selected roles
        let selectedRoles = Array.from(document.querySelectorAll('input[name="roles"]:checked')).map(cb => cb.value);
        // Regex patterns
        const namePattern = /^[A-Za-z\s]+$/;
        const regEmailPattern = /^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/; 
        const phonePattern = /^[0-9]{10}$/;
        const rollNumberPattern = /^[A-Za-z0-9]{7}$/;

        // Clear any previous error messages
        errorMessage.textContent = '';
        wordCountError.textContent = '';

        // Validation checks
        let isValid = true;

        if (!namePattern.test(name)) {
            errorMessage.textContent = "Please enter a valid name (letters and spaces only).";
            document.getElementById('name').focus();
            isValid = false;
        } else if (!gender) {
            errorMessage.textContent = "Please select your gender.";
            document.getElementById('gender').focus();
            isValid = false;
        } else if (!rollNumberPattern.test(rollNumber)) {
            errorMessage.textContent = "Please enter a valid 7-character roll number (letters and numbers only).";
            document.getElementById('rollNumber').focus();
            isValid = false;
        } else if (!dob) {
            errorMessage.textContent = "Please enter your date of birth.";
            document.getElementById('dob').focus();
            isValid = false;
        } else if (!regEmailPattern.test(email)) {
            errorMessage.textContent = "Please enter a valid KPRIET email (e.g., name@kpriet.ac.in).";
            document.getElementById('email').focus();
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            errorMessage.textContent = "Please enter a valid 10-digit phone number.";
            document.getElementById('phone').focus();
            isValid = false;
        } else if (selectedRoles.length === 0 || selectedRoles.length > 2) {
            errorMessage.textContent = "Please select up to 2 roles.";
            isValid = false;
        } else if (!Department) {
            errorMessage.textContent = "Please select your department.";
            document.getElementById('Department').focus();
            isValid = false;
        } else {
            // Word count validation for the description text area
            let wordCount = description.split(/\s+/).filter(word => word.length > 0).length;
            if (wordCount < 100) {
                wordCountError.textContent = "Please enter at least 100 words in the description.";
                document.getElementById('text-box').focus();
                isValid = false;
            }
        }

        if (!isValid) {
            return; // Stop if validation fails
        }

        // If all validations pass, redirect to the thank you page
        errorMessage.textContent = "";
        alert(`Registration successful for the roles: ${selectedRoles.join(', ')}!`);

        // Redirect to thank you page
        window.location.href = "thankyou.html";
    });

    // Cursor movement and scroll effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    });

    // Scrolling effect based on cursor movement
    document.addEventListener('mousemove', (event) => {
        const { clientY } = event;
        const windowHeight = window.innerHeight;
        const scrollAmount = 10;

        if (clientY < 80) {
            window.scrollBy(0, -scrollAmount);
        } else if (clientY > windowHeight - 80) {
            window.scrollBy(0, scrollAmount);
        }
    });
});
