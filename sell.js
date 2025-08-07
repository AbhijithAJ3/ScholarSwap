// sell.js

document.addEventListener('DOMContentLoaded', function() {
  // Image upload/preview
  const fileUpload = document.getElementById('fileUpload');
  const imageUpload = document.getElementById('imageUpload');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  const maxFiles = 5;

  fileUpload.addEventListener('click', function() {
    imageUpload.click();
  });

  fileUpload.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('border-purple-500', 'bg-purple-900/10');
  });

  fileUpload.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('border-purple-500', 'bg-purple-900/10');
  });

  fileUpload.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('border-purple-500', 'bg-purple-900/10');
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  });

  imageUpload.addEventListener('change', function() {
    if (this.files.length) {
      handleFiles(this.files);
    }
  });

  function handleFiles(files) {
    const currentFileCount = imagePreviewContainer.children.length;
    const remainingSlots = maxFiles - currentFileCount;

    if (remainingSlots <= 0) {
      alert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    filesToUpload.forEach(file => {
      if (!file.type.match('image.*')) {
        return;
      }

      const reader = new FileReader();

      reader.onload = function(e) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'image-preview';

        const img = document.createElement('img');
        img.src = e.target.result;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-image';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', function() {
          previewDiv.remove();
        });

        previewDiv.appendChild(img);
        previewDiv.appendChild(removeBtn);
        imagePreviewContainer.appendChild(previewDiv);
      };

      reader.readAsDataURL(file);
    });
  }

  // Form validation & modal
  const sellForm = document.getElementById('sellForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModal = document.getElementById('closeModal');
  const viewListingBtn = document.getElementById('viewListing');

  sellForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const requiredFields = ['productName', 'description', 'category', 'price', 'email'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        isValid = false;
      } else {
        field.classList.remove('border-red-500');
      }
    });

    // Check if at least one image is uploaded
    if (imagePreviewContainer.children.length === 0) {
      alert('Please upload at least one image of your item.');
      isValid = false;
    }

    if (isValid) {
      // Example of what you'd send to the server later
      console.log('Form submitted:', {
        productName: document.getElementById('productName').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        email: document.getElementById('email').value,
        // Images would be handled via FormData in a real app
      });

      // Show success modal
      successModal.classList.add('active');
    }
  });

  closeModalBtn.addEventListener('click', function() {
    successModal.classList.remove('active');
  });

  closeModal.addEventListener('click', function() {
    successModal.classList.remove('active');
  });

  viewListingBtn.addEventListener('click', function() {
    successModal.classList.remove('active');
    alert('In a real implementation, this would redirect to your new listing page.');
  });

  window.addEventListener('click', function(e) {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });
});
