// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

  // --- Tab Functionality for Profile Page ---

  // Get all the tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  
  // For simplicity in this example, we'll just have one content area.
  // In a real application, you would have separate containers for "Active" and "Sold" items.
  const listingsGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-6');

  // Check if the necessary elements exist on the page
  if (tabButtons.length > 0 && listingsGrid) {
    
    // Add a click event listener to each tab button
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        
        // --- 1. Update Tab Appearance ---
        
        // Remove the 'active' class from all tab buttons first
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.classList.add('text-gray-400'); // Make non-active tabs gray
        });
        
        // Add the 'active' class to the button that was just clicked
        button.classList.add('active');
        button.classList.remove('text-gray-400');

        // --- 2. Update Content (Placeholder Logic) ---
        
        // This is where you would fetch and display the correct items.
        // For this example, we'll just log to the console and clear the grid.
        console.log(`Switched to ${button.textContent} tab.`);
        
        // Clear the current listings to simulate loading new ones
        listingsGrid.innerHTML = '';

        if (button.textContent === 'Active Listings') {
          // In a real app, you would dynamically create and append the active listings here.
          // For now, let's just add a placeholder message.
          listingsGrid.innerHTML = `<p class="text-gray-400 md:col-span-2 text-center">Loading active listings...</p>`;
          // Example: You would call a function like displayActiveListings();
        } else if (button.textContent === 'Sold Items') {
          // In a real app, you would dynamically create and append the sold items here.
          // For now, let's just add a placeholder message.
          listingsGrid.innerHTML = `<p class="text-gray-400 md:col-span-2 text-center">Loading sold items...</p>`;
          // Example: You would call a function like displaySoldItems();
        }
      });
    });
  }
});
