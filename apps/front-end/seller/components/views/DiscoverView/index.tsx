import { useQuery } from "react-query";
import React from "react";
import { products } from "ui/placeholder/products";
import {
  ListWrapper,
  TabsViewer,
  useDiscoverTabs,
  UserProfile,
  usersProfilesPlaceHolder,
  placesPlaceholder,
  LocationButton,
  HashTagSearchItem,
  GridListOrganiser,
  PostCard,
} from "ui";
import { useTranslation } from "react-i18next";
import { randomNum, useBreakpointValue } from "utils";
import { newsfeedPosts } from "placeholder";

const discoverItemsPlaceholder = products.map((prod, i) => ({
  image: prod.imgUrl,
}));

const discoverPlacesPlaceHolder: string[] = [...Array(5)].reduce((acc) => {
  return [...acc, ...placesPlaceholder];
}, []);
const hashTagsPlaceholder: string[] = ["gaming", "art", "funny"];
const discoverHashtagsPlaceholder: string[] = [...Array(5)].reduce((acc) => {
  return [...acc, ...hashTagsPlaceholder];
}, []);

export const DiscoverView: React.FC = ({}) => {
  const { t } = useTranslation();
  const { discoverTabs, currentTab, setTabsData } = useDiscoverTabs();
  const { data, isLoading, isError } = useQuery(
    "DiscoverPageItems",
    () => discoverItemsPlaceholder
  );

  const posts = [
    ...[...Array(4)].reduce((acc) => {
      return [...acc, ...newsfeedPosts.slice(0, 8)];
    }, []),
  ];

  React.useEffect(() => {
    setTabsData([
      {
        name: t("community", "community"),
        component: (
          <GridListOrganiser
            rowSize="14.5rem"
            presets={[
              {
                cols: 5,
                points: [
                  { c: 2, r: 1 },
                  { c: 1, r: 2 },
                  { c: 1, r: 1 },
                  { c: 1, r: 1 },
                  { c: 2, r: 2 },
                  { c: 1, r: 1 },
                  { c: 1, r: 1 },
                  { c: 1, r: 1 },
                  { c: 1, r: 1 },
                  { c: 1, r: 1 },
                ],
              },
            ]}
          >
            {posts.map((item, i) => (
              <PostCard {...item} key={i} />
            ))}
          </GridListOrganiser>
        ),
        link: "/",
      },
      {
        name: t("users", "users"),
        component: (
          <ListWrapper>
            {usersProfilesPlaceHolder.map((user, i) => (
              <UserProfile user={user} key={i} />
            ))}
          </ListWrapper>
        ),
        link: "users",
      },
      {
        name: t("places", "places"),
        component: (
          <ListWrapper>
            {discoverPlacesPlaceHolder.map((place, i) => (
              <LocationButton name={place} key={i} />
            ))}
          </ListWrapper>
        ),
        link: "places",
      },
      {
        name: t("hashtags", "hashtags"),
        component: (
          <ListWrapper>
            {discoverHashtagsPlaceholder.map((tag, i) => (
              <HashTagSearchItem
                hashtagName={tag}
                hashtagViews={randomNum(50000000)}
              />
            ))}
          </ListWrapper>
        ),
        link: "hashtags",
      },
    ]);
  }, []);
  return (
    <div className="flex flex-col overflow-y-scroll thinScroll items-start pt-4 h-full">
      <TabsViewer
        showTabs={false}
        currentTabIdx={currentTab}
        tabs={discoverTabs}
      />
    </div>
  );
};
