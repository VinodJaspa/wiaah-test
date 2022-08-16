import { Wrap, WrapItem, Text, WrapProps } from "@chakra-ui/react";
import React from "react";

export interface HashTagsProps {
  tags: string[];
  color?: string;
  onTagClick?: (tag: string) => void;
  style?: WrapProps;
}

export const HashTags: React.FC<HashTagsProps> = ({ tags, onTagClick }) => {
  function handleHashtagClick(tag: string) {
    onTagClick && onTagClick(tag);
  }

  return (
    <div className="flex flex-wrap gap-2" data-testid="TagsContainer">
      {tags.map((tag, i) => (
        <p
          data-testid="Tag"
          onClick={() => handleHashtagClick(tag)}
          className={"cursor-pointer font-semibold text-primary"}
        >
          #{tag}
        </p>
      ))}
    </div>
  );
};
