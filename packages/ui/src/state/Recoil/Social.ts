import { atom } from "recoil";
import {
  AffiliationOfferCardInfo,
  HashTagCardInfo,
  PostCardInfo,
  ProfileInfo,
  ShopCardInfo,
} from "types";

export const SocialProfileInfoState = atom<ProfileInfo | null>({
  key: `SocialProfileInfoState_${Date.now()}`,
  default: null,
});

export const SocialNewsfeedPostsState = atom<PostCardInfo[]>({
  key: `SocialNewsfeedPostsState_${Date.now()}`,
  default: [],
});
export const SocialNewsfeedPostState = atom<PostCardInfo | null>({
  key: `SocialNewsfeedPostState_${Date.now()}`,
  default: null,
});

export const SocialNewsfeedOtherPostsState = atom<PostCardInfo[]>({
  key: `SocialNewsfeedOtherPostsState_${Date.now()}`,
  default: [],
});
export const SocialShopPostState = atom<ShopCardInfo | null>({
  key: `SocialShopPostState_${Date.now()}`,
  default: null,
});

export const SocialShopOtherPostsState = atom<ShopCardInfo[]>({
  key: `SocialShopOtherPostsState_${Date.now()}`,
  default: [],
});
export const SocialAffiliationOfferState =
  atom<AffiliationOfferCardInfo | null>({
    key: `SocialAffiliationOfferState_${Date.now()}`,
    default: null,
  });

export const SocialAffiliationOffersState = atom<AffiliationOfferCardInfo[]>({
  key: `SocialAffiliationOffersState_${Date.now()}`,
  default: [],
});

export const SocialHashTagTopPosts = atom<HashTagCardInfo[]>({
  key: `SocialHashTagTopPosts_${Date.now()}`,
  default: [],
});
