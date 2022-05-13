import { HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";
import { RecentSearchItem } from "types";
import { HashTagSearch, UserProfile, LocalizationSearchItem } from "ui";
import { LocationButton } from "../../Buttons";

export interface RecentSearchItemSwticherProps {
  itemData: RecentSearchItem;
}

export const RecentSearchItemSwticher: React.FC<RecentSearchItemSwticherProps> =
  ({ itemData }) => {
    const content = () => {
      switch (itemData.itemType) {
        case "Hashtag":
          return <HashTagSearch {...itemData.data}></HashTagSearch>;
        case "user":
          return <UserProfile user={itemData.data} />;

        case "Localization":
          return <LocalizationSearchItem location={itemData.data} />;
        case "Place":
          return (
            <LocationButton
              iconStyle={{ color: "primary.main" }}
              {...itemData.data}
            />
          );
        default:
          return null;
      }
    };
    return (
      <HStack justify={"space-between"} w="100%">
        {content()}
        <Icon as={MdClose} />
      </HStack>
    );
  };
