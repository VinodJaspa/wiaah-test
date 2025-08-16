import Image from "next/image";

type ServiceCardProps = {
  image: string;
  price: string;
  priceType: string;
  title: string;
  provider: string;
  location: string;
  reviews: number;
};

export default function VehicleServiceCard({
  image,
  price,
  priceType,
  title,
  provider,
  location,
  reviews,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
          {price} per {priceType}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{provider}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span>⭐ 4.7 ({reviews} reviews)</span>
          <button className="text-red-500 hover:underline">Show on Map</button>
        </div>
      </div>
    </div>
  );
}
