import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerProps,
} from "@chakra-ui/react";
import React from "react";
import { SellerDrawerOpenState } from "ui/state";
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { useResponsive, Button } from "ui";

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
          <div className="flex gap-8 items-center min-w-fit h-full">
            <HiMenu className="cursor-pointer text-4xl" />
            <img className="h-full object-contain" src="/wiaah_logo.png" />
          </div>
        </DrawerHeader>
        <DrawerBody overflowY={"scroll"} className="thinScroll" px="0px">
          <div className="flex gap-4 flex-col">
            {links.map((link, i) => (
              <Button className="px-0 justify-start text-black bg-white hover:bg-gray-200 active:bg-gray-300">
                <div
                  className="px-8 flex gap-8 items-center py-2 w-full"
                  key={i}
                  onClick={() => onLinkClick && onLinkClick(link)}
                >
                  <span className="w-8 h-8 text-4xl">
                    {activeLink === link.url ? link.activeIcon : link.icon}
                  </span>

                  <span className="capitalize font-semibold text-xl">
                    {link.name}
                  </span>
                </div>
              </Button>
            ))}
            {children}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
