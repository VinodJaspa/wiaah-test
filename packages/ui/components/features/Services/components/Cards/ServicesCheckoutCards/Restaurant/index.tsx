import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import RestaurantGrid from "./RestaurantGrid";
import SearchBarRestaurant from "./SearchBarRestaurant";
import { useState } from "react";


export default function RestaurantsPage() {
    const [total, setTotal] = useState(5);
    const [current, setCurrent] = useState(1);
    const handleNext =()=>{
        
    }
  const restaurants = [
    {
      id: 1,
      image: "/images/restaurant1.jpg",
      name: "Le Bistro Parisien",
      cuisine: "French",
      priceRange: "$$$",
      tags: ["Michelin"],
      address: "€20, 75009 Paris",
      rating: 4.2,
      reviews: 230,
    },
    {
      id: 2,
      image: "/images/restaurant2.jpg",
      name: "La Trattoria Bella",
      cuisine: "Italian",
      priceRange: "$$$",
      tags: ["Michelin"],
      address: "€25, 75011 Paris",
      rating: 4.3,
      reviews: 230,
    },
    {
      id: 3,
      image: "/images/restaurant3.jpg",
      name: "Sushi Zen",
      cuisine: "Japanese",
      priceRange: "$$$",
      tags: ["Michelin"],
      address: "€30, 75002 Paris",
      rating: 4.5,
      reviews: 230,
    },
    // ...more restaurants
  ];

  return (
    <main className="p-6">
      <SearchBarRestaurant
        placeholder1="Location"
        placeholder2="Cuisine, restaurant name..."
      />
      <div className="mt-6">
        <RestaurantGrid restaurants={restaurants} />
        <Pagination total={total} current={current} onPageChange={handleNext}/>
      </div>
    </main>
  );
}
