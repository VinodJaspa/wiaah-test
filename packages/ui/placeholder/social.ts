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

import {
  Profile,
  ProfileVisibility,
  ProductCondition,
  ProductSize,
  ProductStatus,
  ProductUsageStatus,
  VisibilityEnum,
  Discount,
  StoryType,
  ProfileReachedGender,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  AttachmentType,
  StoreType,
  Story,
} from "@features/API";

import { products } from "./products";
import { baseUri } from "uris";
import { randomNum } from "../components/helpers/randomNumber";
import {
  ActiveStatus,
  AffiliationStatus,
  BusinessType,
  CashbackType,
  PresentationType,
  RestaurantDishType,
  ServiceType,
  StoreFor,
} from "@features/API";
import {
  GetAccountSettingsQueryQuery,
  GetProductDetailsQuery,
  GetProfileByIdQuery,
  GetUserSavesCollectionsQuery,
  GetProfileStoryQuery,
  ServicePostData,
  SocialAffiliationCardProps,
  SocialShopPostcardProps,
  SocialServicesPostCardProps,
} from "..";

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


const images: string[] = [
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75",
  "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
  "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
  "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
  "https://s3-alpha-sig.figma.com/img/9a6b/9d53/520037c4554bb0fafaf1720032c98450?Expires=1682899200&Signature=QojH1LH3MZvXEeSq5j-CcP07pZ2UmtROix89OEGqqDqeDoOarEhLTL3nNcmNCRXDic5JEff2~Zn9gSiCiz25glcHAhaSz59sJm0FE~1zvCjquL5LswsENsBWHzLNS8I2EfhiwiI5zP2luZakbYprQOlC9bTgvQA8kTNNrA1-QvWr80Q97Qqc8kKfhDCnyFNiZaUoA5psm~0G30~CY56vIX3enJBmpJ6T3hQsIZFOEzeONe8BUU9WwBV26uVOE-cCV6qCeCw8xr6FyAeXpyr3xLwwsSA5CT127byYSkLTWMCSk9QUy1AvOhSKmyyy5qppGVaJugJtFY8GyxpMypo9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/eb32/093d/4ae103dd3d9ffa5196218c1a1b4f2fef?Expires=1682899200&Signature=dbjIuCXIkTDWDicvRMCjrI-D8fZR0f3iL12yGiM91891DXVg8BjleWb-HWjdVvee5wtBzRLuov365UstnZdKlMJ6fnJfFy0O2Yba-tQcxTIU~-IngfFrJeR9~WhCSqX4rZ-cHkyvwnM89J-zF2ZirBzRiOB-uc-y8uE6IngZszClRJOJhlzmJ53cxJZ0~cWy~3ded9bNWR2x2FS0VW6Z7pBwztXQmFApinzQzIgas9edisdlrJgrpt16C3fgvNWbR974FXky86IMv5l~v3VqDTTz1-0k1msz-luKi-ath9caa2L1fg~nAy8VcVAMZzm9PfR046Jf2tgxsGMdXglmcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/bb8d/1b11/0d08803e1df10edec74f85a0d3922ffa?Expires=1682899200&Signature=EOXpIkIZUVZE5J5XrTtbdWuTIPB3Ylwl38Z9yINFAAOWV3o9QYhXkNgwsD8D9Io8GzF7BUexaGfaHfBCJyDFxGqNDncZAxZoVt118oEaQAO0TM~CrNZuky9NMAM-rhc0x16~S4h~2m5RRb9rq3VSWydjAmDAltNjJGKFOXryW1CSjZmPozrCAjrIAc11AusSFbqPlVnp7APfnqAruUq0EZZcrvv482e5t-3rwNt9WYZXVeshSQiKksWmGzkpyIv6Q72Zz~pb424zBn68G82eqarYWmokZOi5WbxvV6XzGshXVtbWRGzRvJAPoIWjCN3jBKAeByZcnwWY0bQNasUApg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/eec5/e51b/19609c49b01f0dc4aeca6adf5efe3a5c?Expires=1682899200&Signature=YlChDQN8ottDR6fexVTL7kbssQoS8qQ-sCNnNQNmFiobUQKx7zLCmpOiqr~ClXlf7CLRLg1eh8UO~vCrERZhzFMT-1-yjvU6Lpc-wK7wi4tfPfKVuRsVVMKjJ8vlwqy3xRwISqmYY4Y0~97hclNArlDDSAtOHDM9fO3ztyubZDmRaQHggsjXbEgTX0gEA6IRWET5~FHasAoYzuFqvC2lz5nkjSDS4fo9Ufkf8yy5Y0RfreZ8u-VzFupfBe89JSmhPPPh-Qje5yfJvRm3GVqgqUPD4mo0sgXxRhDNxIfvPL55DfNN5wOvhIkxiPhiTuLoflRCsdjUpf1kbptkiKAg0w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/39b9/b5f3/950799f836c48d4d0f9f8b3b9f628881?Expires=1682899200&Signature=UNuN16fYPst6zVj4DC~Fdh3gO94T49ncWd5~3W7f~uNpoJBEf0DhPcvABhFGyVdsKoTeaEnp0DgFfnG59VdUd5xdox1QpzQmmox1iXgpOVFDmbIcW0a5H1QLqLFqnpPAytEXVkVee33EXa9WEYajB3Wo2uSjhUyeMaSF5mXu54VjtG5-j5XUauuaqUvgzEEE9vRHEjA~G19uG3A675EEfcwCvBGuIosgpoAZx19DwgYRp5hGNqkWmRxo0EuADfpPIHQAQ648k8WOX9CJfSzdRd~1cuFcvtyi-ZNjhEc5FeyOP2BDEN1QBOvp4h9lcs7ALXahUrjYuKA9hDhfaAKF8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/53f1/a90f/623b563353039598ce666905f73baed3?Expires=1682899200&Signature=l1WpsxsuzfxGX~eHdhu-5UAmqgpvlzcy5f2W7~~ntCO4cxm8nM0VA9JRqyD-3O~vfUW4kbsUWRPxKkluxK5AJ2dyY5UOAbNus8sRK3T1daailculZKm7m-I2WjLq-uBzoMsPJ7XZ2dHF9fHchrlaAdCQ5cUd66zTK9gZLvwlRtuvPC8GAkoeKoNOK70uNaaeIaJ2W-tanfra22qvojX1JvWu091u6O4-jDjQT14S~5iGNE38Xi5Q0QOAGHBBudyRnJdsdN-wqSnnKlUTqNGKuFItZE5YP4LDCqVCvsW1dgLnngfggM4oE9uwpqbbJsHpbkhNy39dwKJeSpjSa7Grnw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/97a9/06e5/d0c5f29eef198d74a28e2218d380ffda?Expires=1682899200&Signature=NE1XPdieU1ZJ7vktFMg5DNliKhoKEJbn0GWyATBBQsi1XvaYSqRKkx0pIq33DP9qmOEnp4WhktsxeWYKokAjqx36GVhkn8ZpU0tBQyjF7Ejg0S4Efdw9RGEIDXOBOZ-YlC4PT1q4ra2V2j67N9qDskJqtYZi4E5jNi4c0TxrRRxXOW4g6DiDHczc4o-iAiV51G2hCjKXftlTnDXB9GkuUVLIBQsEs0fMuk3hLm2Qlk9oQHiORKstGgtVuin-S33xxWEVw0tFuB1yLxQ2xw-bQ7nfLUJ9IpLFTOKkS3xklM40aEBdUDWUhfUGOrn~7t1btv9UEpqYBQwvNjautiyvcg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/05ea/9ba2/4377675f8789e9e888fd1bfcfd67d718?Expires=1682899200&Signature=hIVHcPNZ1vNJI4iAMjHpuHiHOJioegBmoNv1aTu3sr6Ut-JJI9w~1SOvfrKlq9SL-NJFX~fRvORjiHFq7oerIP2zLjPcIirRqUtNbBcTvUmIb9nHI56VyovssHEuu8Yc7nBG5Cxi4cWAMC5M-zDJ~v2-xN8bNK-9hHPYtJvaSBAiKU~fLU2SutofpCUi3H-Oec7gqYuvbAlzE1Fmjcuiwvad7OjZ4VH5Pb2l8di5pT-Lp3ZLzXdisNnMITrLI9G9~xKMbURf47Xe8IfxDno8s4eKiIBslc7C4eUTMSVi7LZHVPf48483cEOmQ4JNY~2t6A6cNGJg769hxb7Qi9XIxQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/7cf0/e945/e740fd07bfbf0de9f6c459e3fc7d646e?Expires=1682899200&Signature=jrnUf6fPSpsqoybede2IRPs0RadLvjlR36e8o-qHrFat61WAPQE4iu2oXvUS-IrhVZdlGoziyaEanATX8IZ3z5RMcDgKgyF7SLmCOA~td2cT4sur2bvsZmJ4XGSkKg3FCP-xv5CshyhdGgmEGYYbG8poi4X7WpRAMnrrOtRXQwa2OgIOHpHmWSomg2cNrunUGNlsWbdPEE6~L7GolOK1a88wwSJQ6XxY7Uyp9jHc5THHylJwyOQA5hNYtnr65z5e91y826PyLLvUJQbpQ7LcU3-SwOwo4CDASjjbHr4hj7BSsDbWQFtrne3yI2IJHag3Djq5uxQw65pt2z2-Uy4XQA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
  "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg?anchor=center&mode=crop&width=1200&height=630"
,
];

