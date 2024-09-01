document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const loginErrorMessage = document.getElementById('loginErrorMessage');

        // Update patterns for validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^\w@#])(?!.*\s)[A-Za-z\d@#]{8,}$/; // At least 8 characters, letters, numbers, @, # only

        if (!emailPattern.test(loginEmail)) {
            loginErrorMessage.textContent = 'Please enter a valid organization-provided email address.';
            return;
        }

        if (loginPassword !== confirmPassword) {
            loginErrorMessage.textContent = 'Passwords do not match.';
            return;
        }

        if (passwordPattern.test(loginPassword)) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registrationSection').style.display = 'block';
        } else {
            loginErrorMessage.textContent = 'Invalid password. Ensure it meets the required criteria.';
        }
    });

    // Show/Hide Password in Login Form
    document.getElementById('showLoginPassword').addEventListener('change', function() {
        const passwordField = document.getElementById('loginPassword');
        passwordField.type = this.checked ? 'text' : 'password';
    });

    document.getElementById('showConfirmPassword').addEventListener('change', function() {
        const confirmPasswordField = document.getElementById('confirmPassword');
        confirmPasswordField.type = this.checked ? 'text' : 'password';
    });

    // Handle registration form submission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('name').value.trim();
        let gender = document.getElementById('gender').value;
        let rollNumber = document.getElementById('rollNumber').value.trim();
        let dob = document.getElementById('dob').value;
        let email = document.getElementById('email').value.trim();
        let phone = document.getElementById('phone').value.trim();
        let errorMessage = document.getElementById('errorMessage');

        // Get selected roles
        let selectedRoles = Array.from(document.querySelectorAll('input[name="roles"]:checked')).map(cb => cb.value);

        // Regex patterns
        const namePattern = /^[A-Za-z\s]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/;
        const phonePattern = /^[0-9]{10}$/;
        const rollNumberPattern = /^[A-Za-z0-9]{7}$/;

        // Validation
        let isValid = true;

        if (!namePattern.test(name)) {
            errorMessage.textContent = "Please enter a valid name (letters and spaces only).";
            document.getElementById('name').focus();
            isValid = false;
        }

        if (gender === "") {
            errorMessage.textContent = "Please select your gender.";
            document.getElementById('gender').focus();
            isValid = false;
        }

        if (!rollNumberPattern.test(rollNumber)) {
            errorMessage.textContent = "Please enter a valid 7-character roll number (letters and numbers only).";
            document.getElementById('rollNumber').focus();
            isValid = false;
        }

        if (!dob) {
            errorMessage.textContent = "Please enter your date of birth.";
            document.getElementById('dob').focus();
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            errorMessage.textContent = "Please enter a valid KPRIET email (e.g., name@kpriet.ac.in).";
            document.getElementById('email').focus();
            isValid = false;
        }

        if (!phonePattern.test(phone)) {
            errorMessage.textContent = "Please enter a valid 10-digit phone number.";
            document.getElementById('phone').focus();
            isValid = false;
        }

        if (selectedRoles.length === 0 || selectedRoles.length > 2) {
            errorMessage.textContent = "Please select up to 2 roles.";
            isValid = false;
        }

        if (!isValid) {
            return;  // Do not proceed if any validation fails
        }

        // If all validations pass, redirect to the thank you page
        errorMessage.textContent = "";
        alert(`Registration successful for the roles: ${selectedRoles.join(', ')}!`);

        // Redirect to thank you page
        window.location.href = "thankyou.html";
    });

    // Show/Hide Password in Registration Form
    document.getElementById('showRegPassword').addEventListener('change', function() {
        const passwordField = document.getElementById('password');
        passwordField.type = this.checked ? 'text' : 'password';
    });

    document.getElementById('showConfirmRegPassword').addEventListener('change', function() {
        const confirmPasswordField = document.getElementById('confirmPassword');
        confirmPasswordField.type = this.checked ? 'text' : 'password';
    });

    // JavaScript for cursor movement and scroll effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;

        // Adding the cursor animation
        cursor.style.animation = 'cursor-move 0.5s ease-in-out infinite';
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
