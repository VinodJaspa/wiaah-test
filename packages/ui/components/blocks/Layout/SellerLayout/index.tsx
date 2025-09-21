'use client';
import { SellerDrawerOpenState } from "@src/state";
import { sidebarState } from "@src/state/Recoil/sidebarState";

import {
  Container,
  DiscoverHeader,
  Divider,
  HStack,
  HashtagIcon,
  HeaderNavLink,
  LocationButton,
  MinimalHeader,
  Root,
  ScrollableContainer,
  SellerHeader,
  SellerNavigationSideBar,
  SocialLayout,
  UsersProfiles,
  useGetDiscoverHashtags,
  useGetRecentStories,
  usePaginationControls,
} from "@UI";
import { useAccountType, useResponsive } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { FaThList } from "react-icons/fa";
import { HiMenu, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getRouting, useRouting } from "routing";
import { HtmlDivProps, NavigationLinkType } from "types";

export const usersProfilesPlaceHolder = [
  {
    id: "1",
    name: "Wiaah",
    photo: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
    profession: "Hotel Manager",
  },
  {
    id: "2",
    name: "Jack",
    photo: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
    profession: "Bartender",
  },
  {
    id: "3",
    name: "sam",
    photo: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
    profession: "Musician",
  },
  {
    id: "4",
    name: "Wiaah",
    photo: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
    profession: "Market Vendor",
  },
  {
    id: "5",
    name: "Jack",
    photo: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
    profession: "Painter",
  },
  {
    id: "6",
    name: "Wiaah",
    photo: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
    profession: "Hotel Manager",
  },
  {
    id: "7",
    name: "Jack",
    photo: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
    profession: "Bartender",
  },
  {
    id: "8",
    name: "sam",
    photo: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
    profession: "Musician",
  },
  {
    id: "9",
    name: "Wiaah",
    photo: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
    profession: "Market Vendor",
  },
  {
    id: "10",
    name: "Jack",
    photo: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
    profession: "Painter",
  },
];
export const placesPlaceholder: string[] = [
  "shop",
  "hotel",
  "restaurant",
  "health center",
  "vehicle",
  "shop",
  "hotel",
  "restaurant",
  "health center",
  "vehicle",
];

export const hashtagsPlaceholder: string[] = [
  "Fashion",
  "Gaming",
  "Food",
  "Sports",
  "Relaxing",
  "Fashion",
  "Gaming",
  "Food",
  "Sports",
  "Relaxing",
];
export type HeadersTypes = "main" | "discover" | "minimal";

export interface SellerLayoutProps {
  header?: HeadersTypes;
  sideBar?: boolean;
  containerProps?: HtmlDivProps;
  noContainer?: boolean;
  children: React.ReactNode;
  accountType?: "buyer" | "seller";
  showMobileHeader?: boolean;
  type?: string;
}

