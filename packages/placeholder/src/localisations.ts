import { DesignType } from "@features/API";
import { AccountType, PostCardInfo } from "types";
import { GetDesignByPlacementQuery, PlaceCardProps } from "ui";
const PostCardPlaceHolder: PostCardInfo = {
  postInfo: {
    id: "1",
    tags: ["mood", "new"],
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium.",
    numberOfComments: 5,
    numberOfLikes: 7,
    attachments: [
      {
        type: "image",
        src: "/verticalImage.jpg",
      },
      {
        src: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
        type: "video",
      },
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/verticalVideo.jpeg",
        type: "video",
      },
    ],
    createdAt: new Date(Date.UTC(2022, 3, 5)).toJSON(),
    comments: [],
    numberOfShares: 4,
  },
  profileInfo: {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: AccountType.Seller,

    public: true,
  },
};
export const placeCardPlaceholder: PlaceCardProps = {
  user: PostCardPlaceHolder.profileInfo,
  placeAttachments: [
    {
      src: "/place-1.jpg",
      type: "image",
    },
  ],
  placeLocation: "los angeles",
  placeType: "Hotel",
  openFrom: "07:30 AM",
  openTo: "10:30 PM",
  openDays: ["tuesday", "wednesday", "thursday", "friday"],
};

export const costumPH: PlaceCardProps[] = [
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/video.mp4",
        type: "video",
      },
    ],
  },
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/verticalImage.jpg",
        type: "image",
      },
    ],
  },
  {
    ...placeCardPlaceholder,
    placeAttachments: [
      {
        src: "/verticalVideo.mp4",
        type: "video",
      },
    ],
  },
];

export const placesWithCostum = costumPH.concat(
  [...Array(9)].map(() => ({
    ...placeCardPlaceholder,
  })),
);

export const placesPH = [...Array(9)].map(() => ({
  ...placeCardPlaceholder,
}));

export const designByPlacementPlaceholder: GetDesignByPlacementQuery["getDesignByPlacement"] =
  [
    {
      __typename: "Design",
      id: "design1",
      src: "/shop.jpeg",
      type: DesignType.Partner, // Replace with the appropriate `DesignType` value
      distenation: "Homepage",
      name: "Homepage Banner",
      text: "Welcome to our site!",
    },
    {
      __typename: "Design",
      id: "design2",
      src: "/shop.jpeg",
      type: DesignType.Collaboration, // Replace with the appropriate `DesignType` value
      distenation: "Product Page",
      name: "Product Spotlight",
      text: "Check out our new arrivals!",
    },
    {
      __typename: "Design",
      id: "design3",
      src: "/shop.jpeg",
      type: DesignType.Slideshow, // Replace with the appropriate `DesignType` value
      distenation: "Sidebar",
      name: "Sidebar Ad",
      text: "Limited-time discounts available now.",
    },
    {
      __typename: "Design",
      id: "design4",
      src: "/shop.jpeg",
      type: DesignType.Slideshow, // Replace with the appropriate `DesignType` value
      distenation: "Footer",
      name: "Footer Promotion",
      text: "Subscribe to our newsletter!",
    },
    {
      __typename: "Design",
      id: "design5",
      src: "/shop.jpeg",
      type: DesignType.Slideshow, // Replace with the appropriate `DesignType` value
      distenation: "Checkout Page",
      name: "Checkout Reminder",
      text: "Don't forget to apply your coupon!",
    },
  ];
