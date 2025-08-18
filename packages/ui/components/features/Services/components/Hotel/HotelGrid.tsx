import HotelCard from "./HotelCard";

export default function HotelGrid({ hotels }: { hotels: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}
