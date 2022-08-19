import { HiOutlineMail, HiOutlineUsers, HiMenu } from "react-icons/hi";
import { MdOutlineNotifications } from "react-icons/md";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import {
  Avatar,
  SearchInput,
  FloatingContainer,
  useNewPost,
  SellerDrawerOpenState,
  ShoppingCart,
  NotifiactionsMenu,
  useGeneralSearchModal,
  GeneralSearchModal,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack,
  TranslationText,
} from "ui";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useResponsive, useAccountType } from "hooks";
import { HtmlDivProps, TranslationTextType } from "types";
import { runIfFn } from "utils";
export interface HeaderNavLink {
  link: {
    name: TranslationTextType;
    href: string;
  };
  icon: React.ReactNode;
}
export interface SellerHeaderProps {
  onSearchSubmit?: (searchValue: string) => any;
  props?: HtmlDivProps;
  headerNavLinks: HeaderNavLink[];
}

export const SellerHeader: React.FC<SellerHeaderProps> = ({
  onSearchSubmit,
  props,
  headerNavLinks = [],
}) => {
  const { accountType } = useAccountType();
  const { openModal: openSearchBox } = useGeneralSearchModal();
  const router = useRouter();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const { isMobile } = useResponsive();
  const { OpenModal } = useNewPost();

  return (
    <div
      {...props}
      className={
        "border-b-[1px] border-gray-200 flex justify-between items-center bg-white w-full h-[3.75rem]"
      }
    >
      <div className="flex items-center gap-2 h-full">
        {isMobile && (
          <HiMenu
            className="text-2xl md:text-4xl cursor-pointer mt-3"
            onClick={() => setDrawerOpen(true)}
          />
        )}
        <img className="h-full object-contain" src="/wiaah_logo.png" />
      </div>
      {!isMobile && (
        <GeneralSearchModal>
          <SearchInput innerProps={{ onClick: openSearchBox }} />
        </GeneralSearchModal>
      )}

      <div className="flex items-center gap-4 md:8 mt-3 p-2">
        <FiPlusSquare className="text-xl md:text-4xl" onClick={OpenModal} />
        <FloatingContainer
          items={[
            {
              label: (
                <div className="h-4 w-4 rounded-full flex items-center justify-center text-white bg-primary">
                  4
                </div>
              ),
              bottom: "0.2em",
              right: true,
            },
          ]}
        >
          <NotifiactionsMenu>
            <MdOutlineNotifications className="text-xl md:text-4xl h-[1.2em] w-[1.2em]" />
          </NotifiactionsMenu>
        </FloatingContainer>
        {!isMobile && <HiOutlineUsers className="text-xl md:text-4xl" />}

        <FloatingContainer
          onClick={() => router.push("/chat")}
          items={[
            {
              label: (
                <span className="h-4 w-4 rounded-full flex justify-center items-center text-white bg-primary">
                  4
                </span>
              ),
              bottom: true,
              right: true,
            },
          ]}
        >
          <HiOutlineMail className="text-xl md:text-4xl" />
        </FloatingContainer>
        <ShoppingCart
          items={[
            {
              id: "1",
              name: "product",
              price: 15,
              quantity: 2,
              thumbnail: "/shop.jpeg",
            },
            {
              id: "2",
              name: "product 2",
              price: 40,
              quantity: 1,
              thumbnail: "/shop-2.jpeg",
            },
            {
              id: "3",
              name: "product 3",
              price: 48,
              quantity: 2,
              thumbnail: "/place-1.jpg",
            },
          ]}
        />
        {!isMobile && (
          <Menu>
            <MenuButton>
              <div className="flex flex-col justify-center">
                <Avatar
                  className="h-[2.5em] w-[2.5em] bg-black"
                  showBorder={false}
                  name="wiaah"
                  photoSrc="/wiaah_logo.png"
                />
              </div>
            </MenuButton>
            <MenuList origin="top right">
              {headerNavLinks.length > 0
                ? headerNavLinks.map(({ icon, link }, i) => (
                    <MenuItem onClick={() => router.replace(link.href)}>
                      <HStack>
                        <span className="text-4xl">{runIfFn(icon, {})}</span>
                        <span className="capitalize">
                          <TranslationText translationObject={link.name} />
                        </span>
                      </HStack>
                    </MenuItem>
                  ))
                : null}
            </MenuList>
          </Menu>
        )}
      </div>
    </div>
  );
};
