import { t } from "i18next";
import {
  AffiliationOfferCardInfo,
  HashTagCardInfo,
  PostComment,
  PostInfo,
  ProfileInfo,
  ShopCardInfo,
  ShopSocialProfileInfo,
  SubscribersUserInfo,
  PostCardInfo,
  AccountType,
} from "types";

export const SocialProfileInfo: ShopSocialProfileInfo = {
  id: "1",
  name: "Wiaah",
  accountType: AccountType.Seller,
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
    accountType: AccountType.Buyer,
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
  },
  profileInfo: {
    profession: "Los Angeles",
    verifed: true,
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: AccountType.Seller,
    public: true,
  },
};

import { products } from "./products";
import { baseUri } from "uris";
import { randomNum } from "../components/helpers/randomNumber";
import { CashbackType, PresentationType, RestaurantDishType, ServiceType } from "@features/API";
import { SocialShopPostcardProps } from "..";
const images: string[] = [
  // "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75",
  "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
  "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
  "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
  // "https://s3-alpha-sig.figma.com/img/9a6b/9d53/520037c4554bb0fafaf1720032c98450?Expires=1682899200&Signature=QojH1LH3MZvXEeSq5j-CcP07pZ2UmtROix89OEGqqDqeDoOarEhLTL3nNcmNCRXDic5JEff2~Zn9gSiCiz25glcHAhaSz59sJm0FE~1zvCjquL5LswsENsBWHzLNS8I2EfhiwiI5zP2luZakbYprQOlC9bTgvQA8kTNNrA1-QvWr80Q97Qqc8kKfhDCnyFNiZaUoA5psm~0G30~CY56vIX3enJBmpJ6T3hQsIZFOEzeONe8BUU9WwBV26uVOE-cCV6qCeCw8xr6FyAeXpyr3xLwwsSA5CT127byYSkLTWMCSk9QUy1AvOhSKmyyy5qppGVaJugJtFY8GyxpMypo9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/eb32/093d/4ae103dd3d9ffa5196218c1a1b4f2fef?Expires=1682899200&Signature=dbjIuCXIkTDWDicvRMCjrI-D8fZR0f3iL12yGiM91891DXVg8BjleWb-HWjdVvee5wtBzRLuov365UstnZdKlMJ6fnJfFy0O2Yba-tQcxTIU~-IngfFrJeR9~WhCSqX4rZ-cHkyvwnM89J-zF2ZirBzRiOB-uc-y8uE6IngZszClRJOJhlzmJ53cxJZ0~cWy~3ded9bNWR2x2FS0VW6Z7pBwztXQmFApinzQzIgas9edisdlrJgrpt16C3fgvNWbR974FXky86IMv5l~v3VqDTTz1-0k1msz-luKi-ath9caa2L1fg~nAy8VcVAMZzm9PfR046Jf2tgxsGMdXglmcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/bb8d/1b11/0d08803e1df10edec74f85a0d3922ffa?Expires=1682899200&Signature=EOXpIkIZUVZE5J5XrTtbdWuTIPB3Ylwl38Z9yINFAAOWV3o9QYhXkNgwsD8D9Io8GzF7BUexaGfaHfBCJyDFxGqNDncZAxZoVt118oEaQAO0TM~CrNZuky9NMAM-rhc0x16~S4h~2m5RRb9rq3VSWydjAmDAltNjJGKFOXryW1CSjZmPozrCAjrIAc11AusSFbqPlVnp7APfnqAruUq0EZZcrvv482e5t-3rwNt9WYZXVeshSQiKksWmGzkpyIv6Q72Zz~pb424zBn68G82eqarYWmokZOi5WbxvV6XzGshXVtbWRGzRvJAPoIWjCN3jBKAeByZcnwWY0bQNasUApg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/eec5/e51b/19609c49b01f0dc4aeca6adf5efe3a5c?Expires=1682899200&Signature=YlChDQN8ottDR6fexVTL7kbssQoS8qQ-sCNnNQNmFiobUQKx7zLCmpOiqr~ClXlf7CLRLg1eh8UO~vCrERZhzFMT-1-yjvU6Lpc-wK7wi4tfPfKVuRsVVMKjJ8vlwqy3xRwISqmYY4Y0~97hclNArlDDSAtOHDM9fO3ztyubZDmRaQHggsjXbEgTX0gEA6IRWET5~FHasAoYzuFqvC2lz5nkjSDS4fo9Ufkf8yy5Y0RfreZ8u-VzFupfBe89JSmhPPPh-Qje5yfJvRm3GVqgqUPD4mo0sgXxRhDNxIfvPL55DfNN5wOvhIkxiPhiTuLoflRCsdjUpf1kbptkiKAg0w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/39b9/b5f3/950799f836c48d4d0f9f8b3b9f628881?Expires=1682899200&Signature=UNuN16fYPst6zVj4DC~Fdh3gO94T49ncWd5~3W7f~uNpoJBEf0DhPcvABhFGyVdsKoTeaEnp0DgFfnG59VdUd5xdox1QpzQmmox1iXgpOVFDmbIcW0a5H1QLqLFqnpPAytEXVkVee33EXa9WEYajB3Wo2uSjhUyeMaSF5mXu54VjtG5-j5XUauuaqUvgzEEE9vRHEjA~G19uG3A675EEfcwCvBGuIosgpoAZx19DwgYRp5hGNqkWmRxo0EuADfpPIHQAQ648k8WOX9CJfSzdRd~1cuFcvtyi-ZNjhEc5FeyOP2BDEN1QBOvp4h9lcs7ALXahUrjYuKA9hDhfaAKF8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/53f1/a90f/623b563353039598ce666905f73baed3?Expires=1682899200&Signature=l1WpsxsuzfxGX~eHdhu-5UAmqgpvlzcy5f2W7~~ntCO4cxm8nM0VA9JRqyD-3O~vfUW4kbsUWRPxKkluxK5AJ2dyY5UOAbNus8sRK3T1daailculZKm7m-I2WjLq-uBzoMsPJ7XZ2dHF9fHchrlaAdCQ5cUd66zTK9gZLvwlRtuvPC8GAkoeKoNOK70uNaaeIaJ2W-tanfra22qvojX1JvWu091u6O4-jDjQT14S~5iGNE38Xi5Q0QOAGHBBudyRnJdsdN-wqSnnKlUTqNGKuFItZE5YP4LDCqVCvsW1dgLnngfggM4oE9uwpqbbJsHpbkhNy39dwKJeSpjSa7Grnw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/97a9/06e5/d0c5f29eef198d74a28e2218d380ffda?Expires=1682899200&Signature=NE1XPdieU1ZJ7vktFMg5DNliKhoKEJbn0GWyATBBQsi1XvaYSqRKkx0pIq33DP9qmOEnp4WhktsxeWYKokAjqx36GVhkn8ZpU0tBQyjF7Ejg0S4Efdw9RGEIDXOBOZ-YlC4PT1q4ra2V2j67N9qDskJqtYZi4E5jNi4c0TxrRRxXOW4g6DiDHczc4o-iAiV51G2hCjKXftlTnDXB9GkuUVLIBQsEs0fMuk3hLm2Qlk9oQHiORKstGgtVuin-S33xxWEVw0tFuB1yLxQ2xw-bQ7nfLUJ9IpLFTOKkS3xklM40aEBdUDWUhfUGOrn~7t1btv9UEpqYBQwvNjautiyvcg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/05ea/9ba2/4377675f8789e9e888fd1bfcfd67d718?Expires=1682899200&Signature=hIVHcPNZ1vNJI4iAMjHpuHiHOJioegBmoNv1aTu3sr6Ut-JJI9w~1SOvfrKlq9SL-NJFX~fRvORjiHFq7oerIP2zLjPcIirRqUtNbBcTvUmIb9nHI56VyovssHEuu8Yc7nBG5Cxi4cWAMC5M-zDJ~v2-xN8bNK-9hHPYtJvaSBAiKU~fLU2SutofpCUi3H-Oec7gqYuvbAlzE1Fmjcuiwvad7OjZ4VH5Pb2l8di5pT-Lp3ZLzXdisNnMITrLI9G9~xKMbURf47Xe8IfxDno8s4eKiIBslc7C4eUTMSVi7LZHVPf48483cEOmQ4JNY~2t6A6cNGJg769hxb7Qi9XIxQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  // "https://s3-alpha-sig.figma.com/img/7cf0/e945/e740fd07bfbf0de9f6c459e3fc7d646e?Expires=1682899200&Signature=jrnUf6fPSpsqoybede2IRPs0RadLvjlR36e8o-qHrFat61WAPQE4iu2oXvUS-IrhVZdlGoziyaEanATX8IZ3z5RMcDgKgyF7SLmCOA~td2cT4sur2bvsZmJ4XGSkKg3FCP-xv5CshyhdGgmEGYYbG8poi4X7WpRAMnrrOtRXQwa2OgIOHpHmWSomg2cNrunUGNlsWbdPEE6~L7GolOK1a88wwSJQ6XxY7Uyp9jHc5THHylJwyOQA5hNYtnr65z5e91y826PyLLvUJQbpQ7LcU3-SwOwo4CDASjjbHr4hj7BSsDbWQFtrne3yI2IJHag3Djq5uxQw65pt2z2-Uy4XQA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
];

