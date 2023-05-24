import { RoutesType } from "..";

export type SocialRoutesType = {
  visitSellerSocialProfile: (props: Record<string, any>) => RoutesType;
  visitBuyerSocialProfile: (props: Record<string, any>) => RoutesType;
  visitSocialPostAuthorProfile: (props: Record<string, any>) => RoutesType;
  visitMyProfile: () => RoutesType;
  visitSocialProfile: (userId: string) => RoutesType;
  visitSocialPost: (postId: string) => RoutesType;
  visitNewsfeedPostPage: (props: Record<string, any>) => RoutesType;
  visitNewsfeedAccountsPostPage: (props: Record<string, any>) => RoutesType;
  visitUserHashtagPage: (props: Record<string, any>) => RoutesType;
  visitSellerHashtagPage: (hashtag: string) => RoutesType;
  profile: () => RoutesType;
  myProfile: () => RoutesType;
  newsfeed: () => RoutesType;
  post: () => RoutesType;
  hashtag: () => RoutesType;
};

export const SocialRoutes = {
  profile() {
    this.addPath("profile");
    return this;
  },
  myProfile() {
    return this.addPath("myprofile");
  },
  newsfeed() {
    return this.addPath("newsfeed");
  },
  post() {
    return this.addPath("post");
  },

  visitSellerHashtagPage(hashtag) {
    return this.hashtag().addPath(hashtag);
  },
  visitSocialProfile(userId) {
    return this.profile().id(userId);
  },

  visitSocialPostAuthorProfile(props) {
    const id = props.id;
    if (!id) return this;
    return this.profile().id(id);
  },

  visitSellerSocialProfile(props) {
    const sellerId = props["sellerId"];
    if (!sellerId) return this;
    return this.profile().id(sellerId);
  },
  visitBuyerSocialProfile(props) {
    const buyerId = props["buyerId"];
    if (!buyerId) return this;
    return this.profile().id(buyerId);
  },

  visitMyProfile() {
    return this.myProfile();
  },

  visitNewsfeedPostPage(props) {
    const id = props["id"];
    return this.newsfeed().post().id(id);
  },
  hashtag() {
    return this.addPath("hashtag");
  },
  visitUserHashtagPage(props) {
    const profileId = props["profileId"];
    const hashtag = props["tag"];
    if (!profileId || !hashtag) return this;
    return this.profile().id(profileId).hashtag().addPath(hashtag);
  },
} as RoutesType;
