import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  HStack,
  Icon,
  Text,
  Image,
  DrawerProps,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { SellerDrawerOpenState } from "ui/state";
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { useResponsive } from "ui";

export interface SellerNavigationDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {
  links: NavigationLinkType[];
  activeLink?: string;
  onLinkClick?: (link: NavigationLinkType) => any;
}

export const SellerNavigationDrawer: React.FC<SellerNavigationDrawerProps> = ({
  links = [],
  activeLink,
  onLinkClick,
  children,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const [isOpen, setOpen] = useRecoilState(SellerDrawerOpenState);
  return (
    <Drawer
      {...props}
      isOpen={isOpen}
      placement="left"
      size={isMobile ? "full" : "xs"}
      onClose={() => setOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader px="2rem" h="5rem" borderBottomWidth={"1px"}>
          <HStack spacing="2rem" minW={"fit-content"} h="100%">
            <Icon
              onClick={() => setOpen(false)}
              cursor={"pointer"}
              fontSize={"xx-large"}
              as={HiMenu}
            />
            <Image h="100%" objectFit={"contain"} src="/wiaah_logo.png" />
          </HStack>
        </DrawerHeader>
        <DrawerBody overflowY={"scroll"} className="thinScroll" px="0px">
          <Flex gap="1rem" direction={"column"}>
            {links.map((link, i) => (
              <Button
                px="0"
                justifyContent={"start"}
                color="black"
                bgColor={"white"}
                colorScheme={"gray"}
              >
                <HStack
                  key={i}
                  px="2rem"
                  spacing="2rem"
                  py="0.5rem"
                  w="100%"
                  onClick={() => onLinkClick && onLinkClick(link)}
                >
                  <Icon
                    w={"2rem"}
                    h={"2rem"}
                    fontSize={"xx-large"}
                    as={activeLink === link.url ? link.activeIcon : link.icon}
                  />
                  <Text
                    textTransform={"capitalize"}
                    fontWeight={"semibold"}
                    fontSize="lg"
                  >
                    {link.name}
                  </Text>
                </HStack>
              </Button>
            ))}
            {children}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
