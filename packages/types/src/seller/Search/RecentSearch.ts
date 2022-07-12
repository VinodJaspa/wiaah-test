import { SearchHashtagItem } from "./SearchHashTagItem";
import { SearchLocalizationItem } from "./SearchLocalizationItem";
import { SearchUserItem } from "./SearchUserItem";
import { SearchPlaceItem } from "./SearchPlaceItem";

export type RecentSearchItem =
  | {
      itemType: "Hashtag";
      data: SearchHashtagItem;
    }
  | {
      itemType: "Localization";
      data: SearchLocalizationItem;
    }
  | {
      itemType: "user";
      data: SearchUserItem;
    }
  | {
      itemType: "Place";
      data: SearchPlaceItem;
    };
