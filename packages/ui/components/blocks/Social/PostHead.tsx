import { Flex, HStack, Avatar, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDateDiff } from "../../../Hooks";

export interface PostHeadProps {
  creatorName: string;
  creatorPhoto: string;
  createdAt: string;
}

export const PostHead: React.FC<PostHeadProps> = ({
  creatorName,
  createdAt,
  creatorPhoto,
}) => {
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();
  return (
    <Flex w="100%" align={"center"} justify={"space-between"}>
      <HStack>
        <Avatar
          data-testid="PostCreatorThumbnail"
          bgColor={"black"}
          name={creatorName}
          src={creatorPhoto}
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
        <Text data-testid="PostCreatedSince" px="1" color={"gray"}>
          {since.value} {since.timeUnit}
        </Text>
      </Flex>
    </Flex>
  );
};
