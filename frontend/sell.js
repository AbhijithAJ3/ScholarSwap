// In frontend/sell.js
document.addEventListener('DOMContentLoaded', function () {
  const sellForm = document.getElementById('sellForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModal = document.getElementById('closeModal');

  sellForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to sell an item.');
      window.location.href = 'login.html';
      return;
    }

    // Using FormData is essential for sending files/images
    const formData = new FormData();
    formData.append('productName', document.getElementById('productName').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('contactEmail', document.getElementById('email').value);
    
    // Note: We are not appending images yet. The backend is using a placeholder.
    // Appending actual files would look like this:
    // const imageFiles = document.getElementById('imageUpload').files;
    // for (let i = 0; i < imageFiles.length; i++) {
    //   formData.append('images', imageFiles[i]);
    // }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          // When using FormData, you DON'T set the 'Content-Type'. The browser does it for you.
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        successModal.classList.add('active');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to submit listing:', error);
      alert('There was an error submitting your listing.');
    }
  });

  // Your existing modal and image preview logic can remain here
  closeModalBtn.addEventListener('click', () => successModal.classList.remove('active'));
  closeModal.addEventListener('click', () => successModal.classList.remove('active'));
  // ... and the rest of your image preview code ...
});