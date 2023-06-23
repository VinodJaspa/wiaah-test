import React from "react";
import { FaSearch, FaAlignJustify } from "react-icons/fa";
import {
  ShoppingCart,
  Container,
  Button,
  LocationIcon,
  useMasterLocationMapModal,
  HeartOutlineIcon,
  ShoppingCartOutlineAltIcon,
  PersonOutlineIcon,
  InputGroup,
  Input,
  HStack,
  useGetMyProfileQuery,
  useUserData,
  ShoppingCartOutlineIcon,
  SearchIcon,
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
import { Category as ServiceCategory } from "@features/Services/Services/types";
import { usePagination } from "hooks";
import { useRouting } from "routing";
import { useBreakpointValue } from "utils";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { data: profile } = useGetMyProfileQuery();

  const items = useRecoilValue(ShoppingCartItemsState);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isopen, setisopen] = React.useState(false);
  const { t } = useTranslation();
  const { page, take } = usePagination();
  const { visit } = useRouting();

  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useGetServicesCategoriesQuery({ page, take });
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

          <div className="hidden md:flex gap-2 items-center">
            <SearchInput />
            {/* <InputGroup>
              <Input placeholder={t("Search product")} />
              <SearchIcon />
            </InputGroup> */}
          </div>

          <HStack className="gap-6">
            <Button
              colorScheme="darkbrown"
              onClick={() =>
                profile
                  ? visit((r) => r.visitLogout())
                  : visit((r) => r.visitSignin())
              }
              className="flex items-center gap-2"
            >
              {profile ? t("Logout") : t("Sign in")}
              <PersonOutlineIcon className="text-xl text-white fill-white stroke-white" />
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
          <div className="block md:hidden">
            <MainHeaderSearchBar categories={serviceCategories || []} />
          </div>
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

export const MainHeaderSearchBar: React.FC<{
  categories: Omit<ServiceCategory, "filters">[];
}> = ({ categories }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg overflow-hidden max-w-[40rem] justify-items-stretch flex">
      <input
        className="w-60 appearance-none  border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
        placeholder={t("Search")}
      />
      <div className="flex">
        {/* <SelectDropdown
          className="appearance-none hidden sm:block w-full border-l-[1px] border-l-primary border-none border-gray-600 bg-gray-700  px-2.5 text-white outline-none focus:outline-none"
          options={
            Array.isArray(categories)
              ? categories.map((cate, i) => ({
                  name: cate.name,
                  value: cate.slug,
                }))
              : []
          }
        /> */}
        <Button className="rounded-none text-xl">
          <FaSearch className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
