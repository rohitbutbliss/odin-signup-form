// Selecting necessary elements from the DOM
const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const inputSections = Array.from(document.querySelectorAll('.input-section'));
const passwordVisibilityToggles = Array.from(document.querySelectorAll('.password-eye'));

// Adding event listener to the submit button
submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Preventing default form submission

    // Checking form validity
    if (form.checkValidity()) {
        submitForm(); // If form is valid, submit it
    } else {
        markErrors(); // If form is invalid, mark the errors
    }
});

// Adding event listener to eye icon in password field
passwordVisibilityToggles.forEach(passwordVisibilityToggle => passwordVisibilityToggle.addEventListener('click', (e) => {
    // If eye icon is eye without cut changing type of password field to text to show password to user else doing vice versa
    if (passwordVisibilityToggle.getAttribute('name') === 'eye-outline') {
        passwordVisibilityToggle.previousElementSibling.setAttribute('type', 'text');
        passwordVisibilityToggle.setAttribute('name', 'eye-off-outline');
    } else {
        passwordVisibilityToggle.previousElementSibling.setAttribute('type', 'password');
        passwordVisibilityToggle.setAttribute('name', 'eye-outline');
    }
}));

// Function to handle form submission
function submitForm() {
    Array.from(inputs).forEach((input, index) => {
        // Removing error class from input section
        inputSections[index].classList.remove('error');

        // Checking if password and confirm password match
        if ((input == passwordInput || input == confirmPasswordInput) && (passwordInput.value != confirmPasswordInput.value)) {
            // Adding error class if passwords don't match
            inputSections[index].classList.add('error');
        } else if (input == confirmPasswordInput) {
            // If passwords match, submit and reset the form
            form.submit();
            form.reset();
        }
    });
}

// Function to mark errors in the form
function markErrors() {
    Array.from(inputs).forEach((input, index) => {
        // If input has validation message, add error class
        if (input.validationMessage.length) {
            inputSections[index].classList.add('error');
        } else {
            // If input is valid, remove error class
            inputSections[index].classList.remove('error');
        }
    });
}