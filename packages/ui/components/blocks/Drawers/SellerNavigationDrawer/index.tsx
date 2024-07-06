import React from "react";
import { SellerDrawerOpenState } from "state";
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { NavigationLinkType } from "types";
import {
  Button,
  Drawer,
  DrawerProps,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
} from "@UI";

export interface SellerNavigationDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {
  links: NavigationLinkType[];
  activeLink?: string;
  onLinkClick?: (link: NavigationLinkType) => any;
  children?: React.ReactNode;
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
      position="left"
      onClose={() => setOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          closeButton={false}
          className="h-20 px-8 border-b-[1px] flex"
        >
          <div className="w-8 h-8">
            <HiMenu className="w-8 h-8 cursor-pointer text-4xl" />
          </div>
          <img className="w-full h-full object-contain" src="/wiaah_logo.png" />
        </DrawerHeader>
        <div className="flex gap-4 overflow-y-scroll h-full flex-col">
          <>
            {links.map((link, i) => (
              <Button
                key={i}
                className="px-0 justify-start text-black bg-white hover:bg-gray-200 active:bg-gray-300"
              >
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
          </>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
