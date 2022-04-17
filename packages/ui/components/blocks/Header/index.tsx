import React from "react";
import { SidebarContext } from "ui/components/helpers";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaAlignJustify,
  FaChevronDown,
} from "react-icons/fa";
import { Sidebar, ShoppingCart } from "ui";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ShoppingCartItem } from "ui/types/shoppingCart/shoppingCartItem.interface";
import { ShoppingCartItemsState } from "ui/state";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const items = useRecoilValue(ShoppingCartItemsState);
  const sidebar = React.useContext(SidebarContext);
  const { t } = useTranslation();
  let menup = [
    {
      label: t("Clothing", "Clothing"),
      url: "",
      children: [
        {
          label: t("Women_s", "Women's"),
          url: "",
          children: [
            {
              label: t("Dresses", "Dresses"),
              url: "/category/dresses",
            },
            {
              label: t("Shirts", "Shirts"),
              url: "/category/shirts",
            },
          ],
        },
        {
          label: t("Men_s", "Men's"),
          url: "/category/mens",
        },
      ],
    },
    {
      label: t("Home_&_Living", "Home & Living"),
      url: "/category/home-and-living",
    },
  ];

  const handleItemDeletion = (item: ShoppingCartItem) => {};

  return (
    <>
      <nav className="hidden w-full lg:block">
        {/* Top Navbar */}
        <div className="flex w-full items-center justify-between bg-black px-6 py-2">
          <div className="h-20 w-44 cursor-pointer">
            <Link href="/">
              <img
                alt="wiaah_logo"
                src="/wiaah_logo.png"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
          <div className="flex h-12">
            <input
              className="w-60 appearance-none rounded-l-lg border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
              placeholder={t("Search", "Search")}
            />
            <label htmlFor="Category" className="relative flex">
              <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
              <select
                className="w-60 appearance-none border-l border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none"
                placeholder={t("Category", "Category")}
              >
                <option>{t("Category", "Category")}</option>
                <option>{t("Dress", "Dress")}</option>
                <option>{t("Jewelry", "Jewelry")}</option>
                <option>{t("Clothing", "Clothing")}</option>
                <option>{t("Shoes", "Shoes")}</option>
              </select>
            </label>
            <button className="rounded-r-lg bg-green-400 px-2.5 py-1.5">
              <FaSearch className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="flex text-white">
            <ul className="inline-flex items-center gap-4">
              <li className="flex cursor-pointer items-center text-sm">
                <Link href="/login">
                  <div className="flex items-center gap-2">
                    {t("Sign_In", "Sign In")}{" "}
                    <FaUser className="ml-0 inline-flex h-6 w-6" />
                  </div>
                </Link>
              </li>
              <li className="cursor-pointer">
                <FaHeart className="h-6 w-6" />
              </li>
              <ShoppingCart
                items={items}
                onItemDelete={(item) => handleItemDeletion(item)}
              />
            </ul>
          </div>
        </div>

        <div className="flex w-full bg-gray-800 px-6 py-4 text-white">
          <ul className="inline-flex items-center space-x-10">
            <li
              id="burger-menu-toggle"
              className="flex cursor-pointer items-center space-x-2"
              onClick={() => {
                sidebar?.toggleVisibility();
              }}
            >
              <FaAlignJustify className="h-4 w-4" />
              <span className="inline-flex">{t("All", "All")}</span>
            </li>
            {[...Array(1)].map((_, i: number) => (
              <React.Fragment key={i}>
                <li className="cursor-pointer">{t("Shoes", "Shoes")}</li>
                <li className="cursor-pointer">{t("Jewelry", "Jewelry")}</li>
                <li className="cursor-pointer">{t("Clothing", "Clothing")}</li>
                <li className="cursor-pointer">{t("Shoes", "Shoes")}</li>
                <li className="cursor-pointer">
                  {t("Accessories", "Accessories")}
                </li>
                <li className="cursor-pointer">{t("Shoes", "Shoes")}</li>
                <li className="cursor-pointer">{t("Jewelry", "Jewelry")}</li>
                <li className="cursor-pointer">{t("Clothing", "Clothing")}</li>
                <li className="cursor-pointer">{t("Shoes", "Shoes")}</li>
                <li className="cursor-pointer">
                  {t("Accessories", "Accessories")}
                </li>
                <li className="cursor-pointer">{t("Shoes", "Shoes")}</li>
                <li className="cursor-pointer">
                  {t("Accessories", "Accessories")}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="block w-full space-y-6 bg-black p-6 lg:hidden">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="h-16 cursor-pointer text-lg font-black text-green-300">
              <Link href="/">
                <img
                  alt="wiaah_logo"
                  src="/wiaah_logo.png"
                  className="h-full"
                />
              </Link>
            </p>
          </div>
          <div className="flex">
            <ul className="inline-flex space-x-4 text-white">
              <li className="cursor-pointer">
                <FaHeart className="h-5 w-5" />
              </li>
              <li className="relative flex cursor-pointer">
                <FaShoppingBag className="h-5 w-5" />
                <div className="absolute -bottom-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-xs">
                  3
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex h-12 w-full">
          <div className="flex items-center pr-5">
            <FaAlignJustify
              className="h-5 w-5 cursor-pointer text-white"
              onClick={() => {
                sidebar?.toggleVisibility();
              }}
            />
          </div>
          <input
            className="min-w-min grow appearance-none rounded-l-lg border-r border-gray-600 bg-gray-700 px-2.5 py-1.5 text-white focus:outline-none md:w-72"
            placeholder={t("Search", "Search")}
          />
          <button className="rounded-r-lg bg-green-400 px-2.5 py-1.5">
            <FaSearch className="h-5 w-5 text-white" />
          </button>
        </div>
      </nav>

      <Sidebar menu={menup} />
    </>
  );
};
