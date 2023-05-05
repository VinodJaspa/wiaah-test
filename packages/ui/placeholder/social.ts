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

import { products } from "./products";
import { baseUri } from "uris";
import { randomNum } from "../components/helpers/randomNumber";
import { RestaurantDishType, ServiceType } from "@features/API";
const images: string[] = [
  "https://s3-alpha-sig.figma.com/img/e856/9138/41df01d0b20fdd89af56a45478e0ab34?Expires=1684108800&Signature=XpB7ESq-bVAn~iYu0QhH-b~Mh6qtlRfRO6Bdnk~h0qnmOVnQYwUX4-FyV7HiLWdfPXeFFy9q0W5ei-x-ZncSHDz7ebtYr4zjP2zYdbt4OgS7U~G2wAIppQRNWevBJcUb7zQTPIIUtu~k68U4APwppNFrawIYgeY71lac02DxYN7rTAb5Uru2UYOzMdmK3-BCgGfx0r7ywmp~FjqracWJ65eaiV3Luw6pGJDJYdcAeftaU1ZK7~Buh2t0yxPE1pp-9kFR9ekDozaROgv3u9FS7w4-eX4RHGSU1vcI~AwJWUzJVu49357G2lCN4WoHDzoDKuHSBbfKifbL~8cQNZQDsw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/4fbb/b141/19e9278708c4d149b9896617bb5fb4b3?Expires=1684108800&Signature=NGqaBF4CEbI0x-Pkz3fNO5HQKy6x9T8wIocZ7SDSvndx5BUu1NcoiB2-XFYiFWfv2MWKZedIKeyzogyvhmYug7qr9CXVkWYZ4TMmJMNtLDUH~SCDTrk0FK7Ckt1MVEXtUm21j-Zw9h4avTsXYlIjz6CeqkFLePYWKK58FLfcLjDAxJgMIByGvqVXQHR5H843dwBsESYHeYZj6iF9gjhFSomiNEIKVmf1IrpWHOppbViw~osd0et8ljzW~B12RUf4msp1OjMAC-S0K8CoODFQub-47YHFUmxAU5jjvuPqEASatpSQgTpcqvF8WOla~GcyGMgBVCbRfF~MBtUp3FdOuA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/387a/b9b5/f6b22d70030b421a14da1a36996a5878?Expires=1684108800&Signature=lNkcI1i10boy4hWawzvRqIgUJr4XzIQ7nyakcWpm1Qb2MKLX-ely6ZD-KY4MkuyKRRuz0FZbbVUBxXlYtAiIGLly5ti~LyvBrK3-Zii0YzcLMduYifgVzelOdQAes3Z3mrwrQ4Z9s1gTl1QZWTXSB8TkNkdvpYMOGRKUFTO9ssLSmOBSW8ukPU-N0lGV0LhTeg7qc6fi4vA7q7RrrpJhHxMAD9rrSE7LgTX643uPghuWBwF1fVFDOMfxDyPkc7BCa1eiaxbs-tZpS3A1nN1kO5O-ZI5rT36SaeF1XpwIEz3Ne9XkymarktJ4T33AU1cQDdhYZEAaNjdL3BaQT7yrFQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/6c36/3fa3/0c6a2646d966c6ab3e5020d270b2139a?Expires=1684108800&Signature=USb4RU6m~0hgCUm6~6V8rB63JkyksTVxUkMGbjt3hF4hdfzJKDpEDaE5stFiCtfypuYpBfQekLzJJjhS4wkZ88MU74IkkUN7KZzwxg5D986qGs9VExnOGE8CXom4aF1fyZY52grkgp~eohgOI02mRi7QwOaYLItLAwqHHJ-5OFPWIweRI-9bXlxWoNRm-Tjrz0uNRV47Yb4JQ2VLLEuNZ1PqeAi12e1ShxUL92TqxNHbh1gFL-RS5qSRvxm9ziKz7-9ZmTeXK7XLMkdg9zQpdmtdkr64G-Qh1Wv~VNDljp~MfPSw1fmscHS-YTyHOaKzYLCxNKX0Ece3GWv5oiILuA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/4a0d/f0cf/869b9427684a6358fcdeaf705d904048?Expires=1684108800&Signature=SffwEPS99JFopvOSRXp8RJWAEosV-U3M4eFmd3Hy6DqumccEr9P3i-lTnbjhx4E0D2gbFmktWhNPDIBJt-3RBIEAG0oJ75DHn~SfV1Li9KEHfSZnwlDLFlZQBsAHF5ZiWvOcjrwfX1vRMtyWs6McuysjhWTmcA0A3JxuIr1SvyJ45~fvgSySjQ9msUxP5FZ3zpaJ2CbopqdQsiT9evX3VantaqBIt2SnwyrAOO3Qw4ZFnDntQscMh~863sjD-vvbY68Kjo0ow1tswQh4-LfEBE8ZJLd9xgdibIxh~FUfzb-oHdNhzlV4GzewZlQteG6NQY-OBc-swKpAepwZH-zNLw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/da6b/1d68/c9a96b0a40d63fc7a4f5da81ec0d3cbd?Expires=1684108800&Signature=oSwRnIuvInqB4GnFIZqICDW31UN6WLyCQ7Rwz1nJpkDrFY36Ykjf4rN2HtX52tHkpMXBRV26Rdq70Xd1TaqoRn8ulSu0Ym8kQBYq6NrUJWfB06dGdjUIzDTYJP4KUneCOb7hbeWrs7I8tFUhiB4v76SLeYMnweM9whiuzxitJfThMW-Ny4kFN2l7k3tZXJy3xIOQWMRJireD2DaVcG~g~GHtDL1LVH2J917iwYQwFZ1yOmHnljM7nfkusC3XqWXJXbMsleyCLuJdf0SHVLCYiulzgF-iHgi61KQf8W43emEI-8tVs3p4RNyvq0vlbvj0-iH7AwBPyi3T1YgVFFfrVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/e821/f158/8f5d7632ae73bb86194f37d5eac32176?Expires=1684108800&Signature=cAmlLXApflIZpXjQXrOHxmw6iTHmvYVMRuoADu6q0rscBD1RLp6idnwIRZQ73DVNX~aYh0zE1qtczF2Pe8m8KGIDiA8y-39C1ETLX2b6ni2lmEu5DM7HDKbdZG0eHI3ayi4rDiEOLpgg3yVCq-lu7awaWHC8jLBsCOKvskDBQGo4ZnWu5PA8ms-bAKp4KY8MecjdovUCCUX8eUK1ijg7JqYhOi8V-LWRuI8KAiPALkVMXtzSFFsygO-Qu7BTE1PDL6x0nyM882CWOzhyxiKYw1thSxMPZb27L2Me5DvBoaQUb~xul4f1PyM64Ded77vJK9PNN1d2E3GeOyTUgrjTlg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
  "https://s3-alpha-sig.figma.com/img/0edf/82b0/5225af2d271d79c18497fdd389eb52b5?Expires=1683504000&Signature=BU7lIHHh5t2V-6mbqnpGfEBRS2S2pWcVpBzFn44H~NBHiNPAguZPeQwbwvYF-BuA5efz1b5LnY6Rl9kz~JCQynBug765zMAdAPEHHE6kRUPIceXEF9CY69NskIPuaAV5qHvtSL~g5CYDRtaQf4lIDeujEKvZ0NDVogucWL0ZAknwXfHbeu1e8lpcVO7~06y-5Bqg8y1tj7l7mTgHyE-LBdi1L7GQxOtrhbzPP-UleFMLXy8fMTRYIIp9oe8GkAI-nDKYlyi12zkYU1ttKpx8MfAPXTMNsFnChAaAqXhXCEEIr8srcg9JjPioRfS4fiNa4169UaoRooTCuKx-2RqI0A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/117e/5bb6/55b67a951487d1f12db690b1e5390895?Expires=1683504000&Signature=XyvEjNPv1sSseTS5AZT5C00AXujzpAzJg4qoERNdtfucBjDUwN3ZfAaCQlp7H7zf32PohVcz13cHi7ePY1Fb2qSeLmaioc9aPSKdV-v~3l~Ou1i1rFi4ZVfnatMeTp9kCInZQxCO9vk-6urn~T4B5afncCxSvHJZsE0VQVfjaoas5wUxnzzpjgQCR~UcCTirXU67LtCuYMRjKp0CaqmQvY9hgTd16PMagQ4~GVzocdhDzfCtZEAL-hUsXuE9jY-MNct5D9gOQpzuit8R-fUXnjEXj3tIGBiOxK43XnXa3M5oO3Hblt6x4zBnlUhphBg6gUIn0QtO8oVbqUs~45eEpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/cb33/1c4f/09abc4de078f8ebfd17518ca4af92193?Expires=1683504000&Signature=eMlw9X0FmkfkDXTTZlydtm2CMwW4af2OT023Y3D3h0pjbq9Le1884t0bUbMZ6L8GVA0fCPNx~mFuGIPyuNK5BJWcmmvdgLrZMFOWQcG7gRC7bfUrXMt6gPjQ-9QRNAYpbptaWvLjtRmU8j3sNov~yUisMu2D178R7UK4claajmW1sUv~CMHRrV0QyNb2qxXvOM~63uucfaQKvXuJ~IG~AO1VSI6sf2C94JTjzHhIM5uv7DJHHaam3Czx1WUNr~M4SY4NBsrSwE3~V2BjlE1LUpSS5-tIPwGEAp5yqgMpsVhjeSlOIVyzu-Q9gQLytt7jKg6ZpDY74xDzmtdkHkaaUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
];

