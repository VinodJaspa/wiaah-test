import {
  Box,
  IconButton,
  VStack,
  Text,
  FlexProps,
  Flex,
  Divider,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { useResponsive } from "ui";

export interface SellerSideBarProps extends FlexProps {
  links: NavigationLinkType[];
  onLinkClick?: (link: NavigationLinkType) => any;
  activeLink?: string;
  headerElement?: React.ReactElement;
}

export const SellerNavigationSideBar: React.FC<SellerSideBarProps> = ({
  links,
  onLinkClick,
  activeLink,
  headerElement,
  children,
  ...props
}) => {
  function handleLinkClick(link: NavigationLinkType) {
    onLinkClick && onLinkClick(link);
  }
  const { isMobile } = useResponsive();
  return (
    <Flex
      align={"center"}
      bg="white"
      fontSize={"xx-large"}
      direction={isMobile ? "row" : "column"}
      overflowY={"scroll"}
      className={"thinScroll"}
      position={"fixed"}
      borderTopWidth="1px"
      borderTopColor={"gray.300"}
      py="1rem"
      gap={"1rem"}
      left={isMobile ? "0rem" : "1rem"}
      top={!isMobile ? "0rem" : "unset"}
      bottom={isMobile ? "0rem" : "unset"}
      w={isMobile ? "100%" : "auto"}
      zIndex={20}
      {...props}
    >
      <Flex
        w={isMobile ? "100%" : "auto"}
        align={"center"}
        justify={isMobile ? "space-around" : "unset"}
        direction={isMobile ? "row" : "column"}
        gap={isMobile ? "0.5rem" : "1rem"}
        bg="white"
        fontSize={isMobile ? "x-large" : "xx-large"}
        h="100%"
        flexWrap={"wrap"}
      >
        {!isMobile && headerElement && (
          <Box role="NavigationSideBarHeaderContainer">{headerElement}</Box>
        )}
        {links.map((link, i) => (
          <VStack
            role="NavigationSideBarLink"
            onClick={() => handleLinkClick && handleLinkClick(link)}
            key={i}
            spacing={"0rem"}
          >
            <IconButton
              fontSize={"xx-large"}
              colorScheme="gray"
              color="black"
              bgColor="white"
              py="0.5rem"
              aria-label={link.name}
              key={i}
              icon={
                <Icon
                  {...link.size}
                  as={activeLink === link.url ? link.activeIcon : link.icon}
                />
              }
            />
            {!isMobile && (
              <Text
                textTransform={"capitalize"}
                fontWeight={"bold"}
                fontSize="xs"
                role="NavigationSideBarLinkLabel"
              >
                {link.name}
              </Text>
            )}
          </VStack>
        ))}
      </Flex>
      {!isMobile && (
        <>
          <Divider opacity="1" />
          <Box role="NavigationSideBarChildContainer">{children}</Box>
        </>
      )}
    </Flex>
  );
};
