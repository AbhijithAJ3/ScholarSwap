// In frontend/profile.js

document.addEventListener('DOMContentLoaded', () => {
  const listingsGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-6');
  const API_URL = 'http://localhost:5000';
  const token = localStorage.getItem('token');

  // --- Function to fetch the user's own product listings ---
  const fetchMyProducts = async () => {
    if (!listingsGrid) return;
    listingsGrid.innerHTML = `<p class="text-gray-400 md:col-span-2 text-center">Loading your listings...</p>`;

    try {
      const response = await fetch(`${API_URL}/api/products/myproducts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch your products.');
      }

      const products = await response.json();
      listingsGrid.innerHTML = ''; // Clear loading message

      if (products.length === 0) {
        listingsGrid.innerHTML = `<p class="text-gray-400 md:col-span-2 text-center">You have not listed any items yet.</p>`;
        return;
      }

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-gray-800 p-4 rounded-xl flex flex-col';
        productCard.innerHTML = `
          <img src="https://placehold.co/600x400/1a1a2e/ffffff?text=Product" class="rounded h-40 w-full object-cover mb-3" alt="${product.name}">
          <h3 class="text-lg font-semibold mb-1">${product.name}</h3>
          <p class="text-purple-300 mb-3">₹${product.price}</p>
          <div class="mt-auto flex space-x-2">
            <button class="btn-secondary flex-1 py-1 rounded-md text-sm">Edit</button>
            <button class="bg-red-500 hover:bg-red-600 text-white flex-1 py-1 rounded-md text-sm transition-colors">Delete</button>
          </div>
        `;
        listingsGrid.appendChild(productCard);
      });

    } catch (error) {
      console.error(error);
      listingsGrid.innerHTML = `<p class="text-red-400 md:col-span-2 text-center">Could not load your listings.</p>`;
    }
  };

  // --- Function to fetch main profile info ---
  const fetchProfileInfo = async () => {
    // This is the same function from the previous step to get user details.
    // We'll keep it simple for now, but you would fetch name, bio, etc. here.
    console.log("Fetching main profile info...");
  };

  // --- Initial Page Load ---
  if (!token) {
    alert('You must be logged in to view this page.');
    window.location.href = 'login.html';
  } else {
    fetchProfileInfo();
    fetchMyProducts(); // Fetch user's products by default
  }

  // --- Tab Functionality ---
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (button.textContent.includes('Active Listings')) {
        fetchMyProducts();
      } else if (button.textContent.includes('Sold Items')) {
        listingsGrid.innerHTML = `<p class="text-gray-400 md:col-span-2 text-center">Sold items functionality is not yet implemented.</p>`;
      }
    });
  });
});
