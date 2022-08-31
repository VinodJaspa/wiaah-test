import { RoutesType } from "..";

export type SocialRoutesType = {
  visitSellerSocialProfile: (props: Record<string, any>) => RoutesType;
  visitBuyerSocialProfile: (props: Record<string, any>) => RoutesType;
  profile: () => RoutesType;
};

export const SocialRoutes = {
  profile() {
    this.addPath("profile");
    return this;
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
} as RoutesType;
