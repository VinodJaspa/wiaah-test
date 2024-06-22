import { AccountType, PostCardInfo, SocialStoryDataWithUser } from "types";
import { newsfeedPosts } from "ui";

export const getUserStoryFetcher = async (
  userId: string,
  storyId: string
): Promise<SocialStoryDataWithUser> => {
  const story: SocialStoryDataWithUser = {
    id: "test",
    storyCreationDate: new Date().toISOString(),
    storyType: "image",
    storyViews: 156,
    user: {
      accountType: AccountType.Buyer,
      id: "123",
      name: "test",
      profession: "test",
      public: true,
      thumbnail: "./wiaah_logo.png",
      verifed: true,
    },
    storySrc: "",
    storyText: "Test",
  };

  return story;
};
