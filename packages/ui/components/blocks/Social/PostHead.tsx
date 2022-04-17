import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useStory } from "ui/Hooks";
import { DisplayPostedSince, Avatar } from "ui";

export interface PostHeadProps {
  creatorName: string;
  creatorPhoto: string;
  createdAt: string;
  newStory?: boolean;
  functional?: boolean;
  onProfileClick?: () => any;
}

export const PostHead: React.FC<PostHeadProps> = ({
  creatorName,
  createdAt,
  creatorPhoto,
  newStory,
  functional,
  onProfileClick,
}) => {
  const { OpenStories } = useStory();

  function handleOpenStories() {
    if (functional) {
      OpenStories();
    }
    onProfileClick && onProfileClick();
  }

  return (
    <Flex w="100%" align={"center"} justify={"space-between"}>
      <HStack>
        <Avatar
          onClick={handleOpenStories}
          name={creatorName}
          photoSrc={creatorPhoto}
          newStory={newStory && functional}
        />
        <Text data-testid="PostCreatorName" fontWeight={"bold"}>
          {creatorName}
        </Text>
      </HStack>
      <Flex direction={"column"} align="end">
        <Icon
          fontSize="xx-large"
          color="primary.main"
          cursor={"pointer"}
          as={HiDotsHorizontal}
        />
        <DisplayPostedSince since={createdAt} />
      </Flex>
    </Flex>
  );
};
