import { HiMenu } from "react-icons/hi";
import React from "react";
import {
  Avatar,
  SearchInput,
  WavingHand,
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
  LocationIconButton,
  BellOutlineIcon,
  MessageOutlineIcon,
  SquarePlusOutlineIcon,
  useUserData,
  AddNewPostModal,
  useMasterLocationMapModal,
} from "@UI";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useResponsive } from "hooks";
import { HtmlDivProps, TranslationTextType } from "types";
import { runIfFn } from "utils";
import { useTranslation } from "react-i18next";
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
  const { SearchForLocations } = useMasterLocationMapModal();
  const { user } = useUserData();
  const { openModal: openSearchBox } = useGeneralSearchModal();
  const router = useRouter();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const { isMobile } = useResponsive();
  const { OpenModal } = useNewPost();
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={
        "flex justify-between items-center bg-white w-full h-[3.75rem]"
      }
    >
      <div className="flex items-center gap-2 h-full">
        {isMobile && (
          <HiMenu
            className="text-2xl md:text-4xl cursor-pointer mt-3"
            onClick={() => setDrawerOpen(true)}
          />
        )}
        <div className="flex items-center gap-4">
          <WavingHand className="text-[2rem]" />
          <div className="flex flex-col">
            <p>
              {t("Hello")} {user?.name}
            </p>
            <p className="font-bold text-lg">{t("Welcome Back")}</p>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="flex items-center gap-2">
          <GeneralSearchModal>
            <SearchInput innerProps={{ onClick: openSearchBox }} />
          </GeneralSearchModal>
          <LocationIconButton
            colorScheme="lightGray"
            outline
            iconProps={{
              className: "fill-transparent",
            }}
            onClick={() => SearchForLocations([])}
            className="text-icon fill-transparent text-lightBlack"
          />
        </div>
      )}

      <div className="flex items-center gap-8 p-2">
        {/* {isMobile ? ( */}
        <>
          <SquarePlusOutlineIcon
            className="text-icon text-lightBlack"
            onClick={() => OpenModal()}
          />
          <AddNewPostModal />
        </>
        {/* ) : null} */}
        <div className="relative">
          <NotifiactionsMenu>
            <BellOutlineIcon className="text-icon text-lightBlack" />
          </NotifiactionsMenu>
          <div className="h-4 w-4 text-[0.5rem] border-2 border-white absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full flex items-center justify-center text-white bg-primary">
            4
          </div>
        </div>

        <div className="relative" onClick={() => router.push("/chat")}>
          <span className="h-4 w-4 text-[0.5rem]  border-2 border-white rounded-full absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 flex justify-center items-center text-white bg-primary">
            4
          </span>
          <MessageOutlineIcon className="text-lightBlack text-icon" />
        </div>
        <div className="text-lightBlack">
          <ShoppingCart />
        </div>
        {!isMobile && (
          <Menu>
            <MenuButton>
              <div className="flex flex-col justify-center">
                <Avatar
                  className=""
                  showBorder={false}
                  name="wiaah"
                  src="/wiaah_logo.png"
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
