import { atom } from "recoil";
import { PostCardInfo, ProfileInfo } from "types/market/Social";

export const SocialProfileInfoState = atom<ProfileInfo | null>({
  key: "SocialProfileInfoState",
  default: null,
});

export const SocialNewsfeedPosts = atom<PostCardInfo[]>({
  key: "SocialNewsfeedPosts",
  default: [],
});
export const SocialNewsfeedPost = atom<PostCardInfo | null>({
  key: "SocialNewsfeedPost",
  default: null,
});

export const SocialNewsfeedOtherPosts = atom<PostCardInfo[]>({
  key: "SocialNewsfeedOtherPosts",
  default: [],
});
