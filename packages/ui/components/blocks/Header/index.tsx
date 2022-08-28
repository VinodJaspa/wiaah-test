import React from "react";
import { FaSearch, FaUser, FaHeart, FaAlignJustify } from "react-icons/fa";
import {
  MultiStepDrawer,
  ShoppingCart,
  SelectDropdown,
  Container,
  Step,
  Button,
  LocationIcon,
} from "ui";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ShoppingCartItem } from "types";
import { ShoppingCartItemsState } from "state";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "@chakra-ui/react";
import { useGetServicesCategoriesQuery } from "ui";
import { usePagination } from "hooks";
import { ServiceCategoryType } from "api";
import { useRouting } from "routing";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
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

  const steps: Step[] = Array.isArray(categories)
    ? categories.map((cate, i) => ({
        label: cate.name,
        url: cate.slug,
        steps: [
          {
            label: t("Clothing", "Clothing"),
            url: "/clothing",
            steps: [
              {
                label: t("Women_s", "Womsen's"),
                url: "womens",
                steps: [
                  {
                    label: t("Dresses", "Dreasses"),
                    url: "/dresses",
                    steps: [
                      {
                        label: t("Dresses", "Dresses"),
                        url: "/dresses",
                        steps: [],
                      },
                      {
                        label: t("Shirts", "Shirts"),
                        url: "/shirts",
                      },
                    ],
                  },
                  {
                    label: t("Shirts", "Shidrts"),
                    url: "/shirts",
                  },
                ],
              },
              {
                label: t("Men_s", "Men's"),
                url: "/mens",
              },
            ],
          },
          {
            label: t("Home_&_Living", "Home & Living"),
            url: "/home-and-living",
          },
        ],
      }))
    : [];

  const handleItemDeletion = (item: ShoppingCartItem) => {};

  return (
    <nav className="w-full bg-black">
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
            <MainHeaderSearchBar categories={categories || []} />
            <LocationIcon className="text-white text-4xl" />
          </div>

          <div className="flex text-white">
            <ul className="inline-flex items-center gap-8">
              <li className="flex cursor-pointer items-center text-sm">
                <Link href="/login">
                  <div className="flex items-center gap-4">
                    {t("Sign In")}{" "}
                    <FaUser className="ml-0 inline-flex h-8 w-8" />
                  </div>
                </Link>
              </li>
              <li className="cursor-pointer">
                <FaHeart className="h-8 w-8" />
              </li>
              <ShoppingCart
                items={items}
                onItemDelete={(item) => handleItemDeletion(item)}
              />
            </ul>
          </div>
        </div>
      </Container>

      <div className="flex w-full bg-gray-800 p-4 text-white">
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
                  className="hover:text-primary text-white hover:underline cursor-pointer"
                  key={i}
                >
                  <p>{t(cate.name)}</p>
                </li>
              ))}
          </ul>
          <div className="block md:hidden">
            <MainHeaderSearchBar categories={categories || []} />
          </div>
        </Container>
      </div>
      <MultiStepDrawer
        isOpen={isopen}
        onClose={() => setisopen(false)}
        steps={steps}
      />
    </nav>
  );
};

export const MainHeaderSearchBar: React.FC<{
  categories: ServiceCategoryType[];
}> = ({ categories }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg overflow-hidden max-w-[40rem] justify-items-stretch flex">
      <input
        className="w-60 appearance-none  border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
        placeholder={t("Search")}
      />
      <div className="flex">
        <SelectDropdown
          className="appearance-none hidden sm:block w-full border-l-[1px] border-l-primary border-none border-gray-600 bg-gray-700  px-2.5 text-white outline-none focus:outline-none"
          options={
            Array.isArray(categories)
              ? categories.map((cate, i) => ({
                  name: t(cate.name),
                  value: cate.slug,
                }))
              : []
          }
        />
        <Button className="rounded-none text-xl">
          <FaSearch className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
