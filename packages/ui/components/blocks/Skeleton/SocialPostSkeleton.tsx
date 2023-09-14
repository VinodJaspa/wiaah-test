import React from "react";
import { setTestid } from "utils";

export const SocialPostSkeleton: React.FC = () => {
  return (
    <div
      {...setTestid("socialPostSkeleton")}
      className="rounded-2xl overflow-hidden w-full h-full bg-gray-200 animate-pulse relative"
    >
      <div className="absolute top-0 left-0 py-4 px-8 flex gap-8 w-full">
        <div className="flex gap-2 items-center">
          <div className="rounded-full min-h-[4rem] min-w-[4rem] animate-pulse bg-gray-300" />
          <div className="flex flex-col gap-1">
            <div className="w-16 h-3 bg-gray-300 animate-pulse"></div>
            <div className="w-10 h-2 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-8 animate-pulse mt-4" />
      </div>

      <div className="absolute flex w-full justify-around bottom-0 py-4 px-8 left-0">
        <div className="w-12 h-12 rounded-xl bg-gray-300 animate-pulse" />
        <div className="w-12 h-12 rounded-xl bg-gray-300 animate-pulse" />
        <div className="w-12 h-12 rounded-xl bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
};
