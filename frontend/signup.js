// In frontend/signup.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Form Submission Logic ---
  const signupForm = document.querySelector('form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the browser from refreshing the page

    // 1. Get the data from the form inputs
    const name = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // The URL of your backend's signup endpoint
    const API_URL = 'http://localhost:5000/api/users/signup';

    try {
      // 2. Send the data to the backend using fetch
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // 3. Handle success
        alert('Sign up successful! You will now be redirected to the login page.');
        window.location.href = 'login.html'; // Redirect to login
      } else {
        // 4. Handle errors from the server (e.g., "User already exists")
        alert(`Sign up failed: ${result.message}`);
      }
    } catch (error) {
      // 5. Handle network errors (e.g., server is down)
      console.error('An error occurred:', error);
      alert('Could not connect to the server. Please try again later.');
    }
  });

  // --- Your existing Show/Hide Password Toggle Logic ---
  const togglePassword = document.querySelector('#togglePassword');
  const passwordField = document.querySelector('#password');

  if (togglePassword && passwordField) {
    togglePassword.addEventListener('click', function() {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);

      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }
});