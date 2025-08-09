// In frontend/login.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // 1. Get data from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const API_URL = 'http://localhost:5000/api/users/login';

    try {
      // 2. Send the login data to the backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // 3. SUCCESS: Save the token to the browser's localStorage
        localStorage.setItem('token', result.token);
        
        alert('Login successful! Redirecting to your profile...');
        window.location.href = 'profile.html'; // Redirect to the profile page
      } else {
        // 4. FAIL: Show the error message from the server
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Could not connect to the server.');
    }
  });

  // --- Your existing show/hide password toggle logic ---
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