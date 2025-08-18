import RestaurantCard from "./RestaurantCard";

export default function RestaurantGrid({ restaurants }: { restaurants: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} {...r} />
      ))}
    </div>
  );
}
