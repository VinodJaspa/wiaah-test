import { t } from "i18next";
import {
  AffiliationOfferCardInfo,
  HashTagCardInfo,
  PostCardInfo,
  PostComment,
  PostInfo,
  ProfileInfo,
  ShopCardInfo,
  ShopSocialProfileInfo,
  SubscribersUserInfo,
} from "types";

export const SocialProfileInfo: ShopSocialProfileInfo = {
  id: "1",
  name: "Wiaah",
  accountType: "seller",
  publications: 100,
  subscribers: 40,
  subscriptions: 23,
  thumbnail: "/wiaah_logo.png",
  countryCode: "CH",
  profession: "profession",
  verifed: true,
  location: "Switzerland, Geneva",
  public: true,
  bio: "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing ",
  links: ["https://www.instagram.com"],
  isFollowed: false,
  profileCoverPhoto: "/shop-2.jpeg",
};

export const SubscribersUsersPlaceholder: SubscribersUserInfo[] = [
  {
    id: "1",
    name: "user 1",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
  {
    id: "2",
    name: "user 2",
    avatar: "",
    profileUrl: "localhost:3002/",
  },
  {
    id: "3",
    name: "user 3",
    avatar: "",
    profileUrl: "localhost:3002/",
  },
  {
    id: "4",
    name: "user 4",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
  {
    id: "5",
    name: "user 5",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
  {
    id: "6",
    name: "user 6",
    avatar: "",
    profileUrl: "localhost:3002/",
  },
  {
    id: "7",
    name: "user 7",
    avatar: "",
    profileUrl: "localhost:3002/",
  },
  {
    id: "8",
    name: "user 8",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
  {
    id: "9",
    name: "user 9",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
  {
    id: "10",
    name: "user 10",
    avatar: "/shop-2.jpeg",
    profileUrl: "localhost:3002/",
  },
];

export const PostCommentPlaceholder: PostComment = {
  id: "1",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
  createdAt: new Date(Date.UTC(2022, 3, 1)).toJSON(),
  likes: 5,
  replies: 2,
  attachment: {
    type: "image",
    src: "/shop.jpeg",
  },
  user: {
    id: "1",
    accountType: "buyer",
    name: "wiaah",
    thumbnail: "/wiaah_logo.png",
    verifed: true,
    public: true,
  },
  hashTags: ["gaming", "fashion", "motivation"],
};
export const PostCardPlaceHolder: PostCardInfo = {
  postInfo: {
    views: 56300,
    numberOfShares: 13,
    id: "1",
    tags: ["mood", "new"],
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium.",
    numberOfComments: 5,
    numberOfLikes: 7,
    attachments: [
      {
        type: "image",
        src: "/place-2.jpg",
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
    comments: [
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder, attachment: null },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
    ],
    url: `/social/wiaah/newsfeed-post/15`,
  },
  profileInfo: {
    profession: "Los Angeles",
    verifed: true,
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: "seller",
    public: true,
  },
};

import { products } from "@UI/placeholder/products";
import { baseUri } from "uris";
import { randomNum } from "../components/helpers/randomNumber";
const images: string[] = [...products.map((pro) => pro.imgUrl)];

export const getRandomImage = (): string =>
  images[Math.floor(Math.random() * images.length)];

export const postProfilesPlaceholder: ProfileInfo[] = [
  {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: "seller",
    verifed: true,
    public: true,
  },
  {
    id: "2",
    name: "user",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
    public: true,
  },
  {
    id: "3",
    name: "seller",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
    verifed: true,
    public: true,
  },
  {
    id: "4",
    name: "buyer",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
    public: true,
  },
];
export const shopCardInfoPlaceholder: ShopCardInfo = {
  id: "1",
  title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum",
  cashback: {
    unit: "$",
    value: 5,
  },
  user: { ...PostCardPlaceHolder.profileInfo },
  likes: 5,
  noOfComments: 2,
  type: "service",
  price: 800,
  oldPrice: 1000,
  discount: {
    unit: "%",
    value: 15,
  },
  // views: 50,
  attachments: [
    {
      type: "video",
      src: "/video.mp4",
    },
  ],
  comments: PostCardPlaceHolder.postInfo.comments || [],
  rating: 3,
  url: `${baseUri}/social/wiaah/socialshop-post/15`,
};

const imgs: string[] = [...products.map((pro) => pro.imgUrl)];

export const socialAffiliationCardPlaceholder: AffiliationOfferCardInfo = {
  views: 23500,
  user: postProfilesPlaceholder[0],
  affiliationLink: "http://localhost:3002/wiaah",
  id: "1",
  commission: 15,
  createdAt: new Date(Date.UTC(2022, 3, 5)).toString(),
  name: "affiliation product",
  attachments: [
    {
      src: "/shop.jpeg",
      type: "image",
    },
  ],
  price: 30,
  noOfComments: 5,
  noOfLikes: 56,
  comments: [],
  showComments: false,
  url: `${baseUri}/social/wiaah/affiliation-post/12`,
};
export const getRandomUser = () =>
  postProfilesPlaceholder[
    Math.floor(Math.random() * postProfilesPlaceholder.length)
  ];
const comments: PostComment[] = [
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },

  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
];
export const socialAffiliationCardPlaceholders: AffiliationOfferCardInfo[] = [
  {
    ...socialAffiliationCardPlaceholder,
    id: "1",
    commission: randomNum(20),
    price: randomNum(100),
    attachments: [
      // {
      //   type: "image",
      //   src: "/verticalImage.jpg",
      // },
      {
        type: "image",
        src: "/shop.jpeg",
      },
    ],
    comments: [comments[randomNum(comments.length)]],
  },
  {
    ...socialAffiliationCardPlaceholder,
    id: "2",
    commission: randomNum(20),
    price: randomNum(100),
    views: 0,
    attachments: [
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
    ],
  },
  {
    ...socialAffiliationCardPlaceholder,
    id: "3",
    commission: randomNum(20),
    price: randomNum(100),
    attachments: [
      {
        src: "/place-1.jpg",
        type: "image",
      },
    ],
    comments: comments,
  },
  {
    ...socialAffiliationCardPlaceholder,
    id: "4",
    commission: randomNum(20),
    price: randomNum(100),
    views: 0,
    attachments: [
      {
        src: "/verticalImage.jpg",
        type: "image",
      },
    ],
  },
  {
    ...socialAffiliationCardPlaceholder,
    id: "5",
    commission: randomNum(20),
    price: randomNum(100),
    views: 0,
    attachments: [
      {
        src: "/place-2.jpg",
        type: "image",
      },
    ],
  },
  {
    ...socialAffiliationCardPlaceholder,
    id: "6",
    commission: randomNum(20),
    price: randomNum(100),
    attachments: [
      {
        src: "/place-3.jpg",
        type: "image",
      },
    ],
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachments: [
      {
        src: imgs[randomNum(imgs.length)],
        type: "image",
      },
    ],
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachments: [
      {
        src: imgs[randomNum(imgs.length)],
        type: "image",
      },
    ],
  },
];
export const newsfeedPosts: PostCardInfo[] = [
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "1",
      attachments: [
        {
          type: "image",
          src: "/post (1).jfif",
          postLocation: "New York",
        },
        // {
        //   src: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
        //   type: "video",
        // },
        // {
        //   type: "video",
        //   src: "/video.mp4",
        // },
        {
          src: "/shop.jpeg",
          type: "image",
        },
        {
          src: "/verticalVideo.mp4",
          type: "image",
        },
      ],
      content: "",
      comments: [
        {
          ...PostCommentPlaceholder,
          attachment: null,
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: {
            src: "/shop.jpeg",
            type: "image",
          },
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },

        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
      ],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "2",
      attachments: [
        {
          src: "/post (2).jfif",
          type: "image",
          postLocation: "New York",
        },
        {
          type: "image",
          src: "/verticalImage.jpg",
          postLocation: "New York",
        },
        // {
        //   src: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
        //   type: "video",
        // },
        {
          type: "video",
          src: "/video.mp4",
        },
        {
          src: "/shop.jpeg",
          type: "image",
        },
      ],
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "4",
      attachments: [
        {
          src: "/post (3).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      tags: [],
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "5",
      attachments: [
        {
          src: "/post (4).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "",
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "3",
      attachments: [
        {
          src: "/post (5).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "test content",
      comments: [
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: {
            src: "/shop.jpeg",
            type: "image",
          },
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },

        {
          ...PostCommentPlaceholder,
          user: getRandomUser(),
          content: "nice video",
          attachment: null,
        },
      ],
    },
  },

  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "6",
      attachments: [
        {
          src: "/post (6).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "",
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      attachments: [
        {
          src: "/post (7).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "",
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "7",
      attachments: [
        {
          src: "/post (8).jfif",
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "",
      comments: [],
    },
  },
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "8",
      attachments: [
        {
          src: images[Math.floor(Math.random() * images.length)],
          type: "image",
          postLocation: "New York",
        },
      ],
      content: "",
      comments: [],
    },
  },
];
export const stringplaceholder =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nostrum nulla rem excepturi unde iusto voluptatum tempora accusantium ducimus laborum, repellat tempore mollitia error animi doloribus eum inventore voluptate ab.";
const getRandomType = (): "service" | "product" =>
  randomNum(10) > 4 ? "product" : "service";
export const ShopCardsInfoPlaceholder: ShopCardInfo[] = [
  {
    ...shopCardInfoPlaceholder,
    id: "2",
    attachments: [
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
    ],
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: 1600,
    likes: 105100,
    views: 2200000,
    comments: comments,
    type: getRandomType(),
  },
  {
    ...shopCardInfoPlaceholder,
    id: "5",
    attachments: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
    ],
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    // views: randomNum(50),
    type: getRandomType(),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    id: "3",
    attachments: [
      {
        src: "/place-2.jpg",
        type: "image",
      },
    ],
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    // views: randomNum(50),
    type: getRandomType(),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    id: "4",
    attachments: [
      {
        src: images[randomNum(images.length)],
        type: "image",
      },
    ],
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    type: getRandomType(),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    id: "5",
    attachments: [
      {
        src: "/place-3.jpg",
        type: "image",
      },
    ],
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    type: getRandomType(),
    comments: [],
  },
];

export const hashtagCardInfoPlaceholder: HashTagCardInfo = {
  attachment: {
    src: "/video.mp4",
    type: "video",
  },
  title: t("most_liked_post", "most liked post"),
};

export const hashTagCardsInfoPlaceholder: HashTagCardInfo[] = [
  {
    attachment: {
      src: "/verticalImage.jpg",
      type: "image",
    },
    title: t("most_liked_post", "most liked post"),
  },
  {
    attachment: {
      src: images[randomNum(images.length)],
      type: "image",
    },
    title: t("most_commented_post", "most commented post"),
  },
  {
    attachment: {
      src: "/verticalVideo.mp4",
      type: "video",
    },
    title: t("most_viewed_video", "most viewed video"),
  },
  {
    attachment: {
      src: "/video.mp4",
      type: "video",
    },
    title: t("most_liked_video", "most liked video"),
  },
];
