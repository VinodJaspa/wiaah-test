import {
  Box,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { TabType } from "types";
import {
  useGeneralSearchModal,
  TabsViewer,
  ListWrapper,
  LocationButton,
  UserProfile,
  usersProfilesPlaceHolder,
  HashTagSearch,
  placesPlaceholder,
  LocalizationsPH,
  LocalizationSearchItem,
  RecentSearchItemsPH,
  RecentSearchItemSwticher,
} from "ui";
import { randomNum } from "../../../helpers";

const LocalizationPh: any[] = [...Array(5)].reduce((acc: any[]) => {
  return acc.concat(LocalizationsPH);
}, []);

const discoverPlacesPlaceHolder: string[] = [...Array(5)].reduce(
  (acc: any[]) => {
    return acc.concat(placesPlaceholder);
  },
  []
);
const hashTagsPlaceholder: string[] = ["gaming", "art", "funny"];
const discoverHashtagsPlaceholder: string[] = [...Array(5)].reduce((acc) => {
  return [...acc, ...hashTagsPlaceholder];
}, []);

export interface GeneralSearchModalProps {}

export const GeneralSearchModal: React.FC<GeneralSearchModalProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const { closeModal, isOpen } = useGeneralSearchModal();

  const tabs: TabType[] = [
    {
      name: "Recent",
      component: (
        <ListWrapper>
          {RecentSearchItemsPH.map((item, i) => (
            <RecentSearchItemSwticher key={i} itemData={item} />
          ))}
        </ListWrapper>
      ),
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
    },
    {
      name: t("places", "places"),
      component: (
        <ListWrapper>
          {discoverPlacesPlaceHolder.map((place, i) => (
            <LocationButton
              iconStyle={{ color: "primary.main" }}
              name={place}
              style={{
                color: "black",
              }}
              key={i}
            />
          ))}
        </ListWrapper>
      ),
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
    },
    {
      name: t("localization", "Localization"),
      component: (
        <ListWrapper style={{ w: "100%" }}>
          {LocalizationsPH.map((city, i) => (
            <LocalizationSearchItem key={i} location={city} />
          ))}
        </ListWrapper>
      ),
    },
  ];

  return (
    <Popover isLazy lazyBehavior="unmount" isOpen={isOpen} onClose={closeModal}>
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>
      <PopoverContent _focus={{ outline: "0px" }} w={"auto"}>
        <PopoverArrow />
        <PopoverHeader>{t("search", "Search")}</PopoverHeader>
        <PopoverBody className="thinScroll" overflowY={"scroll"} maxH={"25rem"}>
          <TabsViewer tabs={tabs} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
