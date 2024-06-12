import { products } from "./index";
import { baseUri } from "uris";
import { t } from "i18next";
import {
  AccountType,
  AffiliationOfferCardInfo,
  HashTagCardInfo,
  PostCardInfo,
  PostComment,
  ProfileInfo,
  ShopCardInfo,
  ShopSocialProfileInfo,
  SubscribersUserInfo,
} from "types";
import {
  AccountSignup,
  GetProfileAffiliationPostsQuery,
  GetSuggestedActionsQuery,
  SocialAffiliationCardProps,
  SocialShopPostcardProps,
} from "ui";
import { getRandomName } from "utils";
const randomNum = (num: number) => num;

export const SocialProfileInfo: ShopSocialProfileInfo = {
  id: "1",
  name: "Wiaah",
  accountType: AccountType.Buyer,
  publications: 100,
  subscribers: 40,
  subscriptions: 23,
  thumbnail: "/wiaah_logo.png",
  countryCode: "CH",
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
    id: "1",
    tags: ["mood", "new"],
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium. Quisquam hic culpa odit aliquid obcaecati ea eaque! Modi facere eos, totam eligendi possimus atque in corporis?or sit amet consectetur adipisicing elit. Beatae harum quaerat hic laudantium.",
    numberOfComments: 5,
    numberOfLikes: 7,
    numberOfShares: 3,
    attachments: [
      {
        type: "image",
        src: "https://fragrances.com.ng/media/catalog/product/cache/4cf9e516177489ae500dec59d26ccb3b/c/h/christian_dior_sauvage_parfum_100ml_2019_perfume_for_men.jpeg",
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
const images: string[] = [...products.map((pro) => pro.imgUrl)];

export const getRandomImage = (): string =>
  images[Math.floor(Math.random() * images.length)];

export const postProfilesPlaceholder: ProfileInfo[] = [
  {
    id: "1",
    name: "Wiaah",
    thumbnail: "/wiaah_logo.png",
    accountType: AccountType.Buyer,
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
  createdAt: "",
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
export const socialAffiliationCardPlaceholders: SocialAffiliationCardProps["post"][] =
  [
    {
      id: "post-123",
      userId: "user-456",
      affiliationId: "affiliation-789",
      views: 543,
      reactionNum: 25,
      shares: 12,
      comments: 3,
      createdAt: "2024-06-08T10:00:00Z",
      affiliation: {
        id: "affiliation-789",
        commision: 10, // Percentage
        createdAt: "2024-06-07T15:30:00Z",
        itemId: "item-001",
        itemType: "product", // Or "service"
        product: {
          // Replace with actual product details if applicable
          name: "Awesome Product",
          description: "This is a great product you should check out!",
          // ... other product properties
        },
        service: null, // If not a product, replace with service details
        status: "active", // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "https://example.com/profile_pics/johndoe.jpg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
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
          type: "video",
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
];
export const stringplaceholder =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nostrum nulla rem excepturi unde iusto voluptatum tempora accusantium ducimus laborum, repellat tempore mollitia error animi doloribus eum inventore voluptate ab.";
const getRandomType = (): "service" | "product" =>
  randomNum(10) > 4 ? "product" : "service";
export const ShopCardsInfoPlaceholder: ShopCardInfo[] = [
  {
    id: "1",
    createdAt: "",
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
  },
];
export const SocialShopCardsInfoPlaceholder: SocialShopPostcardProps[] = [
  {
    profileInfo: {
      id: 12345,
      verified: true,
      photo: "https://example.com/profile_pic.jpg",
      username: "fashion_lover",
      profession: "Stylist",
    },
    postInfo: {
      id: 54321,
      comments: 25,
      shares: 102,
      reactionNum: 417,
      userId: 12345,
      createdAt: new Date("2024-06-06T10:00:00Z"),
      product: {
        id: 98765,
        presentations: ["https://example.com/product_image.jpg"],
        title: "Summer Breeze Dress",
        hashtags: ["#summerdress", "#fashion", "#ootd"],
        price: 49.99,
        cashback: 5.0,
        discount: 10,
      },
    },
    onInteraction: (interaction) => {
      console.log("Interaction received:", interaction);
      // Perform some action based on the interaction type
    },
  },

  {
    profileInfo: {
      id: 12345,
      verified: true,
      photo: "https://example.com/profile_pic.jpg",
      username: "fashion_lover",
      profession: "Stylist",
    },
    postInfo: {
      id: 54321,
      comments: 25,
      shares: 102,
      reactionNum: 417,
      userId: 12345,
      createdAt: new Date("2024-06-06T10:00:00Z"),
      product: {
        id: 98765,
        presentations: ["https://example.com/product_image.jpg"],
        title: "Summer Breeze Dress",
        hashtags: ["#summerdress", "#fashion", "#ootd"],
        price: 49.99,
        cashback: 5.0,
        discount: 10,
      },
    },
    onInteraction: (interaction) => {
      console.log("Interaction received:", interaction);
      // Perform some action based on the interaction type
    },
  },
];

export const hashtagCardInfoPlaceholder: HashTagCardInfo = {
  title: t("most_liked_post", "most liked post"),
  ...PostCardPlaceHolder,
};

export const hashTagCardsInfoPlaceholder: HashTagCardInfo[] = [
  {
    title: t("most_liked_post", "most liked post"),
    ...PostCardPlaceHolder,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      attachments: [
        {
          src: "/post (1).jfif",
          type: "image",
        },
      ],
    },
  },
  {
    ...PostCardPlaceHolder,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      attachments: [
        {
          src: "/post (2).jfif",
          type: "image",
        },
      ],
    },

    title: t("most_commented_post", "most commented post"),
  },
  {
    ...PostCardPlaceHolder,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      attachments: [
        {
          src: "/post (3).jfif",
          type: "image",
        },
      ],
    },

    title: t("most_viewed_video", "most viewed video"),
  },
  {
    ...PostCardPlaceHolder,
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      attachments: [
        {
          src: "/post (4).jfif",
          type: "image",
        },
      ],
    },

    title: t("most_liked_video", "most liked video"),
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
    product: "Product 1",
    service: "Service 1",
    status: "active",
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

export const ProfileAffiliation: GetProfileAffiliationPostsQuery["getAuthorAffiliationPosts"] =
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
        __typename: "Affiliation",
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        product: "Product 1",
        service: "Service 1",
        status: "active",
      },
      user: {
        id: "acc1",
        profile: {
          __typename: "Profile",
          id: "user1",
          username: "john_doe",
          followers: 500,
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner1",
          profession: "Software Developer",
        },
      },
    },
    {
      id: "post2",
      userId: "user2",
      affiliationId: "aff2",
      views: 2000,
      reactionNum: 250,
      shares: 30,
      comments: 40,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff2",
        commision: 15,
        createdAt: new Date().toISOString(),
        itemId: "item2",
        itemType: "service",
        product: "Product 2",
        service: "Service 2",
        status: "inactive",
      },
      user: {
        id: "acc2",
        profile: {
          id: "user2",
          username: "jane_smith",
          followers: 1000,
          verified: false,
          photo: "https://example.com/photo2.jpg",
          ownerId: "owner2",
          profession: "Graphic Designer",
        },
      },
    },
    {
      id: "post3",
      userId: "user3",
      affiliationId: "aff3",
      views: 3000,
      reactionNum: 350,
      shares: 40,
      comments: 50,
      createdAt: new Date().toISOString(),
      affiliation: {
        __typename: "Affiliation",
        id: "aff3",
        commision: 20,
        createdAt: new Date().toISOString(),
        itemId: "item3",
        itemType: "product",
        product: "Product 3",
        service: "Service 3",
        status: "active",
      },
      user: {
        __typename: "Account",
        id: "acc3",
        profile: {
          __typename: "Profile",
          id: "user3",
          username: "sam_wilson",
          followers: 1500,
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner3",
          profession: "Digital Marketer",
        },
      },
    },
  ];

export const AffiliationPostSuggestionsPlaceholder: SocialAffiliationCardProps["post"][] =
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
        product: "Product 1",
        service: "Service 1",
        status: "active",
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: "https://example.com/photo1.jpg",
          ownerId: "owner1",
        },
      },
    },
    {
      id: "post2",
      userId: "user2",
      affiliationId: "aff2",
      views: 2000,
      reactionNum: 250,
      shares: 30,
      comments: 40,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff2",
        commision: 15,
        createdAt: new Date().toISOString(),
        itemId: "item2",
        itemType: "service",
        product: "Product 2",
        service: "Service 2",
        status: "inactive",
      },
      user: {
        profile: {
          id: "user2",
          username: "jane_smith",
          verified: false,
          photo: "https://example.com/photo2.jpg",
          ownerId: "owner2",
        },
      },
    },
    {
      id: "post3",
      userId: "user3",
      affiliationId: "aff3",
      views: 3000,
      reactionNum: 350,
      shares: 40,
      comments: 50,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff3",
        commision: 20,
        createdAt: new Date().toISOString(),
        itemId: "item3",
        itemType: "product",
        product: "Product 3",
        service: "Service 3",
        status: "active",
      },
      user: {
        profile: {
          id: "user3",
          username: "sam_wilson",
          verified: true,
          photo: "https://example.com/photo3.jpg",
          ownerId: "owner3",
        },
      },
    },
  ];

export const PersonalizeAction: GetSuggestedActionsQuery["getMyRecommendedAction"] =
{
  comments: randomNum(123456),
  reactionNum: randomNum(123456),
  shares: randomNum(123456),
  src: "/action.mp4",
  id: "Teasdasd",
  musicId: "Kafir - Nile",
  tags: [{ userId: "" }, { userId: "" }, { userId: "" }],
  effect: {
    name: "Clarendon",
  },
  profile: {
    id: "",
    ownerId: "",
    photo: getRandomImage(),
    username: getRandomName().firstName,
    verified: true,
  },
  location: {
    postalCode: 643253,
    city: "city",
    country: "country",
    address: "address",
    state: "state",
    lat: 54,
    lon: 42,
  },
};