export const vehiclePh = [
  "https://d.newsweek.com/en/full/2203419/2023-ford-expedition.jpg?w=1600&h=1600&q=88&f=1f6dd5c5cc318e1239e31777f34a50d2",
];

export const rentalsPh = [
  "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?b=1&s=612x612&w=0&k=20&c=vcCQ5L9Tt2ZurwFhtodR6njSUnMsEn_ZqEmsa0hs9lM=",
];

export const getRandomServiceImage = (
  type: ServiceType,
  menuType?: RestaurantDishType,
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
    postType: "service", // or, "product"
    views: 56300,
    numberOfShares: 13,
    id: "1",
    tags: ["mood", "new"],
    thumbnail:
      "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
    content:
      "Lorem ipsum dolor sectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium.",
    numberOfComments: 5,
    numberOfLikes: 7,
    attachments: [
      {
        type: "image",
        src: getRandomImage(),
      },
      {
        src: getRandomImage(),
        type: "video",
      },
      {
        src: getRandomImage(),
        type: "image",
      },
      {
        src: getRandomImage(),
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
    thumbnail: getRandomImage(),
    accountType: AccountType.Seller,
    public: true,
  },
};
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
  createdAt: "2023-05-05",
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
      type: "image",
      src: getRandomImage(),
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

export const AffiliationPostListPlaceholder: SocialAffiliationCardProps["post"][] =
  [
    {
      id: "post1",
      userId: "user1",
      affiliationId: "aff1",
      views: 1000,
      reactionNum: 150,
      shares: 20,
      comments: 30,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        status: AffiliationStatus.Active,
        //@ts-ignore
        product: {
          brand: "ExampleBrand",
          cashbackId: "cashback1",
          categoryId: "category1",
          colors: ["Red", "Blue", "Green"],
          condition: ProductCondition.New,
          createdAt: new Date().toISOString(),
          description: "This is a placeholder description for the product.",
          discount: {
            amount: 33,
            id: "44",
            units: 3,
          },
          id: "product1",
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 98,
          presentations: [
            { src: getRandomImage(), type: PresentationType.Image },
          ],
          price: 299.99,
          rate: 5,
          reviews: 120,
          sales: 50,
          saved: true,
          sellerId: "seller1",
          shippingRulesIds: ["rule1", "rule2"],
          stock: 100,
          thumbnail: getRandomImage(),
          title: "Placeholder Product Title",
          todayProductClickId: "click1",
          totalDiscounted: 10,
          totalDiscountedAmount: 2999,
          totalOrdered: 50,
          unitsRefunded: 1,
          updatedAt: new Date().toISOString(),
          vat: 20.0,
          vendor_external_link: "https://example.com/vendor-link",
          visibility: VisibilityEnum.Hidden,
        },
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner1",
        },
      },
    },

    {
      id: "post1",
      userId: "user1",
      affiliationId: "aff1",
      views: 1000,
      reactionNum: 150,
      shares: 20,
      comments: 30,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        status: AffiliationStatus.Active,
        //@ts-ignore
        product: {
          brand: "ExampleBrand",
          cashbackId: "cashback1",
          categoryId: "category1",
          colors: ["Red", "Blue", "Green"],
          condition: ProductCondition.New,
          createdAt: new Date().toISOString(),
          description: "This is a placeholder description for the product.",
          discount: {
            amount: 33,
            id: "44",
            units: 3,
          },
          id: "product1",
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 98,
          presentations: [
            { src: getRandomImage(), type: PresentationType.Image },
          ],
          price: 299.99,
          rate: 5,
          reviews: 120,
          sales: 50,
          saved: true,
          sellerId: "seller1",
          shippingRulesIds: ["rule1", "rule2"],
          stock: 100,
          thumbnail: getRandomImage(),
          title: "Placeholder Product Title",
          todayProductClickId: "click1",
          totalDiscounted: 10,
          totalDiscountedAmount: 2999,
          totalOrdered: 50,
          unitsRefunded: 1,
          updatedAt: new Date().toISOString(),
          vat: 20.0,
          vendor_external_link: "https://example.com/vendor-link",
          visibility: VisibilityEnum.Hidden,
        },
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner1",
        },
      },
    },

    {
      id: "post1",
      userId: "user1",
      affiliationId: "aff1",
      views: 1000,
      reactionNum: 150,
      shares: 20,
      comments: 30,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        status: AffiliationStatus.Active,
        //@ts-ignore
        product: {
          brand: "ExampleBrand",
          cashbackId: "cashback1",
          categoryId: "category1",
          colors: ["Red", "Blue", "Green"],
          condition: ProductCondition.New,
          createdAt: new Date().toISOString(),
          description: "This is a placeholder description for the product.",
          discount: {
            amount: 33,
            id: "44",
            units: 3,
          },
          id: "product1",
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 98,
          presentations: [
            { src: getRandomImage(), type: PresentationType.Image },
          ],
          price: 299.99,
          rate: 5,
          reviews: 120,
          sales: 50,
          saved: true,
          sellerId: "seller1",
          shippingRulesIds: ["rule1", "rule2"],
          stock: 100,
          thumbnail: getRandomImage(),
          title: "Placeholder Product Title",
          todayProductClickId: "click1",
          totalDiscounted: 10,
          totalDiscountedAmount: 2999,
          totalOrdered: 50,
          unitsRefunded: 1,
          updatedAt: new Date().toISOString(),
          vat: 20.0,
          vendor_external_link: "https://example.com/vendor-link",
          visibility: VisibilityEnum.Hidden,
        },
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner1",
        },
      },
    },
    {
      id: "post1",
      userId: "user1",
      affiliationId: "aff1",
      views: 1000,
      reactionNum: 150,
      shares: 20,
      comments: 30,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        status: AffiliationStatus.Active,
        //@ts-ignore
        product: {
          brand: "ExampleBrand",
          cashbackId: "cashback1",
          categoryId: "category1",
          colors: ["Red", "Blue", "Green"],
          condition: ProductCondition.New,
          createdAt: new Date().toISOString(),
          description: "This is a placeholder description for the product.",
          discount: {
            amount: 33,
            id: "44",
            units: 3,
          },
          id: "product1",
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 98,
          presentations: [
            { src: getRandomImage(), type: PresentationType.Image },
          ],
          price: 299.99,
          rate: 5,
          reviews: 120,
          sales: 50,
          saved: true,
          sellerId: "seller1",
          shippingRulesIds: ["rule1", "rule2"],
          stock: 100,
          thumbnail: getRandomImage(),
          title: "Placeholder Product Title",
          todayProductClickId: "click1",
          totalDiscounted: 10,
          totalDiscountedAmount: 2999,
          totalOrdered: 50,
          unitsRefunded: 1,
          updatedAt: new Date().toISOString(),
          vat: 20.0,
          vendor_external_link: "https://example.com/vendor-link",
          visibility: VisibilityEnum.Hidden,
        },
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner1",
        },
      },
    },
  ];

