import { Flex, HStack, Avatar, Icon, Text, IconButton } from "@chakra-ui/react";
import { t } from "i18next";
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
        <Avatar name={creatorName} src={creatorPhoto} />
        <Text fontWeight={"bold"}>{creatorName}</Text>
      </HStack>
      <Flex direction={"column"} align="end">
        <IconButton
          _focus={{ ring: "0px" }}
          _hover={{ bg: "transparent" }}
          aria-label="see more"
          fill={"primary.main"}
          fontSize="xx-large"
          color="primary.main"
          bg="transparent"
          icon={<HiDotsHorizontal />}
        />
        <Text px="1" color={"gray"}>
          {since.value} {since.timeUnit}
        </Text>
      </Flex>
    </Flex>
  );
};