export const SellerLayout: React.FC<SellerLayoutProps> = ({
  children,
  header = "main",
  containerProps,
  sideBar,
  showMobileHeader = false,

  noContainer = false,
  type,
}) => {
  const { accountType } = useAccountType();
  console.log(accountType, "accountType");

  const { isMobile } = useResponsive();
  // const [isSidebar, setSidebar] = React.useState(true);
  const { getCurrentPath } = useRouting();

  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const headerHeight = headerRef?.current?.offsetHeight;
  const router = useRouter();
  const route =
    router && typeof router.pathname === "string"
      ? router.pathname.split("/")[1]
      : "";
  const handleLinkClick = (link: NavigationLinkType) => {
    const path = link.url;


    // Full reload if absolutely needed (usually not recommended in SPA)
    // window.location.href = path;
    // router.push

    setDrawerOpen(false);
  };

  const [isSidebar, setSidebar] = useRecoilState(sidebarState);
  // console.log(isSidebar, "isSidebar");
  //Set the header type
  //Set header
  let stored: string | null = null;
  const { pagination: storiesPagination } = usePaginationControls();

  // Graphql is not ready yet
  const { data: _stories } = useGetRecentStories({
    pagination: storiesPagination,
  });

  const stories = FAKE_STORIES;
  const { pagination: hashtagPagi } = usePaginationControls();
  const { data: hashtags } = useGetDiscoverHashtags({
    pagination: hashtagPagi,
  });

  const showHeader = !isMobile || getCurrentPath() === "/";
  //Todo -:

  return (
    <Root>
      <SocialLayout>
        {isSidebar && (
          <SellerNavigationSideBar

            headerElement={
              <HiMenu cursor={"pointer"} onClick={() => setDrawerOpen(true)} />
            }
            onLinkClick={handleLinkClick}
            activeLink={route}
          >
            <div className="flex flex-col gap-4">
              <UsersProfiles
                maxNarrowItems={5}
                users={
                  stories?.map((v) => ({
                    id: v.userId,
                    profession: v.user?.profile?.profession || "",
                    name: v.user?.profile?.username || "",
                    userPhotoSrc: v.user?.profile?.photo || "",
                  })) || []
                }
              />
              {stories && stories.length > 0 ? <Divider /> : null}
              <div className="text-white flex flex-col gap-4 ">
                <ScrollableContainer
                  containerProps={{ className: "gap-4" }}
                  autoShowAll
                  maxInitialItems={5}
                >
                  {placesPlaceholder.map((place, i) => (
                    <LocationButton
                      iconProps={{ className: "text-black" }}
                      name={place}
                      key={i}
                    />
                  ))}
                </ScrollableContainer>
              </div>
              <Divider />
              <ScrollableContainer
                containerProps={{ className: "gap-4" }}
                autoShowAll
                maxInitialItems={5}
              >
                {hashtags?.map((tag, i) => (
                  <HStack className="text-white gap-[1rem]" key={i}>
                    <HashtagIcon className="p-2 text-3xl rounded-full bg-white" />
                    <p>{tag.tag}</p>
                  </HStack>
                )) || []}
              </ScrollableContainer>
            </div>
          </SellerNavigationSideBar>
        )}
        <Container
          noContainer={true}
          className={`${isMobile ? "" : isSidebar ? "pl-56 pr-4" : "px-8"
            } h-full w-full`}
        >
          {header && header !== null && (showMobileHeader || showHeader) ? (
            <div
              className={`bg-white fixed z-[35] w-full top-0 left-0 ${isMobile ? "px-4" : sideBar ? "pl-60 pr-8" : "px-8"
                }`}
              ref={headerRef}
            >
              <HeaderSwitcher
                headerType={header}
              />
            </div>
          ) : null}
          <div className="w-full h-full gap-4 flex flex-col justify-between">
            <main
              style={{
                paddingTop: showHeader
                  ? `calc(${headerHeight || 0}px + 2rem)`
                  : undefined,
              }}
              className={`${containerProps?.className || ""
                } overflow-hidden h-[max(fit,100%)] flex justify-center `}
              {...containerProps}
            >
              {children}
            </main>
          </div>
        </Container>
      </SocialLayout>
    </Root>
  );
};

export interface HeaderSwitcherProps {
  headerType: HeadersTypes;
}

export const HeaderSwitcher: React.FC<HeaderSwitcherProps> = ({
  headerType,

}) => {
  // console.log(links, "links");

  switch (headerType) {
    case "discover":
      return <DiscoverHeader />;
    case "minimal":
      return <MinimalHeader />;
    default:
      return <SellerHeader />;
  }
};

const FAKE_STORIES = [
  {
    __typename: "RecentStory",
    newStory: true,
    userId: "user1",
    user: {
      __typename: "Account",
      id: "account1",
      profile: {
        __typename: "Profile",
        id: "profile1",
        photo: "/shop.jpeg",
        profession: "Developer",
        username: "user1",
      },
    },
  },
  {
    __typename: "RecentStory",
    newStory: false,
    userId: "user2",
    user: {
      __typename: "Account",
      id: "account2",
      profile: {
        __typename: "Profile",
        id: "profile2",
        photo: "/shop.jpeg",
        profession: "Designer",
        username: "user2",
      },
    },
  },
  {
    __typename: "RecentStory",
    newStory: true,
    userId: "user3",
    user: {
      __typename: "Account",
      id: "account3",
      profile: {
        __typename: "Profile",
        id: "profile3",
        photo: "/shop.jpeg",
        profession: "Product Manager",
        username: "user3",
      },
    },
  },
];
