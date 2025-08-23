// ServiceCard.tsx
import React from "react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/router";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";

interface BeautiyCenterCardProps {
    image: string;
    id: number;
    price: string;
    name: string;
    role: string;
    duration?: string;
    address: string;
    rating: number;
    reviews: number;
}

const BeautityCenterCard: React.FC<BeautiyCenterCardProps> = ({
    image,
    id,
    price,
    name,
    role,
    duration = '30 min',
    address,
    rating,
    reviews,
}) => {
    const router = useRouter();
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Image Section */}
            <div className="relative group">
                <img src={image} alt={name} className="w-full h-48 object-cover" />

                {/* Price badge */}
                <ImageTopbadge text ={price}/>
                

                {/* Hover Overlay + View Details */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => router.push(`/service/beauty_center/${id}`)}
                        className="bg-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
                    >
                        View Details
                    </button>
                </div>
            </div>
            {/* Content Section */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600">
                    {role} {duration && `· ${duration}`}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {address}
                </p>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        ⭐ {rating} ({reviews} reviews)
                    </p>
                    <button className="text-sm font-medium text-red-500 hover:underline">
                        Show on Map
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BeautityCenterCard;
