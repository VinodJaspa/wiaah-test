import React from "react";
import { MdClose } from "react-icons/md";
import { RecentSearchItem } from "types";
import {
  HashTagSearchItem,
  UserProfile,
  LocalizationSearchItem,
  LocationButton,
} from "ui";

export interface RecentSearchItemSwticherProps {
  itemData: RecentSearchItem;
}

export const RecentSearchItemSwticher: React.FC<RecentSearchItemSwticherProps> =
  ({ itemData }) => {
    const content = () => {
      switch (itemData.itemType) {
        case "Hashtag":
          return <HashTagSearchItem {...itemData.data}></HashTagSearchItem>;
        case "user":
          return <UserProfile user={itemData.data} />;

        case "Localization":
          return <LocalizationSearchItem location={itemData.data} />;
        case "Place":
          return (
            <LocationButton
              iconProps={{ className: "text-primary" }}
              {...itemData.data}
            />
          );
        default:
          return null;
      }
    };
    return (
      <div className="flex items-center gap-2 justify-between w-full">
        {content()}
        <MdClose className="cursor-pointer" />
      </div>
    );
  };