export const vehiclePh = [
  "https://s3-alpha-sig.figma.com/img/8612/4a7c/89915ee754d1340d1e79bf636343c9ae?Expires=1683504000&Signature=TfakJDMhqaoiRXidK~x1LC0bkhFUMqx5tAPe3VAnjLc3m9PP9udtPAntIacGGREb54DGSgntcURAuH0bN13UJdywrt3UpotttHDlyB6LKnhfR27qgcS-2v6MiL1Sx7OPwo7As~FmoaLxoSUl2uNXSq3II~S15ub-h~wGeRInZdtx0URGh0Hw7uF0PhEAsAsSNTaml-J777aeo4ot14vNh2csOjCCB6bHFfmkG5kM7B35NFiAoSVVfIrkIbqe9Yw9imbQI2cSvlSN-~2XPG-HqKiBJUiwJ9M8jypI~gtPeiSlaBs01AeynLiXaIfeqGhYQtg-vsPzIxMoRtjEaKE3NA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/44f1/8f4b/d7ed24c2292ab0d365deb788c069d65d?Expires=1683504000&Signature=Zie7CR-PkPDOPllCxS5khdKpNtdK8jFvYWeDSRXXRgwWnCMumw5wD1cqL0wp3UMzKAQdJhPoyqLFX-jyVfa~0kP6FEJsTYNoAH~CeKf4KFjZvtPOQ2EPnIWyWtICv5bL39HdeQrqfd-pd3~JD4j1DfdfiBW41xH0JAXeuhcr5IJM0pToyMCv2gvd-iWAGONj9Z-qqpbDu7SCGVsnDkVqJNbX3TFA1l94fQcjmL00OwSPnsOp0c-j11IkJTejjUOhDCGPTDiuoEsoyGUQNlUG1e5WEL2trl-NlZpGlPGeG0D26JXdIsbTSY74XNRW0Fb-J70mMDE7etsTckusimeJmw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
];

