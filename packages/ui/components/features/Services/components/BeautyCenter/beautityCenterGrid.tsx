import BeautityCenterCard from "./beautyCenterCard";

interface BeautyCenter {
  id: string | number;
  image: string;
  price: string;
  name: string;
  role: string;
  duration?: string;
  address: string;
  rating: number;
  reviews: number;
}

export default function BeautiyCenterGrid({ data }: { data: BeautyCenter[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((beautyCenterData) => (
        <BeautityCenterCard key={beautyCenterData.id} {...beautyCenterData} />
      ))}
    </div>
  );
}
