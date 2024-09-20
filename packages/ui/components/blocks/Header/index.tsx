import React from "react";
import { FaAlignJustify } from "react-icons/fa";
import {
  ShoppingCart,
  Container,
  Button,
  HeartOutlineIcon,
  PersonOutlineIcon,
  HStack,
  useGetMyProfileQuery,
  ShoppingCartOutlineIcon,
  SearchInput,
} from "@UI";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ShoppingCartItemsState } from "state";
import { useTranslation } from "react-i18next";
import {
  useGetServicesCategoriesQuery,
  useGetServiceCategoriesQuery,
} from "@UI";
import { usePagination } from "hooks";
import { useRouting } from "routing";
import { setTestid, useBreakpointValue } from "utils";
import * as nookies from "nookies";

export interface HeaderProps {
  token?: string;
}

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const [signedIn, setSignedIn] = React.useState<boolean>(!!token);

  const items = useRecoilValue(ShoppingCartItemsState);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isopen, setisopen] = React.useState(false);
  const { t } = useTranslation();
  const { page, take } = usePagination();
  const { visit } = useRouting();

  const onLogOut = () => {
    console.log("destroy cookies");
    nookies.destroyCookie(null, "auth_token", { path: "/" });
    setSignedIn(false);
  };

  const { data: categories } = useGetServicesCategoriesQuery({ page, take });
  const { data: serviceCategories } = useGetServiceCategoriesQuery();

  return (
    <nav className="w-full bg-white">
      {/* Top Navbar */}

      <Container className="h-[auto]">
        <div className="w-full h-fit flex p-4 gap-4 items-center justify-between">
          <div className="h-12 sm:h-20 cursor-pointer">
            <Link href="/">
              <img
                alt="wiaah_logo"
                src="/wiaah_logo.png"
                className="h-full w-full object-contain"
              />
            </Link>
          </div>

          {isMobile ? null : (
            <div className="hidden md:flex gap-2 items-center">
              <SearchInput />
            </div>
          )}

          <HStack className="gap-6">
            <Button
              {...setTestid("auth-btn")}
              colorScheme={isMobile ? "white" : "darkbrown"}
              onClick={onLogOut}
              className="flex sm:text-sm items-center gap-2"
            >
              {signedIn ? t("Logout") : t("Sign in")}
              <PersonOutlineIcon className="text-xl sm:text-lg text-white fill-white stroke-white" />
            </Button>
            <button onClick={() => visit((r) => r.visitMarketSavedItems())}>
              <HeartOutlineIcon className="text-xl" />
            </button>

            <ShoppingCart>
              <ShoppingCartOutlineIcon className="text-2xl" />
            </ShoppingCart>
          </HStack>
        </div>
      </Container>

      <div className="flex w-full bg-white p-4 text-black">
        <Container className="flex">
          <ul className="no-scrollBar inline-flex w-full items-center space-x-10 overflow-x-scroll">
            <li
              id="burger-menu-toggle"
              className="flex cursor-pointer items-center space-x-2"
              onClick={() => {
                setisopen(true);
              }}
            >
              <FaAlignJustify className="h-4 w-4" />
              <span className="inline-flex">{t("All")}</span>
            </li>
            {!isMobile &&
              Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((cate, i) => (
                <li
                  onClick={() =>
                    visit((routes) => routes.visitServiceSearch(cate))
                  }
                  className="hover:text-primary text-black hover:underline cursor-pointer"
                  key={i}
                >
                  <p>{t(cate.name)}</p>
                </li>
              ))}
          </ul>
          {!isMobile ? null : (
            <div className="hidden md:flex gap-2 items-center">
              <SearchInput />
            </div>
          )}
        </Container>
      </div>
      {/* <MultiStepDrawer
        isOpen={isopen}
        onClose={() => setisopen(false)}
        steps={steps}
      /> */}
    </nav>
  );
};
