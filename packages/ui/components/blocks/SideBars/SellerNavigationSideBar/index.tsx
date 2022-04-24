import {
  Box,
  IconButton,
  VStack,
  Text,
  FlexProps,
  Flex,
  Divider,
} from "@chakra-ui/react";
import React, { Children } from "react";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";

export interface SellerSideBarProps extends FlexProps {
  links: NavigationLinkType[];
  onItemClick?: (link: NavigationLinkType, idx: number) => any;
  activeLink?: number;
  headerElement?: React.ReactElement;
}

export const SellerNavigationSideBar: React.FC<SellerSideBarProps> = ({
  links,
  onItemClick,
  activeLink,
  headerElement,
  children,
  ...props
}) => {
  return (
    <Flex
      align={"center"}
      bg="white"
      fontSize={"xx-large"}
      direction={"column"}
      overflowY={"scroll"}
      className={"thinScroll"}
      {...props}
    >
      <Box>{headerElement && headerElement}</Box>
      <VStack spacing={"1rem"} bg="white" fontSize={"xx-large"} h="100%">
        {links.map((link, i) => (
          <VStack spacing={"0rem"}>
            <IconButton
              fontSize={"xx-large"}
              colorScheme="gray"
              color="black"
              bgColor="white"
              py="0.5rem"
              aria-label={link.name}
              key={i}
              onClick={() => onItemClick && onItemClick(link, i)}
              icon={activeLink === i ? link.activeIcon({}) : link.icon({})}
            />
            <Text
              textTransform={"capitalize"}
              fontWeight={"bold"}
              fontSize="xs"
            >
              {link.name}
            </Text>
          </VStack>
        ))}
        <Divider opacity="1" />
        {children}
      </VStack>
    </Flex>
  );
};
