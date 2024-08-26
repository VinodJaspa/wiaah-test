import React from "react";

interface NewsFeedGridProps {
  images: string[];
}

interface TransformedImages {
  src: string;
  className: string;
}

const getClassName = (index: number): string => {
  const classNameMapping: { [key: number]: string } = {
    0: "col-span-2 row-span-1",
    1: "col-span-2 row-span-1",
    2: "col-span-1 row-span-2",
    3: "col-span-2 row-span-1",
    4: "col-span-2 row-span-1",
    5: "col-span-3 row-span-2",
    6: "col-span-3 row-span-1",
    7: "col-span-2 row-span-1",
    8: "col-span-3 row-span-1",
    9: "col-span-2 row-span-1",
  };

  return classNameMapping[index] || "default-class"; // Provide a default className if needed
};

export const NewsFeedGrid: React.FC<NewsFeedGridProps> = ({ images }) => {
  const transformArray = (images: string[]) => {
    const result: TransformedImages[] = [];

    const classPatterns = [
      "col-span-2 row-span-1", // 0
      "col-span-2 row-span-1", // 1
      "col-span-1 row-span-2", // 2
      "col-span-2 row-span-1", // 3
      "col-span-2 row-span-1", // 4
      "col-span-3 row-span-2", // 5
      "col-span-3 row-span-1", // 6
      "col-span-2 row-span-1", // 7
      "col-span-3 row-span-1", // 8
      "col-span-2 row-span-1", // 9
    ];

    for (let i = 0; i < images.length; i++) {
      const patternIndex = i % classPatterns.length;
      result.push({ src: images[i], className: classPatterns[patternIndex] });
    }

    return result;
  };

  const transformedArray = transformArray(images);
  const chunks: TransformedImages[][] = [];
  for (let i = 0; i < transformedArray.length; i += 5) {
    chunks.push(transformedArray.slice(i, i + 5));
  }

  return (
    <>
      {chunks.map((chunk, index) => (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            <FirstGrid images={chunk} />
          ) : (
            <SecondGrid images={chunk} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const FirstGrid = ({ images }: { images: TransformedImages[] }) => {
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-2 w-full h-[500px]">
      {images.map((image, index) => (
        <div className={`${image.className}`} key={index}>
          <img
            src={image.src}
            alt={`Image - ${index}`}
            className={`object-cover rounded-lg w-full h-full`}
          />
        </div>
      ))}
    </div>
  );
};

const SecondGrid = ({ images }: { images: TransformedImages[] }) => {
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-2 w-full h-[500px]">
      {images.map((image, index) => (
        <div className={`${image.className}`} key={index}>
          <img
            src={image.src}
            alt={`Image - ${index}`}
            className={`object-cover rounded-lg w-full h-full`}
          />
        </div>
      ))}
    </div>
  );
};
