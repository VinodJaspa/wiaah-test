import { products } from "./index";
import { baseUri } from "uris";
import { t } from "i18next";
import {
  AccountType,
  AccountStatus,
  AffiliationStatus,
  AffiliationOfferCardInfo,
  CashbackType,
  HashTagCardInfo,
  PostCardInfo,
  PostComment,
  PresentationType,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  ProductCondition,
  ProductSize,
  ProductStatus,
  ProductUsageStatus,
  ProfileInfo,
  ShippingType,
  ShopCardInfo,
  ShopSocialProfileInfo,
  SubscribersUserInfo,
  VisibilityEnum,
} from "types";
import {
  AccountSignup,
  GetProfileAffiliationPostsQuery,
  GetSuggestedActionsQuery,
  SocialAffiliationCardProps,
  SocialShopPostcardProps,
  SocialStoryType,
} from "ui";
import { getRandomName } from "utils";
import {
  ProfileReachedGender,
  ProfileVisibility,
  StoryType,
} from "@features/API";
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

export const imagesPlaceholder: string[] = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/300?random=2",
  "https://picsum.photos/300/400?random=3",
  "https://picsum.photos/300/500?random=4",
  "https://picsum.photos/300/200?random=5",
  "https://picsum.photos/300/300?random=6",
  "https://picsum.photos/300/400?random=7",
  "https://picsum.photos/300/500?random=8",
  "https://picsum.photos/300/200?random=9",
  "https://picsum.photos/300/300?random=10",
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/300?random=2",
  "https://picsum.photos/300/400?random=3",
  "https://picsum.photos/300/500?random=4",
  "https://picsum.photos/300/200?random=5",
  "https://picsum.photos/300/300?random=6",
  "https://picsum.photos/300/400?random=7",
  "https://picsum.photos/300/500?random=8",
  "https://picsum.photos/300/200?random=9",
  "https://picsum.photos/300/300?random=10",
];
export const storiesPlaceholder = [
  { image: "https://picsum.photos/300/200?random=1", seen: true, userId: "1" },
  { image: "https://picsum.photos/300/300?random=2", seen: false, userId: "2" },
  { image: "https://picsum.photos/300/400?random=3", seen: true, userId: "3" },
  { image: "https://picsum.photos/300/500?random=4", seen: true, userId: "4" },
  { image: "https://picsum.photos/300/200?random=5", seen: false, userId: "5" },
  { image: "https://picsum.photos/300/300?random=6", seen: true, userId: "6" },
  { image: "https://picsum.photos/300/400?random=7", seen: false, userId: "7" },
  { image: "https://picsum.photos/300/500?random=8", seen: true, userId: "8" },
  { image: "https://picsum.photos/300/200?random=9", seen: false, userId: "9" },
  {
    image: "https://picsum.photos/300/300?random=10",
    seen: false,
    userId: "10",
  },
  {
    image: "https://picsum.photos/300/200?random=1",
    seen: false,
    userId: "11",
  },
  { image: "https://picsum.photos/300/300?random=2", seen: true, userId: "12" },
  {
    image: "https://picsum.photos/300/400?random=3",
    seen: false,
    userId: "13",
  },
  {
    image: "https://picsum.photos/300/500?random=4",
    seen: false,
    userId: "14",
  },
  { image: "https://picsum.photos/300/200?random=5", seen: true, userId: "15" },
  {
    image: "https://picsum.photos/300/300?random=6",
    seen: false,
    userId: "16",
  },
  {
    image: "https://picsum.photos/300/400?random=7",
    seen: false,
    userId: "17",
  },
  { image: "https://picsum.photos/300/500?random=8", seen: true, userId: "18" },
  {
    image: "https://picsum.photos/300/200?random=9",
    seen: false,
    userId: "19",
  },
  {
    image: "https://picsum.photos/300/300?random=10",
    seen: false,
    userId: "20",
  },
];
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
  shares: 10, // Added the missing 'shares' property
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
      id: "post-4423",
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
        itemType: "service", // Or "service"
        product: {
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/29517852/pexels-photo-29517852/free-photo-of-ethereal-outdoor-portrait-of-a-woman-in-black-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/28656090/pexels-photo-28656090/free-photo-of-elegant-antique-vintage-clock-with-roman-numerals.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail:
            "https://images.pexels.com/photos/30380487/pexels-photo-30380487/free-photo-of-frost-covered-tree-in-jonkoping-sweden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
    },
    {
      id: "post-423",
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
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/29885830/pexels-photo-29885830/free-photo-of-iconic-yellow-taxis-on-the-streets-of-kolkata.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30774367/pexels-photo-30774367/free-photo-of-madonna-del-sasso-with-swiss-alpine-backdrop.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail: "https://example.com/product.jpg",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
    },

    {
      id: "post-1233",
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
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30739877/pexels-photo-30739877/free-photo-of-exciting-car-race-action-in-istanbul-turkiye.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30788646/pexels-photo-30788646/free-photo-of-dynamic-off-road-motorcycle-racing-action-shot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail: "https://example.com/product.jpg",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
    },

    {
      id: "post-3",
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
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30787894/pexels-photo-30787894/free-photo-of-stylish-woman-in-denim-dress-with-red-roses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30783967/pexels-photo-30783967/free-photo-of-red-wooden-house-in-jonkoping-sweden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail: "https://example.com/product.jpg",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
    },

    {
      id: "post-13",
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
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30782673/pexels-photo-30782673/free-photo-of-young-woman-in-soft-light-by-window-shade.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30781214/pexels-photo-30781214/free-photo-of-sleek-red-sports-car-parked-in-front-of-modern-home.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail: "https://example.com/product.jpg",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
          ownerId: "owner-123", // Optional owner ID
        },
      },
    },
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
          __typename: "Product",
          id: "product1",
          attributes: [
            {
              __typename: "ProductAttribute",
              id: "attr1",
              name: "Size",
              displayType: ProductAttributeDisplayType.Text,
              selectionType: ProductAttributeSelectionType.Single,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
            {
              __typename: "ProductAttribute",
              id: "attr2",
              name: "Color",
              displayType: ProductAttributeDisplayType.Color,
              selectionType: ProductAttributeSelectionType.Multiple,
              values: [
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue1",
                  name: "Red",
                  price: 10.99,
                  value: "#FF0000",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue2",
                  name: "Blue",
                  price: 12.99,
                  value: "#0000FF",
                },
                {
                  __typename: "ProductAttributeValue",
                  id: "attrValue3",
                  name: "Green",
                  value: "#00FF00",
                },
              ],
            },
          ],
          brand: "Sample Brand",
          cashback: {
            __typename: "Cashback",
            amount: 10,
            id: "cashback1",
            type: CashbackType.Cash,
            units: 1,
          },

          categoryId: "category1",
          condition: ProductCondition.New,
          createdAt: "2024-06-22T12:00:00Z",
          description: "This is a sample product description.",
          discount: { amount: 10, id: "discount1", units: 1 },
          earnings: 15.5,
          external_clicks: 100,
          hashtags: ["#fashion", "#clothing"],
          colors: ["Red", "Blue", "Green"],
          isExternalProduct: false,
          isExternalShopping: false,
          negitiveFeedback: 2,
          positiveFeedback: 15,
          presentations: [
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30777996/pexels-photo-30777996/free-photo-of-woman-admiring-a-sport-motorcycle-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
            {
              __typename: "ProductPresentation",
              src: "https://images.pexels.com/photos/30780899/pexels-photo-30780899/free-photo-of-woman-gazing-at-the-sky-with-moon-in-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              type: PresentationType.Image,
            },
          ],
          price: 49.99,
          rate: 4,
          reviews: 20,
          sales: 50,
          saved: true,
          selectableAttributes: [
            {
              __typename: "ProductSelectAttribute",
              id: "attr1",
              values: ["size1"],
            },
            {
              __typename: "ProductSelectAttribute",
              id: "attr2",
              values: ["color1", "color2"],
            },
          ],
          seller: {
            __typename: "Account",
            accountType: AccountType.Seller,
            createdAt: "2024-06-22T12:00:00Z",
            currency: "USD",
            email: "example@email.com",
            firstName: "John",
            id: "account1",
            ips: ["192.168.1.1"],
            lang: "en",
            lastActiveAt: "2024-06-22T12:00:00Z",
            //@ts-ignore
            service: {},
            lastName: "Doe",
            status: AccountStatus.Active,
            updatedAt: "2024-06-22T12:00:00Z",
            verified: true,
          },
          sellerId: "seller1",
          shippingDetails: {
            available: true,
            cost: 5.99,
            country: "Sample Country",
            deliveryTimeRange: { from: 2, to: 5 },
            shippingRulesIds: ["rule1", "rule2"],
            shippingTypes: [ShippingType.Paid, ShippingType.ClickAndCollect],
          },
          shippingRulesIds: ["rule1", "rule2"],
          sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
          status: ProductStatus.Active,
          stock: 100,
          thumbnail: "https://example.com/product.jpg",
          title: "Sample Product",
          todayProductClickId: "click1",
          totalDiscounted: 30,
          totalDiscountedAmount: 100,
          totalOrdered: 200,
          unitsRefunded: 5,
          updatedAt: "2024-06-22T12:00:00Z",
          usageStatus: ProductUsageStatus.New,
          vat: 5.5,
          vendor_external_link: "https://example.com/vendor",
          visibility: VisibilityEnum.Public,
        },
        //@ts-ignore
        service: null, // If not a product, replace with service details
        status: AffiliationStatus.InActive, // Or other possible statuses
      },
      user: {
        profile: {
          id: "user-456",
          username: "johndoe",
          verified: true,
          photo: "/shop.jpeg",
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
    shares: 10, // Added the missing 'shares' property
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
      id: "443",
      verified: true,
      photo: getRandomImage(),
      username: "fashion_lover",
      profession: "Stylist",
    },
    postInfo: {
      id: "543",
      comments: 25,
      shares: 102,
      reactionNum: 417,
      userId: "345",
      createdAt: new Date("2024-06-06T10:00:00Z").toString(),
      product: {
        id: "987",
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        title: "Summer Breeze Dress",
        hashtags: ["#summerdress", "#fashion", "#ootd"],
        price: 49.99,
        cashback: {
          amount: 100,
          id: "cashback1",
          type: CashbackType.Cash,
          units: 1,
        },
        discount: {
          __typename: "Discount",
          amount: 10,
          id: "discount1",
          units: 1,
        },
      },
    },
    onInteraction: (interaction) => {
      console.log("Interaction received:", interaction);
      // Perform some action based on the interaction type
    },
  },

  {
    profileInfo: {
      id: "2345",
      verified: true,
      photo: getRandomImage(),
      username: "fashion_lover",
      profession: "Stylist",
    },
    postInfo: {
      id: "5421",
      comments: 25,
      shares: 102,
      reactionNum: 417,
      userId: "12345",
      createdAt: new Date("2024-06-06T10:00:00Z").toString(),
      product: {
        id: "985",
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        title: "Summer Breeze Dress",
        hashtags: ["#summerdress", "#fashion", "#ootd"],
        price: 49.99,
        cashback: {
          amount: 100,
          id: "cashback1",
          type: CashbackType.Cash,
          units: 1,
        },
        discount: {
          __typename: "Discount",
          amount: 10,
          id: "discount1",
          units: 1,
        },
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
    //@ts-ignore
    product: "Product 1",
    //@ts-ignore
    service: "Service 1",
    status: AffiliationStatus.Active,
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
        //@ts-ignore
        product: "Product 1",
        //@ts-ignore
        service: "Service 1",
        status: AffiliationStatus.Active,
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
        //@ts-ignore
        product: "Product 2",
        //@ts-ignore
        service: "Service 2",
        status: AffiliationStatus.InActive,
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
        //@ts-ignore
        product: "Product 3",
        //@ts-ignore
        service: "Service 3",
        status: AffiliationStatus.Active,
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
        //@ts-ignore
        product: "Product 1",
        //@ts-ignore
        service: "Service 1",
        status: AffiliationStatus.Active,
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
        //@ts-ignore
        product: "Product 2",
        //@ts-ignore
        service: "Service 2",
        status: AffiliationStatus.InActive,
      },
      user: {
        profile: {
          id: "user2",
          username: "jane_smith",
          verified: false,
          photo: getRandomImage(),
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
        //@ts-ignore
        product: "Product 3",
        //@ts-ignore
        service: "Service 3",
        status: AffiliationStatus.Active,
      },
      user: {
        profile: {
          id: "user3",
          username: "sam_wilson",
          verified: true,
          photo: getRandomImage(),
          ownerId: "owner3",
        },
      },
    },
  ];

export const PersonalizeActions: GetSuggestedActionsQuery["getMyRecommendedAction"][] =
  [
    {
      comments: 12,
      reactionNum: 144,
      shares: 43,
      src: "/action.mp4",
      id: "Teasdasd123",
      musicId: "Kafir - Nile",
      tags: [{ userId: "user1" }, { userId: "user2" }, { userId: "user3" }],
      effect: {
        name: "Clarendon",
      },
      profile: {
        id: "profile123",
        ownerId: "owner123",
        photo: getRandomImage(), // Assuming getRandomImage() is defined elsewhere
        username: "fakeUserName1",
        verified: true,
      },
      location: {
        postalCode: 643253,
        city: "Sample City",
        country: "Sample Country",
        address: "123 Sample St",
        state: "Sample State",
        lat: 54.123456,
        lon: 42.654321,
      },
    },
    // {
    //   comments: 25,
    //   reactionNum: 200,
    //   shares: 60,
    //   src: "/action.mp4",
    //   id: "Teasdasd456",
    //   musicId: "Kafir - Nile",
    //   tags: [{ userId: "user4" }, { userId: "user5" }, { userId: "user6" }],
    //   effect: {
    //     name: "Gingham",
    //   },
    //   profile: {
    //     id: "profile456",
    //     ownerId: "owner456",
    //     photo: getRandomImage(),
    //     username: "fakeUserName2",
    //     verified: false,
    //   },
    //   location: {
    //     postalCode: 643254,
    //     city: "Another City",
    //     country: "Another Country",
    //     address: "456 Another Ave",
    //     state: "Another State",
    //     lat: 54.654321,
    //     lon: 42.123456,
    //   },
    // },
    // {
    //   comments: 5,
    //   reactionNum: 75,
    //   shares: 20,
    //   src: "/action.mp4",
    //   id: "Teasdasd789",
    //   musicId: "Kafir - Nile",
    //   tags: [{ userId: "user7" }, { userId: "user8" }, { userId: "user9" }],
    //   effect: {
    //     name: "Lark",
    //   },
    //   profile: {
    //     id: "profile789",
    //     ownerId: "owner789",
    //     photo: getRandomImage(),
    //     username: "fakeUserName3",
    //     verified: true,
    //   },
    //   location: {
    //     postalCode: 643255,
    //     city: "Yet Another City",
    //     country: "Yet Another Country",
    //     address: "789 Yet Another St",
    //     state: "Yet Another State",
    //     lat: 54.789012,
    //     lon: 42.987654,
    //   },
    // },
  ];

export const socialStoriesPlaceholder: SocialStoryType[] = [
  {
    stories: [
      {
        id: "story123",
        content: "This is a sample story content.",
        createdAt: new Date().toISOString(),
        publisherId: "publisher456",
        reactionsNum: 42,
        type: StoryType.Service, // assuming `type` is a string representing the type of story, e.g., "text", "image", etc.
        updatedAt: new Date().toISOString(),
        viewsCount: 123,
        views: [
          {
            __typename: "StoryView",
            createdAt: new Date().toISOString(), // Replace with appropriate Date format if necessary
            gender: ProfileReachedGender.Male, // Assuming `ProfileReachedGender` is an enum with values like "male", "female", etc.
            id: "storyView123",
            storyId: "story456",
            viewerId: "viewer789",
          },
        ], // Adjust structure if needed
      },
    ],
    publisher: {
      photo: "/shop-2.jpeg",
      username: "sampleUser",
      visibility: ProfileVisibility.Public, // assuming "public" or similar values for visibility
      id: "profile123",
    },
  },

  {
    stories: [
      {
        id: "story124",
        content: "This is a sample story content.",
        createdAt: new Date().toISOString(),
        publisherId: "publisher456",
        reactionsNum: 42,
        type: StoryType.Product, // assuming `type` is a string representing the type of story, e.g., "text", "image", etc.
        updatedAt: new Date().toISOString(),
        viewsCount: 123,
        views: [
          {
            __typename: "StoryView",
            createdAt: new Date().toISOString(), // Replace with appropriate Date format if necessary
            gender: ProfileReachedGender.Male, // Assuming `ProfileReachedGender` is an enum with values like "male", "female", etc.
            id: "storyView123",
            storyId: "story456",
            viewerId: "viewer789",
          },
        ], // Adjust structure if needed
      },
    ],
    publisher: {
      photo: "/shop-2.jpeg",
      username: "sampleUser",
      visibility: ProfileVisibility.Public, // assuming "public" or similar values for visibility
      id: "profile123",
    },
  },

  {
    stories: [
      {
        id: "story125",
        content: "This is a sample story content.",
        createdAt: new Date().toISOString(),
        publisherId: "publisher456",
        reactionsNum: 42,
        type: StoryType.Video, // assuming `type` is a string representing the type of story, e.g., "text", "image", etc.
        updatedAt: new Date().toISOString(),
        viewsCount: 123,
        views: [
          {
            __typename: "StoryView",
            createdAt: new Date().toISOString(), // Replace with appropriate Date format if necessary
            gender: ProfileReachedGender.Male, // Assuming `ProfileReachedGender` is an enum with values like "male", "female", etc.
            id: "storyView123",
            storyId: "story456",
            viewerId: "viewer789",
          },
        ], // Adjust structure if needed
      },
    ],
    publisher: {
      photo: "/shop-2.jpeg",
      username: "sampleUser",
      visibility: ProfileVisibility.Public, // assuming "public" or similar values for visibility
      id: "profile123",
    },
  },
];
