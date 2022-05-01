import { HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { HiShare } from "react-icons/hi";

export const MinimalHeader: React.FC = () => {
  return (
    <HStack
      shadow={"md"}
      p="0.5rem"
      fontSize={"xx-large"}
      w="100%"
      justify={"space-between"}
    >
      <Icon fontSize={"1.3em"} as={ChevronLeftIcon} />
      <Icon as={HiShare} />
    </HStack>
  );
};
