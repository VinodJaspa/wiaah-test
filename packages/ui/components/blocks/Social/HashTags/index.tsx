import React from "react";
import { HtmlDivProps } from "types";

export interface HashTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  props?: HtmlDivProps;
}

export const HashTags: React.FC<HashTagsProps> = ({
  tags = [],
  onTagClick,
  props,
}) => {
  function handleHashtagClick(tag: string) {
    onTagClick && onTagClick(tag);
  }

  return (
    <div
      {...props}
      className="flex flex-wrap gap-2"
      data-testid="TagsContainer"
    >
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
