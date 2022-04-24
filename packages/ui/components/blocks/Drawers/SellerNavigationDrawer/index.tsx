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
import { IconType } from "react-icons";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";

export interface SellerNavigationDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {
  links: NavigationLinkType[];
  activeLink?: number;
  onLinkClick?: (link: NavigationLinkType, idx: number) => any;
}

export const SellerNavigationDrawer: React.FC<SellerNavigationDrawerProps> = ({
  links = [],
  activeLink,
  onLinkClick,
  children,
  ...props
}) => {
  const [isOpen, setOpen] = useRecoilState(SellerDrawerOpenState);
  return (
    <Drawer
      {...props}
      isOpen={isOpen}
      placement="left"
      size={"xs"}
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
                  onClick={() => onLinkClick && onLinkClick(link, i)}
                >
                  <Icon
                    w={"2rem"}
                    h={"2rem"}
                    fontSize={"xx-large"}
                    as={activeLink === i ? link.activeIcon : link.icon}
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
