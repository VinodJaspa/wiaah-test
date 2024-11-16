import { useShowStoryModal } from "@features/Social/components/Modals/StoryModal";
import React, { useEffect, useState } from "react";
import { HStack, VStack } from "ui";

interface Story {
  type: "img" | "video";
  src: string;
}

interface StoryProgressBarProps {
  stories: Story[]; // Array of story objects with type and source
  duration?: number; // Duration for each story in milliseconds (default 3000 ms)
  onClose: () => {};
}

export const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
  stories,
  duration = 3000,
  onClose,
}) => {
  const [currentStory, setCurrentStory] = useState<number>(0);

  useEffect(() => {
    if (currentStory < stories.length) {
      const timeout = setTimeout(() => {
        setCurrentStory((prevStory) => prevStory + 1);
      }, duration);

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or reset
    } else {
      setCurrentStory(0);
      onClose(); // Close modal when all stories are finished
    }
  }, [currentStory, stories.length, duration, onClose]);

  const handleVideoEnd = () => {
    if (currentStory < stories.length) {
      setCurrentStory((prevStory) => prevStory + 1);
    } else {
      setCurrentStory(0); // Reset story index for the next session
      onClose(); // Close modal when the last video finishes
    }
  };

  return (
    <VStack className="w-full space-y-4">
      {/* Progress Bar */}
      <HStack className="w-full space-x-2">
        {[...Array(stories.length)].map((_, i) => (
          <div
            key={i}
            className={`h-[2px] w-full relative rounded-3xl ${i < currentStory ? "bg-green-400" : "bg-[#B9B9B9]"
              }`}
          >
            {currentStory === i && (
              <div
                className="h-full absolute top-0 left-0 bg-green-400"
                style={{
                  animation: `progress-animation ${duration}ms linear forwards`,
                }}
              ></div>
            )}
          </div>
        ))}
      </HStack>

      {/* Media Section */}
      <div className="w-full h-64 rounded-2xl overflow-hidden">
        {stories[currentStory]?.type === "img" ? (
          <img
            src={stories[currentStory]?.src}
            alt={`Story ${currentStory + 1}`}
            className="w-full h-full object-cover"
            onLoad={() => {
              if (currentStory === stories.length - 1) {
                setTimeout(() => onClose(), duration);
              }
            }}
          />
        ) : (
          <video
            src={stories[currentStory]?.src}
            autoPlay
            muted
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
          />
        )}
      </div>

      {/* Animation Style */}
      <style>
        {`
          @keyframes progress-animation {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </VStack>
  );
};
