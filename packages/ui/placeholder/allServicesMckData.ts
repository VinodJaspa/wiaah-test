import { SearchServiceCardProps } from "@features/Search";
// ---------------- MOCK DATA ----------------
const randomNames = ["John Doe", "Emily Smith", "Michael Johnson", "Sophia Brown", "David Wilson", "Olivia Taylor", "James Miller", "Emma Davis", "Daniel Martinez", "Ava Anderson"];
const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];
const getRandomImage = (id: number) => `https://picsum.photos/seed/${id}/400/300`;

export const getMockServices = (start: number, count: number): SearchServiceCardProps[] => {
    return [...Array(count)].flatMap((_, idx) => {
      const id = start + idx;
  
      return [
          // HOTEL
          {
              serviceData: {
                  reviews: 420,
                  discount: 20,
                  id: `${id}-hotel`,
                  label: "Hotel",
                  location: {
                      country: "USA",
                      countryCode: "US",
                      state: "NY",
                      address: "5th Avenue",
                      postalCode: 10001,
                      cords: { lat: 40.7128, lng: -74.006 },
                      city: "New York",
                  },
                  price: 120,
                  rating: 4.6,
                  thumbnail: getRandomImage(id),
                  title: "Luxury Hotel Room",
              },
              serviceType: "hotel",
              sellerInfo: {
                  id: `${id}-s1`,
                  name: getRandomName(),
                  profession: "Manager",
                  thumbnail: getRandomImage(id + 10),
                  verified: true,
              },
          },

          // RESTAURANT
          {
              serviceData: {
                  reviews: 310,
                  discount: 15,
                  id: `${id}-rest`,
                  label: "Restaurant",
                  location: {
                      country: "USA",
                      countryCode: "US",
                      state: "CA",
                      address: "Sunset Blvd",
                      postalCode: 90001,
                      cords: { lat: 34.0522, lng: -118.2437 },
                      city: "Los Angeles",
                  },
                  price: [25, 300],
                  rating: 4.7,
                  thumbnail: getRandomImage(id + 20),
                  title: "The Harbor House",
              },
              serviceType: "restaurant",
              sellerInfo: {
                  id: `${id}-s2`,
                  name: getRandomName(),
                  profession: "Chef",
                  thumbnail: getRandomImage(id + 21),
                  verified: true,
              },
          },

          // HOLIDAY RENTALS
          {
              serviceData: {
                  reviews: 150,
                  discount: 10,
                  id: `${id}-holiday`,
                  label: "Holiday Rentals",
                  location: {
                      country: "Spain",
                      countryCode: "ES",
                      state: "Catalonia",
                      address: "Beach Road",
                      postalCode: 80023,
                      cords: { lat: 41.3851, lng: 2.1734 },
                      city: "Barcelona",
                  },
                  price: 200,
                  rating: 4.5,
                  thumbnail: getRandomImage(id + 30),
                  title: "Cozy Beach Apartment",
              },
              serviceType: "holiday_rentals",
              sellerInfo: {
                  id: `${id}-s3`,
                  name: getRandomName(),
                  profession: "Host",
                  thumbnail: getRandomImage(id + 31),
                  verified: true,
              },
          },

          // HEALTH CENTER
          {
              serviceData: {
                  reviews: 95,
                  discount: 5,
                  id: `${id}-health`,
                  label: "Health Center",
                  location: {
                      country: "India",
                      countryCode: "IN",
                      state: "MH",
                      address: "Marine Drive",
                      postalCode: 400001,
                      cords: { lat: 18.9388, lng: 72.8354 },
                      city: "Mumbai",
                  },
                  price: 50,
                  rating: 4.3,
                  thumbnail: getRandomImage(id + 40),
                  title: "Wellness & Spa Center",
              },
              serviceType: "health_center",
              sellerInfo: {
                  id: `${id}-s4`,
                  name: getRandomName(),
                  profession: "Doctor",
                  thumbnail: getRandomImage(id + 41),
                  verified: true,
              },
          },

          // VEHICLE
          {
              serviceData: {
                  reviews: 230,
                  discount: 25,
                  id: `${id}-vehicle`,
                  label: "Vehicle",
                  location: {
                      country: "Germany",
                      countryCode: "DE",
                      state: "Berlin",
                      address: "Alexanderplatz",
                      postalCode: 10178,
                      cords: { lat: 52.52, lng: 13.405 },
                      city: "Berlin",
                  },
                  price: [40, 150],
                  rating: 4.4,
                  thumbnail: getRandomImage(id + 50),
                  title: "Car Rental - Sedan",
              },
              serviceType: "vehicle",
              sellerInfo: {
                  id: `${id}-s5`,
                  name: getRandomName(),
                  profession: "Dealer",
                  thumbnail: getRandomImage(id + 51),
                  verified: true,
              },
          },

          // BEAUTY CENTER
          {
              serviceData: {
                  reviews: 180,
                  discount: 12,
                  id: `${id}-beauty`,
                  label: "Beauty Center",
                  location: {
                      country: "France",
                      countryCode: "FR",
                      state: "Île-de-France",
                      address: "Champs-Élysées",
                      postalCode: 75008,
                      cords: { lat: 48.8566, lng: 2.3522 },
                      city: "Paris",
                  },
                  price: [30, 200],
                  rating: 4.9,
                  thumbnail: getRandomImage(id + 60),
                  title: "Luxury Salon & Spa",
              },
              serviceType: "beauty_center",
              sellerInfo: {
                  id: `${id}-s6`,
                  name: getRandomName(),
                  profession: "Beautician",
                  thumbnail: getRandomImage(id + 61),
                  verified: true,
              },
          },
      ] as unknown as SearchServiceCardProps[];
    });
  };
