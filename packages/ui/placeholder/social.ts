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
  "https://s3-alpha-sig.figma.com/img/6a9c/afb2/7703162afb14b44083af1f00151e9621?Expires=1685923200&Signature=K~4XsMeVxRC9QzlJnhLarDhG66W9XXzOlUr0de~5ZUw1Z-dYYepjo5jQTcdaFKh8mv62MNSZDMushgkBlHA-YvVc8aI4lIwu8hsft8rCoim89EPU0TEs~BkdGuT2w1dNZlEUY7uVtFRFPa5p5A9I~4USVnTrwUgkDXLV24vuR2i7xpwe-Y4nL65PcoAnu2sAEPpfnl3w~6URxKEBz79PRV-w-99RqmMrIR9ZzgHS-yFuV3lXuaNggjENhmypMJ6NnjReFxFzVdpHLkCG68hrR2RXVyEg2qUF1nn4I7ZGlu9FFturB0KqPyj22xOjla3YljynMkjOUXkrXMIZwegJpw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/c931/7b2b/e3f0c035a711375496c86df3ef14cdfe?Expires=1685923200&Signature=Nqt~M6V31Ml6Ajk282Wqt713keyrVjB2kpqxW9y722PEpfNmh-wiJxsMEhKH7PfJ5Kp2gRIPNxpRwWEnIecOTN7QIWUlP0JOnwxJ~DgdD0IMXxDrxZQjB3nbpNCk-H7JviU2XNEDc5c-Hhku0C6G-4~bN6TvFn06MOWPkobLtTJz9qU~3Owe9Z64kpbc8m8zGXIwcS7gyP26LHHPVEgFYlqPJVTfg92JZAw4ZA4iLFNvhqFqqof0dkNArd1OiFZHPwGxqoR1uAX6ZygTKOkJubV7XSFy8i2E9ZRyQF31Wsr9J0GLsjLyVe2oFd2lohMCq5H7Vi4jYMnWRuq-vvgMJA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/a393/f8bd/fd8053b9f5110d2a4623400e88aecf83?Expires=1685923200&Signature=AXpBk-lGduukkOkMCNLWioBTmLxj1fDIKHOrNlBB-vmfH28CAHwmI90zPvMQesAShs8lifeQJ08JfmxbAFZt7KsrtSEByzmYqU6R5~qiHLqekslqoabu3JTCm0qGzjE3CkbNCXFOH5Q4fj-eiJX3KLy-xYHl~DnGgwVgFw8NQUBoNdZkQJDYWORdE0~fLA3jTEJu8j-~6MSIr7~KkClEMhYHZJDmR3nehyqtcM8MgQf7RRlpkEuMJ8G3E-qU0~Z--y40r0L8iB138BWPZ8fLmqHB5lGt4NT-VPsp3BjIrv94YjLdkf~7Zcu3qCpyC5GNY9J8Z78N8iLZhysxXqP68w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/8f58/521f/f1ecfd1d261fa7bc5e791468749ae7b1?Expires=1685923200&Signature=kxzrr1N8-1~AGd28ZVjj-AX1kufThACEc6V9GjWnrv9p5jA~duQl4nmXe0LjNCxQCi7X5HlrXzMiXmKFI2rLdxRUOOp~Z0Y2LiblljhSW9saaUoUXyiIhdWGPE4e7V8-m1i4IqCCzBEZ-VGw8buBLdVyU7Lnhwm~nXRav4JSIm-zUR1e1Ddox~FY32xM33wN7vG1ixobDJlwiso1WlOym3JpvliyV9VHLjNGtbf7d-EdDrDP~4NN-j7i9O7OKH1MfD1anczceyE7dpc-BU8-A6cTnqSXn7imqrCrpWQRbhpqYy2ao9sXPWHPGuWZm8xaRyrJrCY2aj4UaWUjbxYIvw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  "https://s3-alpha-sig.figma.com/img/b975/7b7c/2356cdcde75e58ca2b162654169a9fa5?Expires=1685923200&Signature=ZuMRXU~899Eck0GjkrrDkMVcdrX3hv5dc5EJAUgDr0CBFvCYfVek2a9~dTchAfV0l9Zz0JvJJd7h8I3LH7GNZ1P~7nxHR3ivWPR355UnPlwCVwxP0tX8jqZvIPc~kJBc95m2-0jHwN~WxsoCwDaWpEFLaBnaGkNY834rQEgJNSmZH1gQFolvd1mhLXVTlWZR9rJiWbbWlu2s0ABFCJau88CI-SoSpzw~UGZf5B8o~eVNCKHJFyzRcntBhzqY0Q659~qg7nFzuRlzInm-oVLCcWbSJgnaaWLDpOpkaLTM2ivjOO~B~v6G8xzCtDfUCDxNGwq3cfbKzvawDHWYTJ1qpQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
