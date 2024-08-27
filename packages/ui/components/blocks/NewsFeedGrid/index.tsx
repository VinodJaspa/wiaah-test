import React from "react";

interface NewsFeedGridProps {
  images: string[];
}

interface TransformedImages {
  src: string;
  className: string;
}

const classPatterns: string[] = [
  "col-span-5 row-span-1", // 0
  "col-span-5 row-span-1", // 1
  "col-span-2 row-span-2", // 2
  "col-span-5 row-span-1", // 3
  "col-span-5 row-span-1", // 4
  "col-span-3 row-span-2", // 5
  "col-span-3 row-span-1", // 6
  "col-span-2 row-span-1", // 7
  "col-span-3 row-span-1", // 8
  "col-span-2 row-span-1", // 9
];

const transformImages = (images: string[]): TransformedImages[] => {
  return images.map((src, index) => ({
    src,
    className: classPatterns[index % classPatterns.length],
  }));
};

const splitIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const NewsFeedGrid: React.FC<NewsFeedGridProps> = ({ images }) => {
  const transformedImages = transformImages(images);
  const imageChunks = splitIntoChunks(transformedImages, 5);

  return (
    <div className="space-y-3 w-full">
      {imageChunks.map((chunk, index) => (
        <Grid key={index} images={chunk} />
      ))}
    </div>
  );
};

const Grid: React.FC<{ images: TransformedImages[] }> = ({ images }) => (
  <div className="grid grid-rows-2 grid-flow-col gap-3 w-full h-[500px]">
    {images.map((image, index) => (
      <div className={image.className} key={index}>
        <img
          src={image.src}
          alt={`Image - ${index}`}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
    ))}
  </div>
);
