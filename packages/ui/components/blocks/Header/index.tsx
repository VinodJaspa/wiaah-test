"use client"
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
  MultiStepDrawer,
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
import { setTestid } from "utils";
import nookies, { deleteCookie } from "cookies-next";
import { ServiceType } from "@features/API";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

export interface HeaderProps {
  token?: string;
}

export const Header: React.FC<HeaderProps> = ({ token }) => {
  const [signedIn, setSignedIn] = React.useState<boolean>(!!token);

  const items = useRecoilValue(ShoppingCartItemsState);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isopen, setIsopen] = React.useState(false);
  const { t } = useTranslation();
  const { page, take } = usePagination();
  const { visit, getQuery } = useRouting();
  const router = useRouter();

  const handleAuth = () => {
    if (!signedIn) {
      router.push('/auth/login');
      return;
    }
    console.log("destroy cookies");
    deleteCookie("jwt");
    deleteCookie("user");
    deleteCookie("userId");
    deleteCookie("userType");
    deleteCookie("userName");
    deleteCookie("userEmail");
    setSignedIn(false);
  };

  const { data: categories } = useGetServicesCategoriesQuery({ page, take });
  const currentSlug = getQuery()?.slug ?? null;
  const [activeSlug, setActiveSlug] = React.useState<string | null>(() => {
    // Initialize from localStorage if available, else fallback to currentSlug
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeSlug") || currentSlug || null;
    }
    return currentSlug || null;
  });

  // Update localStorage whenever activeSlug changes
  React.useEffect(() => {
    if (router.pathname === "/") {
      localStorage.setItem("activeSlug", "All");
    } else if (activeSlug) {
      localStorage.setItem("activeSlug", activeSlug);
    }
  }, [activeSlug, router.pathname]);

  const steps = [
    {
      label: "holidays rentals",
      url: ServiceType.HolidayRentals,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific rental",
          url: "specific_rental",
          steps: [
            { label: "sub category 1", url: "rental_sub_category_1" },
            { label: "sub category 2", url: "rental_sub_category_2" },
            { label: "sub category 3", url: "rental_sub_category_3" },
          ],
        },
      ],
    },
    {
      label: "hotels",
      url: ServiceType.Hotel,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific hotel",
          url: "specific_hotel",
          steps: [
            { label: "sub category 1", url: "hotel_sub_category_1" },
            { label: "sub category 2", url: "hotel_sub_category_2" },
            { label: "sub category 3", url: "hotel_sub_category_3" },
          ],
        },
      ],
    },
    {
      label: "restaurants",
      url: ServiceType.Restaurant,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific restaurant",
          url: "specific_restaurant",
          steps: [
            { label: "sub category 1", url: "restaurant_sub_category_1" },
            { label: "sub category 2", url: "restaurant_sub_category_2" },
            { label: "sub category 3", url: "restaurant_sub_category_3" },
          ],
        },
      ],
    },
    {
      label: "health center",
      url: ServiceType.HealthCenter,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific health center",
          url: "specific_health_center",
          steps: [
            { label: "sub category 1", url: "health_center_sub_category_1" },
            { label: "sub category 2", url: "health_center_sub_category_2" },
            { label: "sub category 3", url: "health_center_sub_category_3" },
          ],
        },
      ],
    },
    {
      label: "vehicle",
      url: ServiceType.Vehicle,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific vehicle",
          url: "specific_vehicle",
          steps: [
            { label: "sub category 1", url: "vehicle_sub_category_1" },
            { label: "sub category 2", url: "vehicle_sub_category_2" },
            { label: "sub category 3", url: "vehicle_sub_category_3" },
          ],
        },
      ],
    },
    {
      label: "beauty center",
      url: ServiceType.BeautyCenter,
      steps: [
        { label: "sub category 1", url: "sub_category_1" },
        { label: "sub category 2", url: "sub_category_2" },
        {
          label: "specific beauty center",
          url: "specific_beauty_center",
          steps: [
            { label: "sub category 1", url: "beauty_center_sub_category_1" },
            { label: "sub category 2", url: "beauty_center_sub_category_2" },
            { label: "sub category 3", url: "beauty_center_sub_category_3" },
          ],
        },
      ],
    },
  ];

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
              onClick={handleAuth}
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
          <ul className="no-scrollBar flex w-full justify-between text-[18px] items-center overflow-x-scroll">
            <li
              id="burger-menu-toggle"
              className="flex cursor-pointer items-center space-x-2 hover:text-primary"
              onClick={() => setIsopen(true)}
            >
              <FaAlignJustify className="h-4 w-4" />
              <span className="inline-flex mt-1">{t("All")}</span>
            </li>

            {!isMobile &&
              Array.isArray(categories) &&
              categories.map((cate, i) => {
                const slug = cate?.slug;
                if (!slug) return null;

                const isActive = slug === activeSlug;

                return (
                  <li
                    key={i}
                    className={`cursor-pointer hover:text-primary ${isActive ? "text-primary font-normal underline" : "text-black"
                      }`}
                    onClick={() => {
                      setActiveSlug(slug); // set local active state
                      router.push(`/search/services/${slug}`, undefined, { scroll: false });


                      // visit((routes) => routes.visitServiceSearch({ slug }));
                    }}
                  >
                    <p>{t(cate.name)}</p>
                  </li>
                );
              })}
          </ul>

          {!isMobile ? null : (
            <div className="hidden md:flex gap-2 items-center">
              <SearchInput />
            </div>
          )}
        </Container>
      </div>
      <MultiStepDrawer
        isOpen={isopen}
        onClose={() => setIsopen(false)}
        steps={steps}
      />
    </nav>
  );
}