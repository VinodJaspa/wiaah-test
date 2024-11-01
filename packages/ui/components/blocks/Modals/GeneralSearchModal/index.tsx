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
} from "ui";
import { RecentSearchItemsPH } from "placeholder";
import { randomNum } from "utils";

const LocalizationPh: any[] = [...Array(5)].reduce((acc: any[]) => {
  // return acc.concat(LocalizationsPH);
}, []);

const discoverPlacesPlaceHolder: string[] = [
  "Paris",
  "London",
  "New York",
  "Tokyo",
  "Sydney",
];

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
        <div className="flex flex-col gap-2 justify-start w-full">
          {RecentSearchItemsPH.map((item, i) => (
            <RecentSearchItemSwticher key={i} itemData={item} />
          ))}
        </div>
      ),
    },
    {
      name: t("users", "users"),
      component: (
        <div className="flex flex-col gap-2 justify-start w-full">
          {usersProfilesPlaceHolder.map((user, i) => (
            <UserProfile user={user} key={i} />
          ))}
        </div>
      ),
    },
    {
      name: t("places", "places"),
      component: (
        <div className="flex flex-col gap-2 justify-start w-full">
          {discoverPlacesPlaceHolder.map((place, i) => (
            <LocationButton
              iconProps={{ className: "text-primary" }}
              name={place}
              key={i}
            />
          ))}
        </div>
      ),
    },
    {
      name: t("hashtags", "hashtags"),
      component: (
        <div className="flex flex-col gap-2 justify-start w-full">
          {discoverHashtagsPlaceholder.map((tag, i) => (
            <HashTagSearchItem
              hashtagName={tag}
              hashtagViews={randomNum(50000000)}
            />
          ))}
        </div>
      ),
    },
    {
      name: t("localization", "Localization"),
      component: (
        <div className="flex flex-col gap-2 justify-start w-full">
          {LocalizationsPH.map((city, i) => (
            <LocalizationSearchItem key={i} location={city} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Menu isLazy>
      <MenuButton>
        <div className="w-full">{children}</div>
      </MenuButton>
      <MenuList origin="top" className="-right-1/2 p-2 w-[500px]">
        <h1 className="font-semibold text-xl">{t("search", "Search")}</h1>
        <div className="thinScroll max-h-[25rem] overflow-y-scroll ">
          <TabsViewer tabs={tabs} />
        </div>
      </MenuList>
    </Menu>
  );
};
