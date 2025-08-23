import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { useState } from "react";
import RestaurantGrid from "./RestaurantGrid";
import SearchBarByLocationAndArea from "./SearchBarRestaurant";
import { Divider } from "@partials";


export default function RestaurantsPage() {
    const [total, setTotal] = useState(5);
    const [current, setCurrent] = useState(1);
    const handleNext =()=>{
        
    }
    const restaurants = [
      {
        id: 1,
        image: "https://picsum.photos/seed/french/600/400",
        name: "Le Bistro Parisien",
        cuisine: "French",
        priceRange: "$$$",
        tags: ["Michelin"],
        address: "20 Rue de Paris, 75009 Paris",
        rating: 4.2,
        reviews: 230,
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/italian/600/400",
        name: "La Trattoria Bella",
        cuisine: "Italian",
        priceRange: "$$",
        tags: ["Family Friendly"],
        address: "25 Via Roma, 75011 Paris",
        rating: 4.3,
        reviews: 180,
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/japanese/600/400",
        name: "Sushi Zen",
        cuisine: "Japanese",
        priceRange: "$$$",
        tags: ["Michelin"],
        address: "30 Rue de Tokyo, 75002 Paris",
        rating: 4.5,
        reviews: 320,
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/indian/600/400",
        name: "Spice of India",
        cuisine: "Indian",
        priceRange: "$$",
        tags: ["Vegan Options"],
        address: "42 Curry Street, 75005 Paris",
        rating: 4.6,
        reviews: 410,
      },
      {
        id: 5,
        image: "https://picsum.photos/seed/mexican/600/400",
        name: "Casa Mexicana",
        cuisine: "Mexican",
        priceRange: "$$",
        tags: ["Cocktails"],
        address: "18 Salsa Avenue, 75012 Paris",
        rating: 4.4,
        reviews: 290,
      },
      {
        id: 6,
        image: "https://picsum.photos/seed/chinese/600/400",
        name: "Golden Dragon",
        cuisine: "Chinese",
        priceRange: "$$",
        tags: ["Takeaway"],
        address: "88 Dragon Road, 75010 Paris",
        rating: 4.1,
        reviews: 150,
      },
      {
        id: 7,
        image: "https://picsum.photos/seed/greek/600/400",
        name: "Athena’s Table",
        cuisine: "Greek",
        priceRange: "$$",
        tags: ["Seaside"],
        address: "12 Olympus Street, 75015 Paris",
        rating: 4.7,
        reviews: 370,
      },
      {
        id: 8,
        image: "https://picsum.photos/seed/steakhouse/600/400",
        name: "Prime Steakhouse",
        cuisine: "Steakhouse",
        priceRange: "$$$$",
        tags: ["Luxury"],
        address: "5 Beef Blvd, 75016 Paris",
        rating: 4.8,
        reviews: 420,
      },
    ];
    

  return (
    <main className="pr-6 pl-6">
      <SearchBarByLocationAndArea
        placeholder1="Location"
        placeholder2="Cuisine, restaurant name..."
      />
         <Divider/>
      <div className="sm:mt-6 pb-12">
        <RestaurantGrid restaurants={restaurants} />
        <Pagination total={total} current={current} onPageChange={handleNext}/>
      </div>
    </main>
  );
}
