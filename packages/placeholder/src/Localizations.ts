import { GetNearPlacesQuery } from "@features/Places/services/useGetNearPlacesQuery";

export const LocalizationsPH: {
  name: string;
  image: string;
  views: number;
}[] = [
    {
      name: "New York",
      image: "/place-1.jpg",
      views: 2500000,
    },
    {
      name: "Los Angeles",
      image: "/place-2.jpg",
      views: 1500000,
    },
    {
      name: "Chicago",
      image: "/place-3.jpg",
      views: 17000,
    },
    {
      name: "San Antonio",
      image: "/shop-3.jpeg",
      views: 3500,
    },
  ];
export const nearPlacesPlaceholder: GetNearPlacesQuery["getNearShops"] = [
  {
    id: "1",
    thumbnail: "/shop.jpeg",
    name: "Shop One",
    email: "shopone@example.com",
    rating: 4.5,
    reviews: 120,
    location: {
      address: "123 Main St",
      city: "Springfield",
      country: "USA",
      state: "IL",
    },
  },
  {
    id: "2",
    thumbnail: "/shop.jpeg",
    name: "Shop Two",
    email: "shoptwo@example.com",
    rating: 4.2,
    reviews: 85,
    location: {
      address: "456 Elm St",
      city: "Metropolis",
      country: "USA",
      state: "NY",
    },
  },
  {
    id: "3",
    thumbnail: "/shop.jpeg",
    name: "Shop Three",
    email: "shopthree@example.com",
    rating: 4.8,
    reviews: 230,
    location: {
      address: "789 Oak St",
      city: "Gotham",
      country: "USA",
      state: "NJ",
    },
  },
  {
    id: "4",
    thumbnail: "/shop.jpeg",
    name: "Shop Four",
    email: "shopfour@example.com",
    rating: 3.9,
    reviews: 54,
    location: {
      address: "321 Maple Ave",
      city: "Star City",
      country: "USA",
      state: "CA",
    },
  },
  {
    id: "5",
    thumbnail: "/shop.jpeg",
    name: "Shop Five",
    email: "shopfive@example.com",
    rating: 4.0,
    reviews: 99,
    location: {
      address: "654 Pine Ln",
      city: "Coast City",
      country: "USA",
      state: "FL",
    },
  },
];
