import { UnFollowUserFetcher } from "api";
import { useMutation } from "react-query";
import { BlocklistUserInfo } from "types";

export const useUnFollowUserMutation = () => {
  return useMutation<unknown, unknown, BlocklistUserInfo>(UnFollowUserFetcher);
};
