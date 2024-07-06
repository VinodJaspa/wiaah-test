import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  useGeneralSearchModal,
  TabsViewer,
  ListWrapper,
  LocationButton,
  UserProfile,
  usersProfilesPlaceHolder,
  HashTagSearchItem,
  LocalizationsPH,
  LocalizationSearchItem,
  RecentSearchItemSwticher,
  Menu,
  MenuList,
  MenuButton,
} from "@UI";
import { RecentSearchItemsPH } from "placeholder";
import { randomNum } from "utils";

const LocalizationPh: any[] = [...Array(5)].reduce((acc: any[]) => {
  // return acc.concat(LocalizationsPH);
}, []);

const discoverPlacesPlaceHolder: string[] = [...Array(5)].reduce(
  (acc: any[]) => {
    return acc.concat([]);
  },
  []
);
const hashTagsPlaceholder: string[] = ["gaming", "art", "funny"];
const discoverHashtagsPlaceholder: string[] = [...Array(5)].reduce((acc) => {
  return [...acc, ...hashTagsPlaceholder];
}, []);

export interface GeneralSearchModalProps {
  children: React.ReactNode;
}

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
              iconProps={{ className: "text-primary" }}
              name={place}
              key={i}
            />
          ))}
        </ListWrapper>
      ),
    },
    {
      name: t("hashtags", "hashtags"),
      component: (
        <ListWrapper props={{ style: { width: "full" } }}>
          {discoverHashtagsPlaceholder.map((tag, i) => (
            <HashTagSearchItem
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
        <ListWrapper props={{ style: { width: "full" } }}>
          {LocalizationsPH.map((city, i) => (
            <LocalizationSearchItem key={i} location={city} />
          ))}
        </ListWrapper>
      ),
    },
  ];

  return (
    <Menu isLazy>
      <MenuButton>
        {/*@ts-ignore*/}
        <div className="w-full">{children}</div>
      </MenuButton>
      <MenuList origin="top" className="-right-1/2 p-2">
        <h1 className="font-semibold text-xl">{t("search", "Search")}</h1>
        <div className="thinScroll max-h-[25rem] overflow-y-scroll">
          <TabsViewer tabs={tabs} />
        </div>
      </MenuList>
    </Menu>
  );
};
