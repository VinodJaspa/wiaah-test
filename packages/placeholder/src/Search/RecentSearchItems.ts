import { RecentSearchItem } from "types";

export const RecentSearchItemsPH: RecentSearchItem[] = [
  {
    itemType: "user",
    data: {
      id: "1",
      name: "wiaah",
      activityType: "artist",
      photo: "/wiaah_logo.png",
      verified: true,
      profession: "Doctor",
    },
  },
  {
    itemType: "Hashtag",
    data: {
      hashtagName: "gaming",
      hashtagViews: 44,
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
      views: 66,
    },
  },
];
