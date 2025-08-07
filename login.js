// Wait until the page is fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Logic ---
  const mobileMenuBtn = document.querySelector('.md\\:hidden');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // In a full implementation, you would toggle a mobile navigation menu here.
      alert('Mobile menu would open here in a full implementation');
    });
  }

  // --- Show/Hide Password Toggle for Login Page ---
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

  if (togglePassword && password) {
    togglePassword.addEventListener('click', function() {
      // Toggle the type attribute of the password field
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      
      // Toggle the icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }
});
