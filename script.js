document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const modal = document.getElementById("productModal");
  const closeModalBtn = document.getElementById("closeModal");

  const modalProductName = document.getElementById("modalProductName");
  const modalProductDescription = document.getElementById("modalProductDescription");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalSellerName = document.getElementById("modalSellerName");
  const modalThumbnails = document.getElementById("modalThumbnails");
  const mainProductImage = document.getElementById("mainProductImage");
  const contactBtn = modal.querySelector(".btn-primary");
  const sellerContactDetails = document.getElementById("sellerContactDetails");

  productCards.forEach((card) => {
    const button = card.querySelector("button");

    button.addEventListener("click", () => {
      const name = card.getAttribute("data-name");
      const price = card.getAttribute("data-price");
      const description = card.getAttribute("data-description");
      const seller = card.getAttribute("data-seller");
      const images = JSON.parse(card.getAttribute("data-images"));

      // Set modal content
      modalProductName.textContent = name;
      modalProductPrice.textContent = price;
      modalProductDescription.textContent = description;
      modalSellerName.textContent = seller;

      // Set main image
      mainProductImage.src = images[0];

      // Clear and rebuild thumbnails
      modalThumbnails.innerHTML = "";
      images.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.className = "modal-thumbnail w-16 h-16 object-cover rounded";
        if (index === 0) thumb.classList.add("active");

        thumb.addEventListener("click", () => {
          mainProductImage.src = img;
          document.querySelectorAll(".modal-thumbnail").forEach(t => t.classList.remove("active"));
          thumb.classList.add("active");
        });

        modalThumbnails.appendChild(thumb);
      });

      // Show modal
      modal.classList.remove("hidden");

      // Reset contact section
      sellerContactDetails.classList.add("hidden");
      sellerContactDetails.textContent = "";
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  contactBtn.addEventListener("click", () => {
    // Simulated contact info
    sellerContactDetails.textContent = "📞 +91 9876543210\n✉️ alex.doe@example.com";
    sellerContactDetails.classList.remove("hidden");
  });
});
