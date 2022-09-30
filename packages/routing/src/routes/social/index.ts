import { RoutesType } from "..";

export type SocialRoutesType = {
  visitSellerSocialProfile: (props: Record<string, any>) => RoutesType;
  visitBuyerSocialProfile: (props: Record<string, any>) => RoutesType;
  visitSocialPostAuthorProfile: (props: Record<string, any>) => RoutesType;
  visitMyProfile: () => RoutesType;
  visitNewsfeedPostPage: (props: Record<string, any>) => RoutesType;
  profile: () => RoutesType;
  myProfile: () => RoutesType;
  newsfeed: () => RoutesType;
  post: () => RoutesType;
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
} as RoutesType;
