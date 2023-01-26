import { Affiliation } from "@features/Affiliation";
import { Product } from "@features/Products/types";

type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Attachment = {
  __typename?: "Attachment";
  type: AttachmentType;
  src: Scalars["String"];
};

export enum AttachmentType {
  Img = "img",
  Vid = "vid",
  Text = "text",
}

export type Hashtag = {
  __typename?: "Hashtag";
  tag: Scalars["String"];
};

export type BlockedUser = {
  __typename?: "BlockedUser";
  id: Scalars["ID"];
  blockerProfileId: Scalars["ID"];
  blockedProfileId: Scalars["ID"];
  blockedAt: Scalars["DateTime"];
};

export type Profile = {
  __typename?: "Profile";
  user?: Maybe<Account>;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
  activeStatus: ActiveStatus;
  lastActive: Scalars["DateTime"];
  bio: Scalars["String"];
  photo: Scalars["String"];
  followers: Scalars["Int"];
  followingData?: Maybe<Array<Follow>>;
  following: Scalars["Int"];
  followersData?: Maybe<Array<Follow>>;
  publications: Scalars["Int"];
  profession: Scalars["String"];
  visibility: ProfileVisibility;
  verified: Scalars["Boolean"];
};

export enum ActiveStatus {
  Idle = "idle",
  Active = "active",
  InActive = "inActive",
  DoNotDisturb = "doNotDisturb",
}

export enum ProfileVisibility {
  Public = "public",
  Followers = "followers",
  Private = "private",
}

export type ProfilePaginatedResponse = {
  __typename?: "ProfilePaginatedResponse";
  data: Array<Profile>;
  total: Scalars["Int"];
  hasMore: Scalars["Boolean"];
};

export type ProfileMeta = {
  __typename?: "ProfileMeta";
  id: Scalars["ID"];
  username: Scalars["String"];
  photo: Scalars["String"];
};

export type ProfileMetaPaginatedResponse = {
  __typename?: "ProfileMetaPaginatedResponse";
  data: Array<ProfileMeta>;
  total: Scalars["Int"];
  hasMore: Scalars["Boolean"];
};

export type PostTag = {
  __typename?: "PostTag";
  userId: Scalars["ID"];
};

export type PostMention = {
  __typename?: "PostMention";
  userId: Scalars["ID"];
};

export type PostLocation = {
  __typename?: "PostLocation";
  city: Scalars["String"];
  country: Scalars["String"];
  address?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
};

export type NewsfeedPost = {
  __typename?: "NewsfeedPost";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  title: Scalars["String"];
  content: Scalars["String"];
  attachments: Array<Attachment>;
  hashtags: Array<Hashtag>;
  reactionNum: Scalars["Int"];
  comments: Scalars["Int"];
  shares: Scalars["Int"];
  views: Scalars["Int"];
  mentions: Array<PostMention>;
  location?: Maybe<PostLocation>;
  tags: Array<PostTag>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  publisher?: Maybe<Profile>;
  authorProfileId: Scalars["ID"];
};

