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
  HashTagSearch,
  DiscoverItem,
} from "ui";
import {
  Text,
  Image,
  VStack,
  HStack,
  Icon,
  StackProps,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { HiHashtag } from "react-icons/hi";
import { randomNum, NumberShortner } from "ui/components/helpers";

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
  // const cols = useBreakpointValue({ base: 4, md: 2, lg: 3, xl: 5 });
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
                iconStyle={{ color: "primary.main" }}
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
              <HashTagSearch
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
  console.log(discoverTabs);
  return (
    <VStack overflow={"scroll"} align={"start"} h="100%">
      {/* <Text
        textTransform={"capitalize"}
        pb="1rem"
        fontSize={"4xl"}
        fontWeight="bold"
      >
        {t("discover", "discover")}
      </Text> */}
      <TabsViewer
        tabsProps={{
          index: currentTab,
          onChange: (index) => changeDiscoverTab(discoverTabs[index].link),
          w: "100%",
        }}
        showTabs={false}
        tabs={discoverTabs}
      />
    </VStack>
  );
};
