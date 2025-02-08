import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface ScrollableStoriesProps {
  stories: StoryType[];
}

interface StoryType {
  image: string;
  seen: boolean;
}

export const ScrollableStories: React.FC<ScrollableStoriesProps> = ({
  stories,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 208,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -208,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScrollable = () => {
      if (carouselRef.current) {
        setIsScrollable(
          carouselRef.current.scrollWidth > carouselRef.current.clientWidth,
        );
      }
    };

    // Check on mount
    checkScrollable();

    // Check on window resize
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  return (
    <div className="flex gap-6 w-full items-center mb-4">
      {isScrollable && (
        <button
          onClick={scrollLeft}
          className="flex items-center justify-center transform bg-opacity-20 z-10 min-w-[58px] h-[58px] bg-[#20ECA7] rounded-full shadow-md hover:bg-opacity-40 focus:outline-none"
          aria-label="Scroll Left"
        >
          <FaChevronLeft className="text-[#3CD399] w-8 h-8" />
        </button>
      )}

      <div
        className={`flex items-center justify-center min-w-20 h-20 rounded-xl bg-[#F1F1F1]`}
      >
        <FaPlus className="w-[42px] h-[42px] text-[#3CD399]" />
      </div>
      <div
        className="relative flex gap-6 w-full overflow-x-scroll z-10 noScroll "
        ref={carouselRef}
      >
        {stories.map((story, index) => (
          <div
            key={index}
            className={`min-w-20 max-h-20 aspect-square rounded-xl bg-primary ${
              story.seen ? "p-0" : "p-[0.20rem]"
            }`}
          >
            <div
              className={`w-full h-full overflow-hidden rounded-xl bg-white p-[0.17rem]`}
            >
              <img
                className="w-full h-full object-cover rounded-xl"
                src={story.image}
                alt={`Image ${index}`}
              />
            </div>
          </div>
        ))}
      </div>
      {isScrollable && (
        <button
          onClick={scrollRight}
          className="flex items-center justify-center transform bg-opacity-20 z-10 min-w-[58px] h-[58px] bg-[#20ECA7] rounded-full shadow-md hover:bg-opacity-40 focus:outline-none"
          aria-label="Scroll Right"
        >
          <FaChevronRight className="text-[#3CD399] w-8 h-8" />
        </button>
      )}
    </div>
  );
};
