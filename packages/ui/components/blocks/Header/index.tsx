"use-client"
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
import { startTransition } from "react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { useLogoutMutation } from "@features/Accounts/services/useLogout";

import { useSetRecoilState } from 'recoil';
import { useRouter } from "next/router";
import { isUserLoggedIn } from "state";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import { Router } from "express";
export interface HeaderProps {
  token?: string;
}

export const Header: React.FC<HeaderProps> = ({ token }) => {


  const { mutate: logout, isLoading } = useLogoutMutation();
  const items = useRecoilValue(ShoppingCartItemsState);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { visit, getCurrentPath } = useRouting();
  const [isopen, setIsopen] = React.useState(false);
  const { t } = useTranslation();
  const { page, take } = usePagination();
  const router = useRouter();
  const handleOpertion = () => {

    if (loggedIn) {
      logout(undefined, {
        onSuccess: () => {
          // You may still want to manually clear client-side localStorage/cookies if needed
          setLoginState(false);
          // window.location.href = "/";
        },
        onError: (err) => {
          console.error("Logout failed", err);
        },
      });
    }
    else {
      router.push("auth/login")
    }

  };
  const [loggedIn, setLoginState] = useRecoilState(isUserLoggedIn);

  // ✅ Update Recoil state if token is passed
  React.useEffect(() => {
    if (!loggedIn) {
      setLoginState(false); // only set if not already true
    }
  }, [token, loggedIn, setLoginState]);


  const { data: categories } = useGetServicesCategoriesQuery({ page, take });

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
              <SearchBoxInner placeholder="Search products.." />
            </div>
          )}

          <HStack className="gap-6">
            <Button
              {...setTestid("auth-btn")}
              colorScheme={isMobile ? "white" : "darkbrown"}
              onClick={handleOpertion}
              className="flex sm:text-sm items-center gap-2"
            >
              {loggedIn ? t("Logout") : t("Sign in")}
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



      <CategoryTabs categories={categories} isMobile={isMobile} setIsopen={setIsopen} />
      <MultiStepDrawer
        isOpen={isopen}
        onClose={() => setIsopen(false)}
        steps={steps}
      />
    </nav>
  );
};


// interface Category {
//   name: string;
//   slug: string;
// }

// interface CategoryTabsProps {
//   categories: Category[];
//   isMobile: boolean;
//   setIsopen: any;

// }

// export const CategoryTabs: React.FC<CategoryTabsProps> = ({
//   categories,
//   isMobile,
//   setIsopen

// }) => {
//   const [activeIndex, setActiveIndex] = React.useState<number>(0);
//   const router = useRouter();
//   console.log(categories, "categories")
//   const { t } = useTranslation();
//   const handleClick = (index: number, cate?: Category) => {

//     if (cate) {
//       setActiveIndex(index);
//       // window.location.href = cate.slug;
//       router.push(`/${cate.slug}`);
    
//     }
//   };
 
//   React.useEffect(() => {
//     const handleRouteChange = (url: string) => {
//       const idx = categories.findIndex(c => `/${c.slug}` === url);
//       if (idx !== -1) {
//         setActiveIndex(idx + 1); // +1 since 0 = "All"
//       }
//     };
  
//     router.events.on("routeChangeComplete", handleRouteChange);
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [categories, router]);
//   return (
//     <div className="w-full bg-white py-2 text-black border-b border-gray-200">
//       <Container className="flex w-full items-center">
//         <ul className="flex w-auto space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide relative">
//           {/* "All" tab */}
//           <li
//             className="relative"
//             onClick={() => setIsopen(true)}
//           >
//             <button
//               className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${activeIndex === 0 ? "text-primary" : "text-gray-700 hover:text-primary"
//                 }`}
//             >
//               <div className="flex items-center gap-1">
//                 <FaAlignJustify className="h-4 w-4" />
//                 <span>{t("All")}</span>
//               </div>
//             </button>
//             {/* Animated underline */}
//             {activeIndex === 0 && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all"></span>
//             )}
//           </li>

//           {/* Category tabs */}
//           {Array.isArray(categories) &&
//             categories.length > 0 &&
//             categories.map((cate, i) => (
//               <li key={i + 1} className="relative" onClick={() => handleClick(i + 1, cate)}>
//                 <button
//                   className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${activeIndex === i + 1
//                     ? "text-primary"
//                     : "text-gray-700 hover:text-primary"
//                     }`}
//                 >
//                   {t(cate.name).charAt(0).toUpperCase() + t(cate.name).slice(1)}
//                 </button>
//                 {activeIndex === i + 1 && (
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all"></span>
//                 )}
//               </li>
//             ))}
//         </ul>

//         {/* Search box for mobile */}
//         {isMobile && (
//           <div className="ml-auto flex gap-2 items-center">
//             <SearchBoxInner placeholder="Search products.." />
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };


interface Category {
  name: string;
  slug: string;
}

interface CategoryTabsProps {
  categories: Category[];
  isMobile: boolean;
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  isMobile,
  setIsopen,
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [underlineStyle, setUnderlineStyle] = React.useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const router = useRouter();
  const { t } = useTranslation();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // 🔹 Sync active tab with URL
  React.useEffect(() => {
    if (router.asPath === "/") {
      setActiveIndex(0);
    } else {
      const idx = categories.findIndex(
        (c) => `/${c.slug}`.toLowerCase() === router.asPath.toLowerCase()
      );
      if (idx !== -1) {
        setActiveIndex(idx + 1); // +1 because "All" is index 0
      }
    }
  }, [router.asPath, categories]);

  // 🔹 Update underline position & size when activeIndex changes
  React.useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeIndex, categories]);

  const handleClick = (index: number, cate?: Category) => {
    if (cate) {
      router.push(`/${cate.slug}`).then(() => {
        setActiveIndex(index);
      });
    } else {
      setIsopen(true);
      setActiveIndex(0);
    }
  };

  return (
    <div className="w-full bg-white py-2 text-black border-b border-gray-200">
      <Container className="flex w-full items-center relative">
        <ul
          role="tablist"
          className="flex w-auto space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide relative"
        >
          {/* "All" tab */}
          <li role="presentation" className="relative">
            <button
              // ref={(el) => (tabRefs.current[0] = el)}
              role="tab"
              aria-selected={activeIndex === 0}
              onClick={() => handleClick(0)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${
                activeIndex === 0
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-1">
                <FaAlignJustify className="h-4 w-4" />
                <span>{t("All")}</span>
              </div>
            </button>
          </li>

          {/* Category tabs */}
          {Array.isArray(categories) &&
            categories.map((cate, i) => (
              <li
                key={i + 1}
                role="presentation"
                className="relative"
                onClick={() => handleClick(i + 1, cate)}
              >
                <button
                // ref={(el) => (buttonRefs.current[index] = el!)}

                  role="tab"
                  aria-selected={activeIndex === i + 1}
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${
                    activeIndex === i + 1
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t(cate.name).charAt(0).toUpperCase() +
                    t(cate.name).slice(1)}
                </button>
              </li>
            ))}
        </ul>

        {/* 🔥 Single animated underline */}
        <span
          className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        ></span>

        {/* Search box for mobile */}
        {isMobile && (
          <div className="ml-auto flex gap-2 items-center">
            <SearchBoxInner placeholder="Search products.." />
          </div>
        )}
      </Container>
    </div>
  );
};
