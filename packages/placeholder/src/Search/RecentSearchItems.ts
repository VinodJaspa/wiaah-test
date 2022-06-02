import { RecentSearchItem } from "types";
import { randomNum } from "utils";

export const RecentSearchItemsPH: RecentSearchItem[] = [
  {
    itemType: "user",
    data: {
      name: "wiaah",
      activityType: "artist",
      userPhotoSrc: "/wiaah_logo.png",
      verified: true,
    },
  },
  {
    itemType: "Hashtag",
    data: {
      hashtagName: "gaming",
      hashtagViews: randomNum(50000),
    },
  },
  {
    itemType: "Place",
    data: {
      name: "Hotels",
    },
  },
  {
    itemType: "Localization",
    data: {
      name: "new york",
      image: "/place-1.jpg",
      views: randomNum(50000),
    },
  },
];
