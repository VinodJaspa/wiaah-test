import { baseUri } from "../..";

export const getNewsFeedPostRoute = (profileName: string) =>
  `${baseUri}/social/${profileName}/newsfeedPost`;
