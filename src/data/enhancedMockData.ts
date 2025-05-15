
// This file adds additional fields to the existing mock data
// Import it after the main mockData to enhance the data model

import { products } from "./mockData";

// Add product tags related to Indonesian market
export function enhanceProductData() {
  // Loop through all products and enhance them with additional properties
  products.forEach((product) => {
    // Randomly determine if product is local
    product["localProduct"] = Math.random() > 0.7;
    
    // Randomly determine if product is pre-order
    product["preOrder"] = Math.random() > 0.9;
    
    // Define Indonesian tags
    const indonesianTags = [
      "Alami", 
      "Halal", 
      "BPOM", 
      "Vegan", 
      "Cruelty-Free", 
      "Organik",
      "Produk Lokal", 
      "Bebas Paraben", 
      "Bebas Sulfat",
      "Dermawan", 
      "Ramah Lingkungan"
    ];
    
    // Add 1-3 Indonesian tags
    const existingTags = product.tags || [];
    const numTagsToAdd = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numTagsToAdd; i++) {
      const randomTag = indonesianTags[Math.floor(Math.random() * indonesianTags.length)];
      if (!existingTags.includes(randomTag)) {
        existingTags.push(randomTag);
      }
    }
    
    product.tags = existingTags;
  });
  
  return products;
}

// Call the function to enhance the products
enhanceProductData();

// Export enhanced products
export { products };
