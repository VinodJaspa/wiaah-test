import React from "react";
import { t } from "i18next";
import { SidebarContext } from "ui/components/helpers";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaAlignJustify,
  FaChevronDown,
} from "react-icons/fa";
import { MultiStepDrawer, ShoppingCart, SelectDropdown, Container } from "ui";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ShoppingCartItem } from "ui/types/shoppingCart/shoppingCartItem.interface";
import { ShoppingCartItemsState } from "ui/state";
import { useTranslation } from "react-i18next";
import {
  Flex,
  Link as ChakraLink,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "types/sharedTypes/misc/NavLink";
import { Step } from "../Drawers";

export interface HeaderProps {
  categories: NavLink[];
}

export const Header: React.FC<HeaderProps> = ({ categories }) => {
  const items = useRecoilValue(ShoppingCartItemsState);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isopen, setisopen] = React.useState(false);
  const { t } = useTranslation();

  const steps: Step[] = categories.map((cate, i) => ({
    label: cate.name.fallbackText,
    url: cate.destination,
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
  }));

  const handleItemDeletion = (item: ShoppingCartItem) => {};

  return (
    <nav className="w-full bg-black">
      {/* Top Navbar */}

      <Container>
        <div className="w-full h-fit yp-4 gap-4 items-center justify-between flex-col lg:flex-row">
          <div className="h-20 cursor-pointer">
            <Link href="/">
              <img
                alt="wiaah_logo"
                src="/wiaah_logo.png"
                className="h-full w-full object-contain"
              />
            </Link>
          </div>

          <div className="border-primary rounded-lg border-[1px] flex-col sm:flex-row max-w-[40rem] justify-items-stretch">
            <input
              className="w-60 appearance-none rounded-l-lg border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
              placeholder={t("Search", "Search")}
            />

            <SelectDropdown
              rounded={"none"}
              // color="white"
              borderColor="primary.main"
              borderLeftWidth={"1px"}
              maxW={"max-content"}
              className="appearance-none border-none border-gray-600 bg-gray-700  px-2.5 text-white outline-none focus:outline-none"
              // className="w-60 border-gray-600"
              textTransform={"capitalize"}
              options={categories.map((cate, i) => ({
                name: t(cate.name.translationKey, cate.name.translationKey),
                value: cate.name.fallbackText,
              }))}
            />
            <label htmlFor="Category" className="relative flex">
              <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            </label>
            <Button
              roundedLeft={"0px"}
              bgColor={"primary"}
              fontSize="lg"
              p="0.5rem"
            >
              <FaSearch className="h-5 w-5 text-white" />
            </Button>
          </div>

          <div className="flex text-white">
            <ul className="inline-flex items-center gap-8">
              <li className="flex cursor-pointer items-center text-sm">
                <Link href="/login">
                  <div className="flex items-center gap-4">
                    {t("Sign_In", "Sign In")}{" "}
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
      <div className="flex w-full bg-gray-800 px-6 py-4 text-white">
        <Container>
          <ul className="no-scrollBar inline-flex w-full items-center space-x-10 overflow-x-scroll">
            <li
              id="burger-menu-toggle"
              className="flex cursor-pointer items-center space-x-2"
              onClick={() => {
                setisopen(true);
              }}
            >
              <FaAlignJustify className="h-4 w-4" />
              <span className="inline-flex">{t("All", "All")}</span>
            </li>
            {!isMobile &&
              categories.length > 0 &&
              categories.map((cate, i) => (
                <li key={i}>
                  <ChakraLink
                    textTransform={"capitalize"}
                    colorScheme={"primary"}
                    _hover={{ color: "primary.main" }}
                    as={Link}
                    href={cate.destination}
                  >
                    {t(cate.name.translationKey, cate.name.fallbackText)}
                  </ChakraLink>
                </li>
              ))}
          </ul>
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
