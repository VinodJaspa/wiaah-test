import { Wrap, WrapItem, Text, WrapProps } from "@chakra-ui/react";
import React from "react";

export interface HashTagsProps {
  tags: string[];
  color?: string;
  onTagClick?: (tag: string) => void;
  style?: WrapProps;
}

export const HashTags: React.FC<HashTagsProps> = ({
  tags,
  color = "lightblue",
  onTagClick,
  style,
}) => {
  function handleHashtagClick(tag: string) {
    onTagClick && onTagClick(tag);
  }

  return (
    <Wrap {...style} data-testid="TagsContainer">
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