export const AffiliationPostPlaceholder: SocialAffiliationCardProps["post"] = {
  id: "post1",
  userId: "user1",
  affiliationId: "aff1",
  views: 1000,
  reactionNum: 150,
  shares: 20,
  comments: 30,
  createdAt: new Date().toISOString(),
  affiliation: {
    id: "aff1",
    commision: 10,
    createdAt: new Date().toISOString(),
    itemId: "item1",
    itemType: "product",
    status: AffiliationStatus.Active,
    //@ts-ignore
    product: {
      brand: "ExampleBrand",
      cashbackId: "cashback1",
      categoryId: "category1",
      colors: ["Red", "Blue", "Green"],
      condition: ProductCondition.New,
      createdAt: new Date().toISOString(),
      description: "This is a placeholder description for the product.",
      presentations: [{ src: getRandomImage(), type: PresentationType.Image }],
      discount: {
        amount: 33,
        id: "44",
        units: 3,
      },
      id: "product1",
      isExternalProduct: false,
      isExternalShopping: false,
      negitiveFeedback: 2,
      positiveFeedback: 98,
      price: 299.99,
      rate: 5,
      reviews: 120,
      sales: 50,
      saved: true,
      sellerId: "seller1",
      shippingRulesIds: ["rule1", "rule2"],
      stock: 100,
      thumbnail: getRandomImage(),
      title: "Placeholder Product Title",
      todayProductClickId: "click1",
      totalDiscounted: 10,
      totalDiscountedAmount: 2999,
      totalOrdered: 50,
      unitsRefunded: 1,
      updatedAt: new Date().toISOString(),
      vat: 20.0,
      vendor_external_link: "https://example.com/vendor-link",
      visibility: VisibilityEnum.Hidden,
    },
  },
  user: {
    profile: {
      id: "user1",
      username: "john_doe",
      verified: true,
      photo: getRandomImage(),
      ownerId: "owner1",
    },
  },
};