export const drinksPh = [
  "https://hips.hearstapps.com/hmg-prod/images/ice-tea-royalty-free-image-1621872849.jpg",
  "https://www.thespruceeats.com/thmb/rSJlCUttspISKnze82V6QlIBe5s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tequila-sunrise-recipe-760754-hero-01-fbdd69f53c2f48ab8e13cc94deefcc7c.jpg",
];

export const dishPh = [
  "https://robbreport.com/wp-content/uploads/2020/12/grilled-dorade-vernick-fish.jpg?w=1000",
  "https://robbreport.com/wp-content/uploads/2020/12/manti-dumplings-albi-dc.jpg?w=1000",
  "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/4/1/FN_chain-restaurant-entrees_Applebees_Bourbon-Street-Chicken-Shrimp_s6x4.jpg.rend.hgtvcom.616.411.suffix/1538685780055.jpeg",
];

export const doctorPh = [
  "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
  "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
  "https://aonanghospital.com/upload/doctor-20230207094332.jpg",
];

export const treatmentsPh = [
  "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
  "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg?anchor=center&mode=crop&width=1200&height=630",
  "https://static-bebeautiful-in.unileverservices.com/9-benefits-of-facial_9.jpg",
];

export const vehiclePh = [
  "https://d.newsweek.com/en/full/2203419/2023-ford-expedition.jpg?w=1600&h=1600&q=88&f=1f6dd5c5cc318e1239e31777f34a50d2",
];

