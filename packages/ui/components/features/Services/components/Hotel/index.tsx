
import HotelGrid from "./HotelGrid";
import SearchBarHotel from "./SearchBarHotel";
import React ,{useState} from "react";
import Pagination from "../../../../../components/shadcn-components/Pagination/Pagination";
import { Divider } from "@partials";
export default function HotelsPageMarket() {
    const [total, setTotal] = React.useState(5);
    const [current, setCurrent] = useState(1)
    const handlePageChage = ()=>{

    }
    const hotels = [
      {
        id: 1,
        image: "https://picsum.photos/600/400?random=101",
        name: "Metropolis Hotel",
        location: "Metropolis, Countryland",
        rating: 4.7,
        reviews: 230,
        price: "$250",
        dateRange: "July 30 - July 30",
      },
      {
        id: 2,
        image: "https://picsum.photos/600/400?random=102",
        name: "Seaside Resort",
        location: "Smalltown, Countryland",
        rating: 4.5,
        reviews: 198,
        price: "$220",
        dateRange: "Aug 5 - Aug 12",
      },
      {
        id: 3,
        image: "https://picsum.photos/600/400?random=103",
        name: "Mountain View Inn",
        location: "Highlands, Countryland",
        rating: 4.8,
        reviews: 342,
        price: "$310",
        dateRange: "Sept 1 - Sept 5",
      },
      {
        id: 4,
        image: "https://picsum.photos/600/400?random=104",
        name: "Lakeside Retreat",
        location: "Lakeshore, Countryland",
        rating: 4.6,
        reviews: 275,
        price: "$280",
        dateRange: "Aug 15 - Aug 20",
      },
      {
        id: 5,
        image: "https://picsum.photos/600/400?random=10001",
        name: "Urban Boutique Hotel",
        location: "Capital City, Countryland",
        rating: 4.3,
        reviews: 190,
        price: "$200",
        dateRange: "July 28 - July 31",
      },
      {
        id: 6,
        image: "https://picsum.photos/600/400?random=106",
        name: "Desert Oasis Lodge",
        location: "Sahara Town, Countryland",
        rating: 4.9,
        reviews: 410,
        price: "$350",
        dateRange: "Oct 2 - Oct 6",
      },
      {
        id: 7,
        image: "https://picsum.photos/600/400?random=107",
        name: "Island Paradise Resort",
        location: "Sunny Isles, Countryland",
        rating: 4.7,
        reviews: 520,
        price: "$400",
        dateRange: "Dec 20 - Dec 27",
      },
      {
        id: 8,
        image: "https://picsum.photos/600/400?random=108",
        name: "Countryside Inn",
        location: "Greenfields, Countryland",
        rating: 4.2,
        reviews: 150,
        price: "$180",
        dateRange: "Aug 10 - Aug 14",
      },
    ];
    

  return (
    <main className="pr-6 pl-6 mb-12">
      <SearchBarHotel />
      <Divider/>
      <div className="mt-6 ">
        <HotelGrid hotels={hotels} />
        <Pagination total={total} current={current} onPageChange={handlePageChage}/>
      </div>
    </main>
  );
}
