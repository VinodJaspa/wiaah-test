import { NumberShortner } from "@UI/../utils/src";
import React from "react";
import { HiOutlineHashtag } from "react-icons/hi";

interface HashtagViewProps {
  hashtags: HashtagCardProps[];
}

export const HashtagView: React.FC<HashtagViewProps> = ({ hashtags }) => {
  return (
    <div className="w-full space-y-3 flex flex-col items-center md:mx-0 mx-3">
      {hashtags.map((hashtag: HashtagCardProps) => (
        <HashtagCard title={hashtag.title} num={hashtag.num} />
      ))}
    </div>
  );
};

interface HashtagCardProps {
  title: string;
  num: number;
}

export const HashtagCard: React.FC<HashtagCardProps> = ({ title, num }) => {
  return (
    <div className=" md:w-1/2 w-full   flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="rounded-full border border-gray-300 p-2">
          <HiOutlineHashtag className="w-4 h-4 text-[#20ECA7]" />
        </div>
        <p className=" font-medium">{title}</p>
      </div>
      <div className="flex gap-1 text-[#656565] text-xs">
        <p>{NumberShortner(num)}</p>
        <p>Posts</p>
      </div>
    </div>
  );
};