export const rentalsPh = [
  "https://s3-alpha-sig.figma.com/img/9292/f0ff/dd5c91cae12d69a2992e044d73056410?Expires=1683504000&Signature=RF3hxGuIcBZcrR0MLWl-PRd8RnwcUDq19b2vx1cFarf-dSw8ejA1NBEnyo25yLee0vPgc3dTS~QiR-1VWle6a4WNu17m3WNTk3gUBQr8XH-wYI~2x43n3L2lyvI8uOMc9JQjxKAapoKZvRHzszVAeUczk6y4bB4dwnAeA0qzo0ZyIl2Jycgg6R2tGwBKrzu061Up08vSLoQe~Lb~6-5MFyXJTRpoX-cBpY4vA9RQVCe6HhhXy9ruKXFYtt80vl2FQv70d9XGt3gbaZarp2J3eojIvuwWjlLPncFL3S8BvSH9A77puwmbcSJkRQ464LedVAD0e-IYm1ZP9PIMI8P9hA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/4a0d/f0cf/869b9427684a6358fcdeaf705d904048?Expires=1683504000&Signature=IT4pVCbl0ieSw-qTIUrAv1f48LBXwNo6MR5sbLsv6ILlBu22Nv1LCUKwh2cbGE-1irQi289ocetUhsRJgR31uRu-KN1IQ~8OPeoRcRbQx51hQ7buvAncGrYVYLYSS2OrTP2ePchGwkjFq9mPPEtJsQR9KFBup1IglNN7F4ptrO6IyWiPe7syiz79OlrVRq9EONKfNyEZ4T5vdIAh4asxKU9qJlBGcMEc-fS4hHhcJcErkfLHLItIuWXK1-POW5Cn8qZ~HrOgzd8LP6d4Qgp9SLikJitWlO5ZuHe4LtencqC7Jqwcl~T9raHhJA3WPE9GdHbL1kOtn7c~yPpCFlEoHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
