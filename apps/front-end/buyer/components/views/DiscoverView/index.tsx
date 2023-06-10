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
  DiscoverItem,
  VStack,
} from "ui";
import { useTranslation } from "react-i18next";
import { randomNum } from "ui/components/helpers";

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
  const { discoverTabs, changeDiscoverTab, currentTab, setTabsData } =
    useDiscoverTabs();
  const { data, isLoading, isError } = useQuery(
    "DiscoverPageItems",
    () => discoverItemsPlaceholder
  );

  React.useEffect(() => {
    setTabsData([
      {
        name: t("community", "community"),
        component: (
          <ListWrapper cols={4}>
            {discoverItemsPlaceholder.map((item, i) => (
              <DiscoverItem thumbnail={item.image} key={i} />
            ))}
          </ListWrapper>
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
              <LocationButton
                key={i}
                iconProps={{ className: "text-primary" }}
                name={place}
                key={i}
              />
            ))}
          </ListWrapper>
        ),
        link: "places",
      },
      {
        name: t("hashtags", "hashtags"),
        component: (
          <ListWrapper style={{ w: "100%" }}>
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
    <VStack className="overflow-scroll items-start h-full">
      <TabsViewer
        showTabs={false}
        tabs={discoverTabs}
        currentTabIdx={currentTab}
      />
    </VStack>
  );
};