export const rentalsPh = [
  "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?b=1&s=612x612&w=0&k=20&c=vcCQ5L9Tt2ZurwFhtodR6njSUnMsEn_ZqEmsa0hs9lM=",
];

export const getRandomServiceImage = (
  type: ServiceType,
  menuType?: RestaurantDishType
) => {
  const getRandom = (imgs: string[]) => imgs[randomNum(imgs.length)];
  switch (type) {
    case ServiceType.HolidayRentals:
    case ServiceType.Hotel:
      return getRandom(rentalsPh);

    case ServiceType.BeautyCenter:
      return getRandom(treatmentsPh);
    case ServiceType.HealthCenter:
      return getRandom(doctorPh);
    case ServiceType.Restaurant:
      if (menuType === RestaurantDishType.Drinks) {
        return getRandom(drinksPh);
      } else return getRandom(dishPh);
    case ServiceType.Vehicle:
      return getRandom(vehiclePh);
    default:
      return "";
  }
};

export const getRandomImage = (): string =>
  images[Math.floor(Math.random() * images.length)];

export const postProfilesPlaceholder: ProfileInfo[] = [
  {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: AccountType.Seller,
    verifed: true,
    public: true,
  },
  {
    id: "2",
    name: "user",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: AccountType.Seller,
    public: true,
  },
  {
    id: "3",
    name: "seller",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: AccountType.Seller,
    verifed: true,
    public: true,
  },
  {
    id: "4",
    name: "buyer",
    thumbnail: images[Math.floor(Math.random() * images.length)],
    accountType: AccountType.Seller,
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


export const SocialShopsPostCardPlaceholder: SocialShopPostcardProps[]= [
  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: "http://example.com/photo.jpg",
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "post456",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations:[{
          src:"http://",
          type: PresentationType.Image
        }],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: {amount:11,id:"432",units:4},
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  }
]
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