export const newsfeedPosts: PostCardInfo[] = [
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: "1",
      thumbnail:
        "https://images.pexels.com/photos/30781075/pexels-photo-30781075/free-photo-of-sunlit-historical-building-facade-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      attachments: [
        {
          type: "image",
          src: getRandomImage(),
          postLocation: "New York",
        },
        {
          src: getRandomImage(),
          type: "image",
        },
        {
          src: getRandomImage(),
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
            src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/30117400/pexels-photo-30117400/free-photo-of-silhouette-of-surfer-at-sunset-in-taghazout.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      attachments: [
        {
          src: getRandomImage(),
          type: "image",
          postLocation: "New York",
        },
        {
          type: "image",
          src: getRandomImage(),
          postLocation: "New York",
        },
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/30491755/pexels-photo-30491755/free-photo-of-majestic-green-mountain-ridge-in-martinique.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "3",
      attachments: [
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/30157461/pexels-photo-30157461/free-photo-of-elegant-interior-of-markgrafliches-opernhaus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "4",
      attachments: [
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/30349922/pexels-photo-30349922/free-photo-of-woman-in-white-dress-near-cliffside-lighthouse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "5",
      attachments: [
        {
          src: getRandomImage(),
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
            src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/29749800/pexels-photo-29749800/free-photo-of-tropical-leaves-on-velvet-background-with-dew.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "6",
      attachments: [
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/30652897/pexels-photo-30652897/free-photo-of-woman-holding-yellow-chrysanthemum-in-soft-light.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "7",
      attachments: [
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/29847092/pexels-photo-29847092/free-photo-of-icelandic-landscape-at-sunset-with-jimny.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "8",
      attachments: [
        {
          src: getRandomImage(),
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
      thumbnail:
        "https://images.pexels.com/photos/15661147/pexels-photo-15661147/free-photo-of-a-scooter-parked-in-front-of-a-store-with-purple-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "9",
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
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      thumbnail:
        "https://images.pexels.com/photos/1083807/pexels-photo-1083807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "10",
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
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      thumbnail:
        "https://images.pexels.com/photos/2825033/pexels-photo-2825033.jpeg?auto=compress&cs=tinysrgb&w=600",
      id: "11",
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
  {
    profileInfo: PostCardPlaceHolder.profileInfo,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      thumbnail:
        "https://images.pexels.com/photos/27081007/pexels-photo-27081007/free-photo-of-close-up-of-a-woman-wearing-brown-leather-shoes.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      id: "12",
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
  }

];
const morePosts = generateMockPosts(100);
newsfeedPosts.push(...morePosts);
function generateMockPosts(count: number): PostCardInfo[] {
  const locations = ["New York", "Paris", "Tokyo", "Barcelona", "Rome", "Berlin", "Sydney"];
  const contents = [
    "Just another day in paradise.",
    "Loving this view!",
    "Nature at its best.",
    "Exploring new cities!",
    "Sunset moments.",
    "Captured the vibes perfectly.",
    "Weekend getaway vibes.",
  ];

  const generatedPosts: PostCardInfo[] = [];

  for (let i = 1; i <= count; i++) {
    const postId = `${100 + i}`; // Ensure new IDs
    const postLocation = locations[Math.floor(Math.random() * locations.length)];
    const content = contents[Math.floor(Math.random() * contents.length)];

    const attachments = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      src: getRandomImage(),
      type: "image",
      postLocation,
    }));

    const comments = Array.from({ length: Math.floor(Math.random() * 4) }, () => ({
      ...PostCommentPlaceholder,
      user: getRandomUser(),
      content: "Nice shot!",
      attachment: Math.random() > 0.5
        ? {
            src: getRandomImage(),
            type: "image",
          }
        : null,
    }));

    const post: PostCardInfo = {
      profileInfo: PostCardPlaceHolder.profileInfo,
      postInfo: {
        ...PostCardPlaceHolder.postInfo,
        id: postId,
        thumbnail: getRandomImage(),
        attachments,
        content,
        comments,
        tags: [],
      },
    };

    generatedPosts.push(post);
  }

  return generatedPosts;
}


export const ProfilePlaceholder: Profile = {
  __typename: "Profile",
  activeStatus: ActiveStatus.Active,
  bio: "This is a placeholder bio for the user.",
  coverPhoto: "https://example.com/cover-photo.jpg",
  createdAt: new Date().toISOString(),
  followers: 100,
  followersData: [
    {
      followedAt: new Date().toISOString(),
      followerUserId: "user3",
      followingUserId: "user4",
      id: "follow2",
    },
    {
      followedAt: new Date().toISOString(),
      followerUserId: "user1",
      followingUserId: "user2",
      id: "follow1",
    },
  ],
  following: 50,
  followingData: [
    {
      followedAt: new Date().toISOString(),
      followerUserId: "user1",
      followingUserId: "user2",
      id: "follow1",
    },
    {
      followedAt: new Date().toISOString(),
      followerUserId: "user1",
      followingUserId: "user2",
      id: "follow1",
    },
  ],
  id: "profile1",
  lastActive: new Date().toISOString(),
  newStory: true,
  ownerId: "owner1",
  photo: getRandomImage(),
  profession: "Software Developer",
  publications: 5,
  updatedAt: new Date().toISOString(),
  username: "John Doe",
  verified: true,
  visibility: ProfileVisibility.Public,
  visits: 1000,
};
export const stringplaceholder =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nostrum nulla rem excepturi unde iusto voluptatum tempora accusantium ducimus laborum, repellat tempore mollitia error animi doloribus eum inventore voluptate ab.";
const getRandomType = (): "service" | "product" =>
  randomNum(10) > 4 ? "product" : "service";

export const SocialServicePostCardPlaceholder: SocialServicesPostCardProps[] = [
  {
    profileInfo: {
      id: "profile123",
      username: "john_doe",
      photo: getRandomImage(),
      profession: "Software Engineer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "1",
      reactionNum: 120,
      shares: 35,
      views: 1020,
      comments: 18,
      service: {
        thumbnail: getRandomImage(),
        title: "Cleaning",
        hashtags: ["#cleaning", "#home", "#service"],
      },
    },
    discount: 15,
    price: 100,
    cashback: 5,
  },
  {
    profileInfo: {
      id: "profile789",
      username: "jane_smith",
      photo: getRandomImage(),
      profession: "Graphic Designer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "2",
      reactionNum: 250,
      shares: 50,
      views: 2000,
      comments: 45,
      service: {
        thumbnail: getRandomImage(),
        title: "Graphic Design",
        hashtags: ["#design", "#graphics", "#service"],
      },
    },
    discount: 10,
    price: 200,
    cashback: 20,
  },
  {
    profileInfo: {
      id: "profile456",
      username: "michael_brown",
      photo: getRandomImage(),
      profession: "Photographer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "3",
      reactionNum: 80,
      shares: 20,
      views: 800,
      comments: 10,
      service: {
        thumbnail: getRandomImage(),
        title: "Photography",
        hashtags: ["#photography", "#photo", "#service"],
      },
    },
    discount: 5,
    price: 150,
    cashback: 10,
  },

  {
    profileInfo: {
      id: "profile123",
      username: "john_doe",
      photo: getRandomImage(),
      profession: "Software Engineer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "4",
      reactionNum: 120,
      shares: 35,
      views: 1020,
      comments: 18,
      service: {
        thumbnail: getRandomImage(),
        title: "Cleaning",
        hashtags: ["#cleaning", "#home", "#service"],
      },
    },
    discount: 15,
    price: 100,
    cashback: 5,
  },

  {
    profileInfo: {
      id: "profile123",
      username: "john_doe",
      photo: getRandomImage(),
      profession: "Software Engineer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "5",
      reactionNum: 120,
      shares: 35,
      views: 1020,
      comments: 18,
      service: {
        thumbnail: getRandomImage(),
        title: "Cleaning",
        hashtags: ["#cleaning", "#home", "#service"],
      },
    },
    discount: 15,
    price: 100,
    cashback: 5,
  },

  {
    profileInfo: {
      id: "432",
      username: "john_doe",
      photo: getRandomImage(),
      profession: "Software Engineer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "6",
      reactionNum: 120,
      shares: 35,
      views: 1020,
      comments: 18,
      service: {
        thumbnail: getRandomImage(),
        title: "Cleaning",
        hashtags: ["#cleaning", "#home", "#service"],
      },
    },
    discount: 15,
    price: 100,
    cashback: 5,
  },
];

export const SocialActionsCardPlaceholder = [
  {
    id: "1",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "230",
    description: "This is a short video description.",
  },
  {
    id: "2",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "450",
    description: "This is a short video description.",
  },
  {
    id: "3",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "1100",
    description: "This is a short video description.",
  },
  {
    id: "4",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
  {
    id: "5",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
  {
    id: "6",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
  {
    id: "7",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
  {
    id: "8",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
];

export const SocialShopsPostCardPlaceholder: SocialShopPostcardProps[] = [
  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "1",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "2",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "3",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "4",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "5",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "6",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },
  {
    profileInfo: {
      id: "user123",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "7",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
            type: PresentationType.Image,
          },
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },
  {
    profileInfo: {
      id: "user33",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "8",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product7589",
        presentations: [
          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },

          {
            src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },

  {
    profileInfo: {
      id: "user223",
      verified: true,
      photo: getRandomImage(),
      username: "john_doe",
      profession: "Software Developer",
    },
    postInfo: {
      id: "9",
      comments: 10,
      shares: 5,
      reactionNum: 100,
      userId: "user123",
      createdAt: "2023-04-04",
      product: {
        id: "product789",
        presentations: [
          {
            src: "https://www.kayak.com/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true",
            type: PresentationType.Image,
          },
        ],
        title: "Awesome Product",
        hashtags: ["#awesome", "#product"],
        price: 99.99,
        cashback: {
          amount: 20,
          id: "cashback123",
          type: CashbackType.Cash,
          units: 5,
        },
        discount: { amount: 11, id: "432", units: 4 },
      },
    },
    onInteraction: (interaction) => {
      console.log("User interaction:", interaction);
    },
  },
];
export const ShopCardsInfoPlaceholder: ShopCardInfo[] = [
  {
    ...shopCardInfoPlaceholder,
    id: "2",
    attachments: [
      {
        src: getRandomImage(),
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
        src: getRandomImage(),
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
        src: getRandomImage(),
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
        src: getRandomImage(),
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

export const ServicePostDataPlaceholder: ServicePostData[] = [
  {
    profileInfo: {
      id: "user123",
      username: "john_doe",
      photo: "https://example.com/photo.jpg",
      profession: "Software Developer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "post456",
      reactionNum: 120,
      shares: 15,
      views: 500,
      comments: 10,
      service: {
        thumbnail: getRandomImage(),
        title: "Web Development Services",
        hashtags: ["#webdev", "#coding", "#programming"],
      },
    },
    discount: 20,
    price: 100,
    cashback: 10,
  },

  {
    profileInfo: {
      id: "user123",
      username: "john_doe",
      photo: "https://example.com/photo.jpg",
      profession: "Software Developer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "post456",
      reactionNum: 120,
      shares: 15,
      views: 500,
      comments: 10,
      service: {
        thumbnail: getRandomImage(),
        title: "Web Development Services",
        hashtags: ["#webdev", "#coding", "#programming"],
      },
    },
    discount: 20,
    price: 100,
    cashback: 10,
  },

  {
    profileInfo: {
      id: "user123",
      username: "john_doe",
      photo: "https://example.com/photo.jpg",
      profession: "Software Developer",
    },
    postInfo: {
      createdAt: new Date().toISOString(),
      id: "post456",
      reactionNum: 120,
      shares: 15,
      views: 500,
      comments: 10,
      service: {
        thumbnail: getRandomImage(),
        title: "Web Development Services",
        hashtags: ["#webdev", "#coding", "#programming"],
      },
    },
    discount: 20,
    price: 100,
    cashback: 10,
  },
];

export const hashtagCardInfoPlaceholder: HashTagCardInfo = {
  title: "Exploring the Outdoors",
  postInfo: {
    createdAt: "2024-01-01T12:00:00Z",
    id: "post1",
    content: "Had an amazing hike today!",
    tags: ["hiking", "nature", "adventure"],
    views: 150,
    attachments: [
      {
        type: "image",
        src: "https://example.com/image1.jpg",
        postLocation: "Mountain Trail",
      },
    ],
    numberOfLikes: 20,
    numberOfComments: 5,
    numberOfShares: 2,
    comments: [
      {
        id: "comment1",
        user: {
          id: "user1",
          verifed: true,
          name: "Jane Doe",
          thumbnail: "https://example.com/user1.jpg",
          accountType: "buyer",
          public: true,
          profession: "Photographer",
        },
        replies: 0,
        likes: 3,
        createdAt: "2024-01-01T12:30:00Z",
        content: "Looks beautiful!",
        attachment: null,
        hashTags: ["nature", "hiking"],
      },
    ],
    thumbnail: "https://example.com/thumbnail1.jpg",
  },
  profileInfo: {
    id: "profile1",
    verifed: true,
    name: "John Smith",
    thumbnail: "https://example.com/profile1.jpg",
    accountType: "seller",
    public: true,
    profession: "Travel Blogger",
    photo: "https://example.com/photo1.jpg",
  },
};

export const hashTagCardsInfoPlaceholder: HashTagCardInfo[] = [
  {
    title: "Exploring the Outdoors",
    postInfo: {
      createdAt: "2024-01-01T12:00:00Z",
      id: "post1",
      content: "Had an amazing hike today!",
      tags: ["hiking", "nature", "adventure"],
      views: 150,
      attachments: [
        {
          type: "image",
          src: "https://example.com/image1.jpg",
          postLocation: "Mountain Trail",
        },
      ],
      numberOfLikes: 20,
      numberOfComments: 5,
      numberOfShares: 2,
      comments: [
        {
          id: "comment1",
          user: {
            id: "user1",
            verifed: true,
            name: "Jane Doe",
            thumbnail: "https://example.com/user1.jpg",
            accountType: "buyer",
            public: true,
            profession: "Photographer",
          },
          replies: 0,
          likes: 3,
          createdAt: "2024-01-01T12:30:00Z",
          content: "Looks beautiful!",
          attachment: null,
          hashTags: ["nature", "hiking"],
        },
      ],
      thumbnail: "https://example.com/thumbnail1.jpg",
    },
    profileInfo: {
      id: "profile1",
      verifed: true,
      name: "John Smith",
      thumbnail: "https://example.com/profile1.jpg",
      accountType: "seller",
      public: true,
      profession: "Travel Blogger",
      photo: "https://example.com/photo1.jpg",
    },
  },
  {
    title: "Delicious Recipes",
    postInfo: {
      createdAt: "2024-02-14T08:00:00Z",
      id: "post2",
      content: "Sharing my favorite dessert recipe!",
      tags: ["cooking", "dessert", "recipe"],
      views: 300,
      attachments: [
        {
          type: "video",
          src: "https://example.com/video1.mp4",
        },
      ],
      numberOfLikes: 50,
      numberOfComments: 10,
      numberOfShares: 5,
      comments: [
        {
          id: "comment2",
          user: {
            id: "user2",
            verifed: false,
            name: "Alice Johnson",
            thumbnail: "https://example.com/user2.jpg",
            accountType: "buyer",
            public: true,
            profession: "Chef",
          },
          replies: 1,
          likes: 10,
          createdAt: "2024-02-14T09:00:00Z",
          content: "Can't wait to try this!",
          attachment: null,
          hashTags: ["cooking", "dessert"],
        },
      ],
      thumbnail: "https://example.com/thumbnail2.jpg",
    },
    profileInfo: {
      id: "profile2",
      verifed: false,
      name: "Emily Davis",
      thumbnail: "https://example.com/profile2.jpg",
      accountType: "buyer",
      public: true,
      profession: "Food Blogger",
      photo: "https://example.com/photo2.jpg",
    },
  },
];
const placeholderProfileDetails = {
  id: "profile1",
  username: "johndoe",
  photo: getRandomImage(),
  bio: "This is a bio.",
};

const placeholderUserRawShop = {
  id: "shop1",
  storeType: StoreType.Service,
  type: ServiceType.Hotel,
  businessType: BusinessType.Company,
  storeFor: [StoreFor.Men],
  phone: "123-456-7890",
  description: [
    {
      langId: "en",
      value: "An electronic shop",
    },
    {
      langId: "es",
      value: "Una tienda de electrónicos",
    },
  ],
  name: [
    {
      langId: "en",
      value: "ElectroShop",
    },
    {
      langId: "es",
      value: "TiendaElectro",
    },
  ],
  location: {
    city: "New York",
    country: "USA",
    address: "123 Main St",
    state: "NY",
    postalCode: "10001",
  },
};
const placeholderUserAccount = {
  id: "account1",
  firstName: "John",
  lastName: "Doe",
  companyRegisterationNumber: "123456789",
  phone: "123-456-7890",
};

export const GetProfileQueryPlaceholder: GetAccountSettingsQueryQuery = {
  getProfileDetails: placeholderProfileDetails,
  getUserRawShop: placeholderUserRawShop,
  getUserAccount: placeholderUserAccount,
};

export const GetUserSocialStoryPlaceHolder: Story = {
  id: "1",
  content: "This is a sample story content.",
  createdAt: "2024-06-01T12:00:00Z",
  publisherId: "123",
  reactionsNum: 10,
  type: StoryType.Base,
  updatedAt: "2024-06-10T12:00:00Z",
  viewsCount: 150,
  views: [
    {
      createdAt: "2024-06-02T12:00:00Z",
      gender: ProfileReachedGender.Male,
      id: "1",
      storyId: "1",
      viewerId: "viewer1",
    },
    {
      createdAt: "2024-06-03T14:00:00Z",
      gender: ProfileReachedGender.Female,
      id: "2",
      storyId: "1",
      viewerId: "viewer2",
    },
  ],
};

export const PorductDetailsPlaceHolder: GetProductDetailsQuery["getProduct"] = {
  id: "prod_123456",
  price: 49.99,
  title: "Sample Product",
  sizes: [ProductSize.Xl],
  colors: ["green"],
  seller: {
    __typename: "Account",
    profile: {
      __typename: "Profile",
      id: "2",
      username: "seller123",
      verified: true,
      photo: getRandomImage(),
    },
  },
  presentations: [
    {
      src: getRandomImage(),
      type: PresentationType.Image,
    },
    {
      src: getRandomImage(),

      type: PresentationType.Image,
    },
    {
      src: getRandomImage(),

      type: PresentationType.Image,
    },
  ],
  attributes: [
    {
      __typename: "ProductAttribute",
      id: "2",
      displayType: ProductAttributeDisplayType.Text,
      name: "Color",
      selectionType: ProductAttributeSelectionType.Single,
      values: [
        {
          __typename: "ProductAttributeValue",
          id: "attr_val_1",
          price: 0,
          name: "Red",
          value: "red",
        },
        {
          __typename: "ProductAttributeValue",
          id: "attr_val_2",
          price: 0,
          name: "Blue",
          value: "blue",
        },
      ],
    },
    {
      __typename: "ProductAttribute",
      id: "34",
      displayType: ProductAttributeDisplayType.Text,
      name: "Size",
      selectionType: ProductAttributeSelectionType.Single,
      values: [
        {
          __typename: "ProductAttributeValue",
          id: "attr_val_3",
          price: 5,
          name: "Small",
          value: "S",
        },
        {
          __typename: "ProductAttributeValue",
          id: "attr_val_4",
          price: 5,
          name: "Medium",
          value: "M",
        },
        {
          __typename: "ProductAttributeValue",
          id: "attr_val_5",
          price: 5,
          name: "Large",
          value: "L",
        },
      ],
    },
  ],
};

// export const GetProfileByIdPlaceholder: GetProfileByIdQuery["getProfile"] = {
//   activeStatus: ActiveStatus.Active,
//   bio: "This is a sample bio",
//   createdAt: "2023-01-01T00:00:00Z",
//   followers: 123,
//   following: 456,
//   id: "profile-1",
//   lastActive: "2024-06-15T00:00:00Z",
//   ownerId: "owner-1",
//   photo: "http://example.com/photo.jpg",
//   profession: "Software Developer",
//   publications: 10,
//   updatedAt: "2024-06-15T00:00:00Z",
//   username: "sampleUser",
//   visibility: ProfileVisibility.Public,
//   verified: true,
//   user: {
//     id: "account-1",
//     verified: true,
//     accountType: AccountType.Mod,
//     shop: {
//       type: ServiceType.Hotel,
//       storeType: StoreType.Service,
//       id: "shop-1",
//     },
//   },
//   isFollowed: true,
// };
//
// export const GetUserSavedCollectionPlaceholder: GetUserSavesCollectionsQuery["getUserSaveCollections"] =
//   [
//     {
//       __typename: "SavesCollection",
//       id: "collection-1",
//       name: "Collection 1",
//       recentSaves: [
//         {
//           __typename: "UserSavedPost",
//           post: {
//             __typename: "NewsfeedPost",
//             thumbnail: "http://example.com/thumbnail1.jpg",
//           },
//         },
//         {
//           __typename: "UserSavedPost",
//           post: {
//             __typename: "NewsfeedPost",
//             thumbnail: "http://example.com/thumbnail2.jpg",
//           },
//         },
//       ],
//     },
//     {
//       __typename: "SavesCollection",
//       id: "collection-2",
//       name: "Collection 2",
//       recentSaves: [
//         {
//           __typename: "UserSavedPost",
//           post: {
//             __typename: "NewsfeedPost",
//             thumbnail: "http://example.com/thumbnail3.jpg",
//           },
//         },
//         {
//           __typename: "UserSavedPost",
//           post: {
//             __typename: "NewsfeedPost",
//             thumbnail: "http://example.com/thumbnail4.jpg",
//           },
//         },
//       ],
//     },
//   ];
