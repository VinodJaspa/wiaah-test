import { BlocklistUserInfo } from "types";
import { FetchingMock } from "utils";
import { blockList } from "placeholder";

export const getBlockedUsersFetcher = async (): Promise<
  BlocklistUserInfo[]
> => {
  await FetchingMock;
  return blockList;
};
