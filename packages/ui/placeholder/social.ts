import {
  AffiliationOfferCardInfo,
  PostCardInfo,
  PostComment,
  PostInfo,
  ProfileInfo,
  ShopCardInfo,
  ShopScoialProfileInfo,
  SubscribersUserInfo,
} from "types/market/Social";

export const SocialProfileInfo: ShopScoialProfileInfo = {
  id: "1",
  name: "Wiaah",
  accountType: "seller",
  publications: 100,
  subscribers: 40,
  subscriptions: 23,
  thumbnail: "/wiaah_logo.png",
  countryCode: "CH",
  verifed: true,
  location: "Switzerland, Geneva",
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
  },
};
export const PostCardPlaceHolder: PostCardInfo = {
  postInfo: {
    id: "1",
    tags: ["mood", "new"],
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium.",
    numberOfComments: 5,
    numberOfLikes: 7,
    attachment: {
      src: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
      type: "video",
    },
    createdAt: new Date(Date.UTC(2022, 3, 5)).toJSON(),
    comments: [
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder, attachment: undefined },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
      { ...PostCommentPlaceholder },
    ],
  },
  profileInfo: {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: "seller",
  },
};

import { products } from "ui/placeholder/products";
import { randomNum } from "../components/helpers/randomNumber";
const images: string[] = [...products.map((pro) => pro.imgUrl)];
export const postProfilesPlaceholder: ProfileInfo[] = [
  {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: "seller",
    verifed: true,
  },
  {
    id: "2",
    name: "user",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
  },
  {
    id: "3",
    name: "seller",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
    verifed: true,
  },
  {
    id: "4",
    name: "buyer",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: "seller",
  },
];
export const shopCardInfoPlaceholder: ShopCardInfo = {
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
  views: 50,
  attachment: {
    type: "video",
    src: "video.mp4",
  },
  comments: PostCardPlaceHolder.postInfo.comments || [],
  rating: 3,
};

const imgs: string[] = [...products.map((pro) => pro.imgUrl)];

export const socialAffiliationCardPlaceholder: AffiliationOfferCardInfo = {
  user: postProfilesPlaceholder[0],
  affiliationLink: "http://localhost:3002/wiaah",
  commission: 15,
  createdAt: new Date(Date.UTC(2022, 3, 5)).toString(),
  name: "affiliation product",
  attachment: {
    src: "verticalImage.jpg",
    type: "image",
  },
  price: 30,
  noOfComments: 5,
  noOfLikes: 56,
  comments: [],
  showComments: false,
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
    commission: randomNum(20),
    price: randomNum(100),
    attachment: {
      src: "/verticalImage.jpg",
      type: "image",
    },
    comments: [comments[randomNum(comments.length)]],
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),

    attachment: {
      src: "/verticalVideo.mp4",
      type: "video",
    },
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachment: {
      src: "/video.mp4",
      type: "video",
    },
    comments: comments,
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachment: {
      src: imgs[randomNum(imgs.length)],
      type: "image",
    },
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachment: {
      src: imgs[randomNum(imgs.length)],
      type: "image",
    },
  },
  {
    ...socialAffiliationCardPlaceholder,
    commission: randomNum(20),
    price: randomNum(100),
    attachment: {
      src: imgs[randomNum(imgs.length)],
      type: "image",
    },
  },
  // {
  //   ...socialAffiliationCardPlaceholder,
  //   commission: randomNum(20),
  //   price: randomNum(100),
  //   attachment: {
  //     src: imgs[randomNum(imgs.length)],
  //     type: "image",
  //   },
  // },
  // {
  //   ...socialAffiliationCardPlaceholder,
  //   commission: randomNum(20),
  //   price: randomNum(100),
  //   attachment: {
  //     src: imgs[randomNum(imgs.length)],
  //     type: "image",
  //   },
  // },
];
