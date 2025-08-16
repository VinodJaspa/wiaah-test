import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import HotelGrid from "./HotelGrid";
import SearchBarHotel from "./SearchBarHotel";
import React ,{useState} from "react";

export default function HotelsPageMarket() {
    const [total, setTotal] = React.useState(5);
    const [current, setCurrent] = useState(1)
    const handlePageChage = ()=>{

    }
  const hotels = [
    {
      id: 1,
      image: "/images/hotel1.jpg",
      name: "Metropolis Hotel",
      location: "Metropolis, Countryland",
      rating: 4.7,
      reviews: 230,
      price: "$250",
      dateRange: "July 30 - July 30",
    },
    {
      id: 2,
      image: "/images/hotel2.jpg",
      name: "Metropolis Hotel",
      location: "Smalltown, Countryland",
      rating: 4.5,
      reviews: 230,
      price: "$250",
      dateRange: "July 30 - July 30",
    },
    // add more hotels...
  ];

  return (
    <main className="p-6">
      <SearchBarHotel />
      <div className="mt-6">
        <HotelGrid hotels={hotels} />
        <Pagination total={total} current={current} onPageChange={handlePageChage}/>
      </div>
    </main>
  );
}
