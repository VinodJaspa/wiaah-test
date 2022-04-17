import { Wrap, WrapItem, Text } from "@chakra-ui/react";
import React from "react";

export interface HashTagsProps {
  tags: string[];
  color?: string;
  onTagClick?: (tag: string) => void;
}

export const HashTags: React.FC<HashTagsProps> = ({
  tags,
  color = "lightblue",
  onTagClick,
}) => {
  function handleHashtagClick(tag: string) {
    onTagClick && onTagClick(tag);
  }

  return (
    <Wrap data-testid="TagsContainer">
      {tags.map((tag, i) => (
        <WrapItem key={i}>
          <Text
            data-testid="Tag"
            onClick={() => handleHashtagClick(tag)}
            cursor={"pointer"}
            fontWeight={"semibold"}
            color={color}
          >
            #{tag}
          </Text>
        </WrapItem>
      ))}
    </Wrap>
  );
};
