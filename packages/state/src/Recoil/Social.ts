import { atom } from "recoil";
import {
  AffiliationOfferCardInfo,
  HashTagCardInfo,
  PostCardInfo,
  ProfileInfo,
  ShopCardInfo,
} from "types/market/Social";

export const SocialProfileInfoState = atom<ProfileInfo | null>({
  key: "SocialProfileInfoState",
  default: null,
});

export const SocialNewsfeedPostsState = atom<PostCardInfo[]>({
  key: "SocialNewsfeedPostsState",
  default: [],
});
export const SocialNewsfeedPostState = atom<PostCardInfo | null>({
  key: "SocialNewsfeedPostState",
  default: null,
});

export const SocialNewsfeedOtherPostsState = atom<PostCardInfo[]>({
  key: "SocialNewsfeedOtherPostsState",
  default: [],
});
export const SocialShopPostState = atom<ShopCardInfo | null>({
  key: "SocialShopPostState",
  default: null,
});

export const SocialShopOtherPostsState = atom<ShopCardInfo[]>({
  key: "SocialShopOtherPostsState",
  default: [],
});
export const SocialAffiliationOfferState =
  atom<AffiliationOfferCardInfo | null>({
    key: "SocialAffiliationOfferState",
    default: null,
  });

export const SocialAffiliationOffersState = atom<AffiliationOfferCardInfo[]>({
  key: "SocialAffiliationOffersState",
  default: [],
});

export const SocialHashTagTopPosts = atom<HashTagCardInfo[]>({
  key: "SocialHashTagTopPosts",
  default: [],
});
