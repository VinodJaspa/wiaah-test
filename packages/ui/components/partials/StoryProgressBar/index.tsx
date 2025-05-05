import React, { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi";
import { HStack, VStack, DisplayPostedSince } from "ui";

interface StoryProgressBarProps {
  stories: {
    component: React.ReactNode;
    storyData: { views: number; createdAt: any };
  }[]; // Array of custom story components
  duration?: number; // Duration for each story in milliseconds (default 3000 ms)
  onClose: () => void; // Callback when all stories are finished
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
      onClose(); // Close modal when all stories are finished
      setCurrentStory(0);
    }
    return () => {
      setCurrentStory(0); // Reset current story when component unmounts
    }
  }, [currentStory, stories.length, onClose]);

  return (
    <VStack className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="flex w-full justify-between px-3">
        <HStack className="cursor-pointer">
          <p>
            {stories[currentStory] && stories[currentStory].storyData.views}
          </p>
          <HiEye />
        </HStack>
        <DisplayPostedSince
          ago
          since={
            stories[currentStory] && stories[currentStory].storyData.createdAt
          }
        />
      </div>

      <HStack className="w-full space-x-2 px-3">
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
      <div
        className="w-full h-full rounded-2xl"
        onEnded={() => {
          if (currentStory === stories.length - 1) {
            onClose();
          }
        }}
      >
        {stories[currentStory] && stories[currentStory].component}
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
