import VehicleServiceCard from "./VehicleServiceCard";


const services = [
  {
    image: "/images/bike.jpg",
    price: "$250",
    priceType: "Hour",
    title: "Auto Care by Alex",
    provider: "Moto rent",
    location: "1208, Geneva",
    reviews: 230,
  },
  {
    image: "/images/car-yellow.jpg",
    price: "$250",
    priceType: "Week",
    title: "Vehicle Detailing by Chris",
    provider: "Car rent",
    location: "1208, Geneva Airport",
    reviews: 1230,
  },
  {
    image: "/images/van.jpg",
    price: "$250",
    priceType: "Day",
    title: "Tire Services by Emily",
    provider: "Car rent",
    location: "1208, Geneva Airport",
    reviews: 1230,
  },
  {
    image: "/images/car-red.jpg",
    price: "$250",
    priceType: "Month",
    title: "Car Wash by Ryan",
    provider: "Car rent",
    location: "1208, Geneva Airport",
    reviews: 1230,
  },
];

export default function VehicleServiceGrid() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => (
        <VehicleServiceCard key={i} {...service} />
      ))}
    </div>
  );
}
