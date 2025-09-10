"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown, Share2 } from "lucide-react";
import { Heart } from "lucide-react";

export const ProductDetailCard = ({ product }) => {
  const [selectedImage, setSelectedImage] = React.useState(product?.images[0]);
  const [isFav, setIsFav] = React.useState(false);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side (Images) */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex gap-4 items-start">
            <div className="flex gap-4 items-start">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-3">
                {product?.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className={`w-30 h-20 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
                      }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Main Image with Heart Icon */}
              <div className="relative flex-1">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-[380px] md:h-[450px] object-contain rounded-lg"
                />
                {/* Heart Icon */}
                <button
                  onClick={() => setIsFav(!isFav)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${isFav ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side (Product Info) */}
        <div className="flex flex-col gap-4 text-sm mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={`https://picsum.photos/seed/brand/36/36`}
                alt="Brand"
                className="w-9 h-9 rounded-full"
              />
              <span className="font-medium text-base">Nike</span>
            </div>
            <div className="flex gap-2">
              <Share2 className="w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Product Info */}
          <h2 className="text-xl font-semibold leading-snug">
            Midnight Elegance Buckle Detail Tie
          </h2>
          <p className="text-gray-500 text-xs">#500 pieces in stock</p>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$249.99</span>
            <span className="line-through text-gray-400 text-sm">$669</span>
            <span className="text-red-500 font-medium text-sm">Save 20%</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-sm">★★★★☆</span>
            <span className="text-gray-600 text-xs">4.5 (100)</span>
          </div>

          {/* Colors */}
          <div className="flex gap-2">
            {["bg-black", "bg-white", "bg-red-500", "bg-green-500"].map(
              (color, i) => (
                <button
                  key={i}
                  className={`w-7 h-7 rounded-full border ${color}`}
                />
              )
            )}
          </div>

          {/* Sizes */}
          <div className="flex gap-2">
            {["S", "M", "L"].map((size, i) => (
              <button
                key={i}
                className="px-3 py-1 border rounded-md text-sm hover:bg-black hover:text-white transition"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Shipping Message */}
          <p className="text-red-500 text-xs">
            Sorry, this product can’t be shipped to your country
          </p>

          {/* Add to cart */}
          <button className="mt-1 w-fit px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};




// ---------- Product Info ----------
// export const ProductInfo = ({ product }: { product: any }) => {
//   return (
//     <div className="mx-auto">
//       <h2 className="text-xl font-semibold">{product.brand}</h2>
//       <p className="text-lg text-gray-700">{product.name}</p>
//       <p className="text-sm text-gray-500">#{product.stock} pieces in stock</p>

//       <div className="mt-3 flex items-center gap-3">
//         <span className="text-2xl font-bold">${product.price}</span>
//         <span className="line-through text-gray-400">${product.oldPrice}</span>
//         <span className="text-red-500 font-medium">{product.discount}% Off</span>
//       </div>

//       {/* Colors */}
//       <div className="mt-3 flex gap-2">
//         {product.colors.map((c: string, i: number) => (
//           <div
//             key={i}
//             className={`w-6 h-6 rounded-full border cursor-pointer`}
//             style={{ backgroundColor: c }}
//           />
//         ))}
//       </div>

//       {/* Sizes */}
//       <div className="mt-3 flex gap-3">
//         {product.sizes.map((s: string, i: number) => (
//           <button
//             key={i}
//             className="px-3 py-1 border rounded-md hover:bg-black hover:text-white"
//           >
//             {s}
//           </button>
//         ))}
//       </div>

//       <button className="mt-4 w-fit p-4 bg-black text-white py-3 rounded-lg">
//         Add to cart
//       </button>
//     </div>
//   );
// };



// ---------- Accordion Wrapper ----------
const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="border-b">
          <Disclosure.Button className="flex w-full justify-between items-center py-4 text-left text-base font-medium text-black">
            {title}
            <ChevronDown
              className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="pb-4 text-gray-600 text-sm leading-relaxed">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

// ---------- Description ----------
const ProductDescription = () => {
  const highlights = [
    "Textured fabric for a premium look",
    "Puff sleeves with a soft, relaxed fit",
    "Adjustable tie-front detail",
    "Flattering peplum hemline",
    "Easy to style for everyday wear",
  ];

  const descriptionText =
    "A versatile top designed for both comfort and style. Crafted from soft textured fabric, it brings depth to any outfit while the puff sleeves add a touch of elegance. The adjustable tie-front lets you style it your way, and the peplum hem flatters your silhouette. Perfect for casual outings, brunch dates, or laid-back Fridays at work—pair it with jeans, skirts, or trousers for a look that works day to night.";

  return (
    <AccordionItem title="Description" defaultOpen>
      <ul className="list-disc pl-6 mb-3 space-y-1">
        {highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <p>{descriptionText}</p>
    </AccordionItem>
  );
};

// ---------- Delivery ----------
const ProductDelivery = () => {
  return (
    <AccordionItem title="Delivery">
      <p>
        Free standard delivery on all orders. Express options available at
        checkout.
      </p>
    </AccordionItem>
  );
};

// ---------- About ----------
const ProductAbout = () => {
  return (
    <AccordionItem title="About Nike">
      <p>
        Inspired by sport and powered by innovation, Nike creates apparel that
        combines performance with everyday comfort.
      </p>
    </AccordionItem>
  );
};

// ---------- Main Component ----------
export default function ProductDetailAccordion() {
  return (
    <div className="divide-y border-t border-gray-200">
      <ProductDescription />
      <ProductDelivery />
      <ProductAbout />
    </div>
  );
}


// ---------- Reviews ----------
export const ReviewItem = ({ review }: { review: any }) => {
  return (
    <div className="border-b py-4">
      <p className="font-semibold">{review.user}</p>
      <p className="text-sm text-gray-500">{review.date}</p>
      <p className="mt-2">{review.text}</p>
    </div>
  );
};

export const ProductReviews = ({ reviews }: { reviews: any[] }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Rating and Reviews</h3>
      {reviews.map((r, i) => (
        <ReviewItem key={i} review={r} />
      ))}
    </div>
  );
};

// ---------- More Products ----------
export const MoreProducts = ({ items }: { items: any[] }) => {
  return (
    <div>
      <h3 className="text-base font-medium text-black mb-3 mt-4">More Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {items.map((p, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <div key={`${i}-${j}`} className="text-start">
              <img
                src={p.image}
                alt={p.name}
                className="w-full rounded-lg object-contain"
              />
              <p className="mt-2 text-sm">{p.name}</p>
              <p className="text-gray-500">${p.price}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};