export type Follow = {
  __typename?: "Follow";
  id: Scalars["ID"];
  followerProfile?: Maybe<Profile>;
  followerProfileId: Scalars["ID"];
  followingProfile?: Maybe<Profile>;
  followingProfileId: Scalars["ID"];
  followedAt: Scalars["DateTime"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  hostType: ContentHostType;
  hostId: Scalars["ID"];
  author?: Maybe<Profile>;
  authorProfileId: Scalars["String"];
  userId: Scalars["String"];
  attachment: Attachment;
  content: Scalars["String"];
  commentedAt: Scalars["DateTime"];
  likes: Scalars["Int"];
  replies: Scalars["Int"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export enum ContentHostType {
  PostNewsfeed = "post_newsfeed",
  PostService = "post_service",
  PostShop = "post_shop",
  Comment = "comment",
  Action = "action",
  Story = "story",
}

export type PaginationCommentsResponse = {
  __typename?: "PaginationCommentsResponse";
  data: Array<Comment>;
  total: Scalars["Int"];
  hasMore: Scalars["Boolean"];
};

export type ContentReaction = {
  __typename?: "ContentReaction";
  id: Scalars["ID"];
  hostId: Scalars["ID"];
  userId: Scalars["ID"];
  reactionType: ContentReactionType;
  reactedBy?: Maybe<Profile>;
  reactedByProfileId: Scalars["ID"];
  reactedAt: Scalars["DateTime"];
};

export enum ContentReactionType {
  Like = "like",
  Love = "love",
  Funny = "funny",
  Sad = "sad",
  Angry = "angry",
}

export type ContentShare = {
  __typename?: "ContentShare";
  id: Scalars["ID"];
  hostId: Scalars["ID"];
  hostType: ContentHostType;
  sharedBy?: Maybe<Profile>;
  sharedByProfileId: Scalars["ID"];
  sharedByUserId: Scalars["ID"];
  sharedAt: Scalars["DateTime"];
};

export type ContentSharePaginationResponse = {
  __typename?: "ContentSharePaginationResponse";
  data: Array<ContentShare>;
  total: Scalars["Int"];
  hasMore: Scalars["Boolean"];
};

export type NewsfeedHashtagSearch = {
  __typename?: "NewsfeedHashtagSearch";
  mostLikedPost: NewsfeedPost;
  mostCommentedPost: NewsfeedPost;
  mostLikedVideo: NewsfeedPost;
  mostViewedVideo: NewsfeedPost;
};

export type UserSavedPost = {
  __typename?: "UserSavedPost";
  postId: Scalars["ID"];
  postType: PostType;
};

export enum PostType {
  NewsfeedPost = "newsfeed_post",
  ShopPost = "shop_post",
  ServicePost = "service_post",
  AffiliationPost = "affiliation_post",
}

export type UserSavedPostsGroup = {
  __typename?: "UserSavedPostsGroup";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  posts: Array<UserSavedPost>;
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  profile?: Maybe<Profile>;
};

export type TopHashtagNewsfeedPosts = {
  __typename?: "TopHashtagNewsfeedPosts";
  viewed: NewsfeedPost;
  liked: NewsfeedPost;
  commented: NewsfeedPost;
  shared: NewsfeedPost;
};

export type AffiliationPost = {
  __typename?: "AffiliationPost";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  user?: Maybe<Account>;
  affiliationId: Scalars["ID"];
  reactionNum: Scalars["Int"];
  comments: Scalars["Int"];
  shares: Scalars["Int"];
  views: Scalars["Int"];
  visibility: PostVisibility;
  location?: Maybe<PostLocation>;
  commentsVisibility: CommentsVisibility;
  affiliation: Affiliation;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export enum PostVisibility {
  Hidden = "hidden",
  Public = "public",
  Followers = "followers",
  Following = "following",
}

export enum CommentsVisibility {
  Hidden = "hidden",
  Public = "public",
}

export type Service = {
  __typename?: "Service";
  id: Scalars["ID"];
};

export type ServicePost = {
  __typename?: "ServicePost";
  id: Scalars["ID"];
  serviceId: Scalars["ID"];
  service?: Maybe<Service>;
  serviceType: ServiceType;
  userId: Scalars["ID"];
  user?: Maybe<Account>;
  reactionNum: Scalars["Int"];
  comments: Scalars["Int"];
  shares: Scalars["Int"];
  views: Scalars["Int"];
  visibility: PostVisibility;
  location: PostLocation;
  commentsVisibility: CommentsVisibility;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export enum ServiceType {
  HotelRoom = "hotelRoom",
  HolidayRental = "holidayRental",
  RestaurantMenu = "restaurantMenu",
  HealthCenterTreatment = "healthCenterTreatment",
  BeautyCenterTreatment = "beautyCenterTreatment",
  Vehicle = "vehicle",
}

export type ShopPost = {
  __typename?: "ShopPost";
  id: Scalars["ID"];
};

export type Story = {
  __typename?: "Story";
  id: Scalars["ID"];
  publisherId: Scalars["ID"];
  publisher?: Maybe<Profile>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  type: StoryType;
  viewsCount: Scalars["Int"];
  reactionsNum: Scalars["Int"];
  referenceId?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
  attachements?: Maybe<Attachment>;
  views: Array<StoryView>;
  newsfeedPost?: Maybe<NewsfeedPost>;
  shopPost?: Maybe<ShopPost>;
  affiliationPost?: Maybe<AffiliationPost>;
  servicePost?: Maybe<ServicePost>;
};

export enum StoryType {
  Base = "base",
  Text = "text",
  Image = "image",
  Video = "video",
  Affiliation = "affiliation",
  Product = "product",
  Post = "post",
  Service = "service",
}

export type StoryView = {
  __typename?: "StoryView";
  id: Scalars["ID"];
  viewerId: Scalars["ID"];
  viewer?: Maybe<Account>;
  storyId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  story?: Maybe<Story>;
};

export type RecentStory = {
  __typename?: "RecentStory";
  userId: Scalars["ID"];
  newStory: Scalars["Boolean"];
  user?: Maybe<Account>;
};

export type Block = {
  __typename?: "Block";
  id: Scalars["ID"];
  blockedUserId: Scalars["ID"];
  blockedAt: Scalars["DateTime"];
};

export type PrivacySettings = {
  __typename?: "PrivacySettings";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  privateAccount: Scalars["Boolean"];
  hideLikesNum: Scalars["Boolean"];
  hideCommentsNum: Scalars["Boolean"];
  hideViewsNum: Scalars["Boolean"];
};

export type ProductPost = {
  __typename?: "ProductPost";
  id: Scalars["ID"];
  userId: Scalars["ID"];
  user?: Maybe<Account>;
  productId: Scalars["ID"];
  reactionNum: Scalars["Int"];
  comments: Scalars["Int"];
  shares: Scalars["Int"];
  views: Scalars["Int"];
  visibility: PostVisibility;
  location?: Maybe<PostLocation>;
  commentsVisibility: CommentsVisibility;
  product: Product;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type HashtagProductPost = {
  __typename?: "HashtagProductPost";
  viewed?: Maybe<ProductPost>;
  liked?: Maybe<ProductPost>;
  commented?: Maybe<ProductPost>;
  shared?: Maybe<ProductPost>;
};

export type HashtagTopAffiliationPost = {
  __typename?: "HashtagTopAffiliationPost";
  viewed?: Maybe<AffiliationPost>;
  liked?: Maybe<AffiliationPost>;
  shared?: Maybe<AffiliationPost>;
  commented?: Maybe<AffiliationPost>;
};

export type Action = {
  __typename?: "Action";
  id: Scalars["ID"];
  attachment: Attachment;
  userId: Scalars["ID"];
  reactionNum: Scalars["Int"];
  comments: Scalars["Int"];
  shares: Scalars["Int"];
  visibility: PostVisibility;
  location: PostLocation;
  commentsVisibility: CommentsVisibility;
};

export type ServicePostHashtagSearch = {
  __typename?: "ServicePostHashtagSearch";
  viewed?: Maybe<ServicePost>;
  liked?: Maybe<ServicePost>;
  shared?: Maybe<ServicePost>;
  commented?: Maybe<ServicePost>;
};

export type Community = {
  __typename?: "Community";
  id: Scalars["ID"];
  type: Scalars["String"];
  newsfeed?: Maybe<NewsfeedPost>;
  action?: Maybe<Action>;
  newsfeedPost?: Maybe<NewsfeedPost>;
};

export type FriendSuggestion = {
  __typename?: "FriendSuggestion";
  accounts: Array<Account>;
};

export type Place = {
  __typename?: "Place";
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type PlaceSuggestions = {
  __typename?: "PlaceSuggestions";
  places: Array<Place>;
};

export type Query = {
  __typename?: "Query";
  findAll: ProfilePaginatedResponse;
  myProfile: Profile;
  getProfile: Profile;
  searchPopularUsers: ProfilePaginatedResponse;
  getFollowersByProfileId: ProfileMetaPaginatedResponse;
  getFollowingByProfileId: ProfileMetaPaginatedResponse;
  getMyFollowers: ProfileMetaPaginatedResponse;
  getMyFollowing: ProfileMetaPaginatedResponse;
  isFollowed: Scalars["Boolean"];
  getNewsfeedPostsByUserId: Array<NewsfeedPost>;
  getNewsfeedPostById: NewsfeedPost;
  getTopHashtagNewsfeed: TopHashtagNewsfeedPosts;
  getAdminProfile: Profile;
  comments: Array<Comment>;
  updateComment: PaginationCommentsResponse;
  getContentComments: Array<Comment>;
  getAllShares: ContentSharePaginationResponse;
  getNewsfeedHashtagPosts: NewsfeedHashtagSearch;
  getMySavedPosts: UserSavedPostsGroup;
  getUserStory: Story;
  getUserPrevStory: Story;
  getMyStories: Array<Story>;
  getStoryViews: Array<StoryView>;
  getRecentStories: Array<RecentStory>;
  getMyBlockList: Array<Block>;
  getMyPrivacySettings: PrivacySettings;
  getUserProductPosts: Array<ProductPost>;
  getRecommendedProductPosts: Array<ProductPost>;
  getTopHashtagPosts: HashtagProductPost;
  getAuthorAffiliationPosts: Array<AffiliationPost>;
  getAffiliationPost: AffiliationPost;
  getRecommendedAffiliationPosts: Array<AffiliationPost>;
  getHashtagTopAffiliationPost?: Maybe<HashtagTopAffiliationPost>;
  getUserActions: Array<Action>;
  getAction: Array<Action>;
  getServicePost: ServicePost;
  getUserServicePosts: Array<ServicePost>;
  getRecommendedServicePosts: Array<ServicePost>;
  getHashtagTopServicePosts: ServicePostHashtagSearch;
  getCommunityPosts: Array<Community>;
  getMyFriendSuggestions: FriendSuggestion;
  getPlaceSuggestions: PlaceSuggestions;
};

export type QueryGetProfileArgs = {
  id: Scalars["String"];
};

export type QuerySearchPopularUsersArgs = {
  args: SearchPopularProfilesInput;
};

export type QueryGetFollowersByProfileIdArgs = {
  getFollowersMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetFollowingByProfileIdArgs = {
  getFollowingMetaInput: GetProfileFollowersMetaInput;
};

export type QueryGetMyFollowersArgs = {
  getMyFollowersInput: GetMyProfileFollowersMetaInput;
};

export type QueryGetMyFollowingArgs = {
  getMyFollowersInput: GetMyProfileFollowersMetaInput;
};

export type QueryIsFollowedArgs = {
  profileId: Scalars["String"];
};

export type QueryGetNewsfeedPostsByUserIdArgs = {
  args: GetNewsfeedPostsByUserIdInput;
};

export type QueryGetNewsfeedPostByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetAdminProfileArgs = {
  id: Scalars["String"];
};

export type QueryUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type QueryGetContentCommentsArgs = {
  getContentCommentsArgs: GetContentCommentsInput;
};

export type QueryGetNewsfeedHashtagPostsArgs = {
  hashtagSearchInput: GetHashtagNewsfeedPostsInput;
};

export type QueryGetUserStoryArgs = {
  userId: Scalars["String"];
};

export type QueryGetUserPrevStoryArgs = {
  storyId: Scalars["String"];
};

export type QueryGetStoryViewsArgs = {
  getStoryViewsInput: GetStorySeenByInput;
};

export type QueryGetRecentStoriesArgs = {
  getRecentStoryInput?: Maybe<GetRecentStoriesInput>;
};

export type QueryGetUserProductPostsArgs = {
  args: GetUserProductPostsInput;
};

export type QueryGetRecommendedProductPostsArgs = {
  args: GetShopRecommendedPostsInput;
};

export type QueryGetTopHashtagPostsArgs = {
  tag: Scalars["String"];
};

export type QueryGetAuthorAffiliationPostsArgs = {
  args: GetUserAffiliationPostsInput;
};

export type QueryGetAffiliationPostArgs = {
  args: GetAffiliationPostInput;
};

export type QueryGetRecommendedAffiliationPostsArgs = {
  args: GetRecommendedAffiliationPostsInput;
};

export type QueryGetHashtagTopAffiliationPostArgs = {
  tag: Scalars["String"];
};

export type QueryGetUserActionsArgs = {
  args: GetUserActionsInput;
};

export type QueryGetActionArgs = {
  id: Scalars["String"];
};

export type QueryGetServicePostArgs = {
  id: Scalars["String"];
};

export type QueryGetUserServicePostsArgs = {
  args: GetUserServicesPostsInput;
};

export type QueryGetRecommendedServicePostsArgs = {
  args: GetRecommendedServicePostsInput;
};

export type QueryGetHashtagTopServicePostsArgs = {
  args: GetHashtagTopServicePostsInput;
};

export type QueryGetCommunityPostsArgs = {
  args: GetCommunityPostsInput;
};

export type QueryGetMyFriendSuggestionsArgs = {
  args: GetMyFriendSuggestionsInput;
};

export type QueryGetPlaceSuggestionsArgs = {
  args: GetPlaceSuggestionInput;
};

export type SearchPopularProfilesInput = {
  q: Scalars["String"];
  cursor?: Maybe<Scalars["String"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type GetProfileFollowersMetaInput = {
  pagination: GqlPaginationInput;
  profileId: Scalars["String"];
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GetMyProfileFollowersMetaInput = {
  pagination: GqlPaginationInput;
};

export type GetNewsfeedPostsByUserIdInput = {
  userId: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type UpdateCommentInput = {
  content?: Maybe<Scalars["String"]>;
  mentions?: Maybe<Array<CommentMentionInput>>;
  id: Scalars["ID"];
};

export type CommentMentionInput = {
  userId: Scalars["ID"];
  profileId: Scalars["ID"];
};

export type GetContentCommentsInput = {
  id: Scalars["ID"];
  cursor?: Maybe<Scalars["String"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type GetHashtagNewsfeedPostsInput = {
  tag: Scalars["String"];
  profileId: Scalars["ID"];
  userId: Scalars["ID"];
};

export type GetStorySeenByInput = {
  pagination: GqlPaginationInput;
  storyId: Scalars["ID"];
  q?: Maybe<Scalars["String"]>;
};

export type GetRecentStoriesInput = {
  pagination: GqlPaginationInput;
};

export type GetUserProductPostsInput = {
  pagination: GqlPaginationInput;
  authorId: Scalars["ID"];
};

export type GetShopRecommendedPostsInput = {
  q?: Maybe<Scalars["String"]>;
};

export type GetUserAffiliationPostsInput = {
  userId: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type GetAffiliationPostInput = {
  id: Scalars["String"];
};

export type GetRecommendedAffiliationPostsInput = {
  pagination: GqlPaginationInput;
};

export type GetUserActionsInput = {
  userId: Scalars["ID"];
  pagination: GqlPaginationInput;
};

export type GetUserServicesPostsInput = {
  userId: Scalars["ID"];
  pagination: GqlCursorPaginationInput;
};

export type GqlCursorPaginationInput = {
  take: Scalars["Int"];
  cursor: Scalars["String"];
};

export type GetRecommendedServicePostsInput = {
  pagination: GqlPaginationInput;
  serviceType: Scalars["String"];
};

export type GetHashtagTopServicePostsInput = {
  tag: Scalars["String"];
};

export type GetCommunityPostsInput = {
  q: Scalars["String"];
};

export type GetMyFriendSuggestionsInput = {
  pagination: GqlPaginationInput;
  q?: Maybe<Scalars["String"]>;
};

export type GetPlaceSuggestionInput = {
  pagination: GqlPaginationInput;
};

export type Mutation = {
  __typename?: "Mutation";
  createProfile: Profile;
  updateMyProfile: Profile;
  deleteMyProfile: Profile;
  sendFollowRequest: Scalars["Boolean"];
  followProfile: Scalars["Boolean"];
  unFollow: Scalars["Boolean"];
  createNewsfeedPost: NewsfeedPost;
  updateNewsfeedPost: NewsfeedPost;
  removeNewsfeedPost: NewsfeedPost;
  updateProfile: Profile;
  createReaction: Scalars["Boolean"];
  removeReaction: ContentReaction;
  createComment: Comment;
  updateComment: Comment;
  removeComment: Comment;
  shareContent: ContentShare;
  deleteStory: Story;
  createStory: Scalars["Boolean"];
  likeStory: Scalars["Boolean"];
  blockUser: Scalars["Boolean"];
  unblockUser: Scalars["Boolean"];
  updateMyPrivacySettings: PrivacySettings;
  createAction: Scalars["Boolean"];
  hideContent: Scalars["Boolean"];
};

export type MutationCreateProfileArgs = {
  createProfileInput: CreateProfileInput;
};

export type MutationUpdateMyProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type MutationSendFollowRequestArgs = {
  profileId: Scalars["String"];
};

export type MutationFollowProfileArgs = {
  followUserInput: FollowProfileInput;
};

export type MutationUnFollowArgs = {
  unFollowProfileInput: UnFollowProfileInput;
};

export type MutationCreateNewsfeedPostArgs = {
  createNewsfeedPostInput: CreateNewsfeedPostInput;
};

export type MutationUpdateNewsfeedPostArgs = {
  updateNewsfeedPostInput: UpdateNewsfeedPostInput;
};

export type MutationRemoveNewsfeedPostArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileAdminInput;
};

export type MutationCreateReactionArgs = {
  CreateReactionInput: CreateReactionInput;
};

export type MutationRemoveReactionArgs = {
  removeReactionArgs: RemoveReactionInput;
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};

export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type MutationRemoveCommentArgs = {
  id: Scalars["Int"];
};

export type MutationShareContentArgs = {
  createContentShareInput: CreateContentShareInput;
};

export type MutationDeleteStoryArgs = {
  deleteStoryInput: DeleteStoryInput;
};

export type MutationCreateStoryArgs = {
  createStoryInput: CreateStoryInput;
};

export type MutationLikeStoryArgs = {
  likeStoryInput: LikeStoryInput;
};

export type MutationBlockUserArgs = {
  args: CreateBlockInput;
};

export type MutationUnblockUserArgs = {
  args: CreateBlockInput;
};

export type MutationUpdateMyPrivacySettingsArgs = {
  args: UpdateMyPrivacyInput;
};

export type MutationCreateActionArgs = {
  args: CreateActionInput;
};

export type MutationHideContentArgs = {
  args: HideContentInput;
};

export type CreateProfileInput = {
  photo: Scalars["String"];
  bio?: Maybe<Scalars["String"]>;
  profession: Scalars["String"];
  visibility?: Maybe<ProfileVisibility>;
  username: Scalars["String"];
};

export type UpdateProfileInput = {
  photo?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  profession?: Maybe<Scalars["String"]>;
  visibility?: Maybe<ProfileVisibility>;
  username?: Maybe<Scalars["String"]>;
};

export type FollowProfileInput = {
  profileId: Scalars["String"];
};

export type UnFollowProfileInput = {
  profileId: Scalars["String"];
};

export type CreateNewsfeedPostInput = {
  title: Scalars["String"];
  content: Scalars["String"];
  attachments: Array<AttachmentInput>;
  hashtags: Array<HashtagInput>;
  tags: Array<PostTagInput>;
  visibility?: Maybe<PostVisibility>;
  location?: Maybe<PostLocationInput>;
};

export type AttachmentInput = {
  type: AttachmentType;
  src: Scalars["String"];
};

export type HashtagInput = {
  tag: Scalars["String"];
};

export type PostTagInput = {
  userId: Scalars["String"];
};

export type PostLocationInput = {
  city: Scalars["String"];
  country: Scalars["String"];
  address?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
};

export type UpdateNewsfeedPostInput = {
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  attachments?: Maybe<Array<AttachmentInput>>;
  hashtags?: Maybe<Array<HashtagInput>>;
  tags?: Maybe<Array<PostTagInput>>;
  visibility?: Maybe<PostVisibility>;
  location?: Maybe<PostLocationInput>;
  id: Scalars["ID"];
};

export type UpdateProfileAdminInput = {
  photo?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  profession?: Maybe<Scalars["String"]>;
  visibility?: Maybe<ProfileVisibility>;
  username?: Maybe<Scalars["String"]>;
  profileId?: Maybe<Scalars["ID"]>;
};

export type CreateReactionInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
  authorProfileId: Scalars["ID"];
};

export type RemoveReactionInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
};

export type CreateCommentInput = {
  contentType: ContentHostType;
  contentId: Scalars["ID"];
  authorProfileId: Scalars["ID"];
  authorUserId: Scalars["ID"];
  content: Scalars["String"];
  mentions: Array<CommentMentionInput>;
  attachment?: Maybe<AttachmentInput>;
};

export type CreateContentShareInput = {
  contentId: Scalars["ID"];
  contentType: ContentHostType;
};

export type DeleteStoryInput = {
  storyId: Scalars["ID"];
};

export type CreateStoryInput = {
  productId?: Maybe<Scalars["ID"]>;
  newsfeedPostId?: Maybe<Scalars["ID"]>;
  shopPostId?: Maybe<Scalars["ID"]>;
  affiliationPostId?: Maybe<Scalars["ID"]>;
  servicePostId?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
  attachment?: Maybe<AttachmentInput>;
  tags?: Maybe<Array<PostTagInput>>;
};

export type LikeStoryInput = {
  storyId: Scalars["ID"];
};

export type CreateBlockInput = {
  userId: Scalars["ID"];
};

export type UpdateMyPrivacyInput = {
  privateAccount?: Maybe<Scalars["Boolean"]>;
  hideLikesNum?: Maybe<Scalars["Boolean"]>;
  hideCommentsNum?: Maybe<Scalars["Boolean"]>;
  hideViewsNum?: Maybe<Scalars["Boolean"]>;
};

export type CreateActionInput = {
  attachment: AttachmentInput;
  location?: Maybe<PostLocationInput>;
  commentsVisibility?: Maybe<CommentsVisibility>;
};

export type HideContentInput = {
  id: Scalars["ID"];
};
