import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import Image from "next/image";


export const shopsData = [
  {
    id: 1,
    category: "Fashion shop",
    title: "Tranquil Haven",
    imageUrl: "/assets/women.svg",
    buttonText: "Visit now",
    alt: "Woman in a red dress",
    isLarge: true,
  },
  {
    id: 2,
    category: "Fashion shop",
    title: "Tranquil Haven",
    imageUrl: "/assets/modelVideo.svg",
    buttonText: "Visit now",
    alt: "Woman with a striped tote bag",
    isLarge: false,
    hasVideo: true,
    videoUrl: "https://www.thevoiceoffashion.com/watch/features/a-toy-story-crafting-a-silaiwali-doll-200-5",
  },
  {
    id: 3,
    category: "Fashion shop",
    title: "Tranquil Haven",
    imageUrl: "/assets/bags.svg",
    buttonText: "Visit now",
    alt: "Collection of handbags",
    isLarge: false,
  },
  {
    id: 4,
    category: "Fashion shop",
    title: "Tranquil Haven",
    imageUrl: "/assets/shoes.svg",
    buttonText: "Visit now",
    alt: "Collection of mens shoes",
    isLarge: false,
  },
  {
    id: 5,
    category: "Fashion shop",
    title: "Tranquil Haven",
    imageUrl: "/assets/watch.svg",
    buttonText: "Visit now",
    alt: "Collection of watches",
    isLarge: false,
  },
];

// Fixed ShopCard component
// ShopCard component
const ShopCard = ({ shop, className = "" }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-white border-2 h-full ${className}`}>
      {/* Image container */}
      <div className="relative w-full h-full">
        {shop.hasVideo ? (
          <>
            <img
              src={shop.imageUrl}
              alt={shop.alt || ""}
              className="w-full h-full object-cover"
            />
            {/* Play icon overlay for video */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12 text-pink-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.5 1.5 0 010 2.096l-7.5 7.5A1.5 1.5 0 016 19.5v-15a1.5 1.5 0 012.524-1.083l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <img
            src={shop.imageUrl}
            alt={shop.alt || ""}
            className="w-full h-full object-cover"
          />
        )}

        {/* Content positioned in top-left corner */}
        <div className="absolute top-4 left-4 right-4">
          <span className="text-gray-700 text-xs sm:text-sm font-medium block mb-1">{shop.category}</span>
          <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{shop.title}</h3>
          <button className="bg-[#20ECA7] text-white text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-[#1dd1a1] transition-colors">
            {shop.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main layout
export default function BestShopsSection() {
  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <SectionTitle title='Best shops'/>
   
      

        <div className="flex gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 auto-rows-auto">
        {/* Left large card */}
        <div className="h-full">
          <ShopCard shop={shopsData[0]} />
        </div>

        {/* Right stacked cards */}
        <div className="h-full grid grid-rows-2 gap-4 lg:col-span-2">
          {/* Top row - left small, right large */}
          <div className="h-full grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="h-full col-span-1">
              <ShopCard shop={shopsData[1]} />
            </div>
            <div className="h-full col-span-1 md:col-span-2 sm:col-span-2">
              <ShopCard shop={shopsData[2]} />
            </div>
          </div>

          {/* Bottom row - two equal width */}
          <div className="h-full grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopCard shop={shopsData[3]} />
            <ShopCard shop={shopsData[4]} />
          </div>
        </div>
      </div>
    </div>
  );
}
