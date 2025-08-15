import { faker } from '@faker-js/faker';

// Helper to generate a random product
function createRandomProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: `$${faker.commerce.price(10, 1000, 2)}`,
    rating: Number((Math.random() * 5).toFixed(1)),
    reviews: faker.number.int({ min: 0, max: 5000 }),

    image: faker.image.urlPicsumPhotos(),

    category: faker.helpers.arrayElement([
      "Headphones",
      "Electronics",
      "Clothing",
      "Gadgets",
      "Home and Kitchen",
    ]),
  };
}

// Generate N products
const products = Array.from({ length: 15 }, createRandomProduct);

// Helper to generate a random player
function createRandomPlayer() {
  return {
    title: faker.commerce.productName(),
    rating: Number((Math.random() * 5).toFixed(1)),
    image: `https://source.unsplash.com/400x400/?fashion,product`,
  };
}
const bestPlayers = Array.from({ length: 8 }, createRandomPlayer);

// Helper to generate a random place
function createRandomPlace() {
  return {
    title: faker.company.name(),
    rating: Number((Math.random() * 5).toFixed(1)),
    image: `https://source.unsplash.com/400x400/?hotel,resort`,
   
  };
}
const placesNearYou = Array.from({ length: 8 }, createRandomPlace);

// Helper to generate random videos
function createRandomVideo() {
  return {
    title: faker.commerce.productName(),
    rating: Number((Math.random() * 5).toFixed(1)),
    reviews: faker.number.int({ min: 0, max: 5000 }),
    image: `https://source.unsplash.com/400x400/?video,tech`,
   
  };
}
const mostViewedVideos = Array.from({ length: 10 }, createRandomVideo);

// Recommended products
const recommendedProducts = Array.from({ length: 10 }, createRandomProduct);

export {
  products,
  bestPlayers,
  placesNearYou,
  mostViewedVideos,
  recommendedProducts,
};
