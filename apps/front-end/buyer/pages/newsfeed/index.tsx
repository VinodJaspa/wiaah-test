import React from "react";

import { NextPage } from "next";
import { SellerLayout } from "@blocks";

const NewsFeed: NextPage = () => {
  return (
    <SellerLayout>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-0.5">
        {FAKE_IMAGES.map((image, index) => (
          <div key={index} className="break-inside-avoid  mb-0.5">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </SellerLayout>
  );
};

const FAKE_IMAGES = [
  { src: "https://picsum.photos/300/200?random=1", alt: "Placeholder 1" },
  { src: "https://picsum.photos/300/300?random=2", alt: "Placeholder 2" },
  { src: "https://picsum.photos/300/400?random=3", alt: "Placeholder 3" },
  { src: "https://picsum.photos/300/500?random=4", alt: "Placeholder 4" },
  { src: "https://picsum.photos/300/200?random=5", alt: "Placeholder 5" },
  { src: "https://picsum.photos/300/300?random=6", alt: "Placeholder 6" },
  { src: "https://picsum.photos/300/400?random=7", alt: "Placeholder 7" },
  { src: "https://picsum.photos/300/500?random=8", alt: "Placeholder 8" },
  { src: "https://picsum.photos/300/200?random=9", alt: "Placeholder 9" },
  { src: "https://picsum.photos/300/300?random=10", alt: "Placeholder 10" },
];

export default NewsFeed;
