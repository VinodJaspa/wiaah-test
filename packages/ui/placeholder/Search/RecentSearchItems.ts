import { RecentSearchItem } from "types";
import { randomNum } from "../../components/helpers";

export const RecentSearchItemsPH: RecentSearchItem[] = [
  {
    itemType: "user",
    data: {
      id: "2",
      name: "wiaah",
      activityType: "artist",
      photo: "/wiaah_logo.png",
      verified: true,
      profession: "programmer",
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
