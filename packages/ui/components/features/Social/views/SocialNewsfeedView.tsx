import { mapArray, useBreakpointValue, useForm } from "@UI/../utils/src";
import {
  PostCardsListWrapper,
  RecentStories,
  usePaginationControls,
  useStoryModal,
} from "@blocks";
import { useSocialControls } from "ui";
import React from "react";
import { useGetMyNewsfeedPostsQuery, useGetRecentStories } from "../services";
import { AspectRatio, SquarePlusOutlineIcon } from "@partials";
import { useResponsive } from "@src/index";
import { SocialNewsfeedPostMobileCard } from "../components/Cards/SocialNewsfeedPostMobileCard";
import { useRouting } from "routing";
import { PostType } from "@features/API";
import { getRandomImage } from "placeholder";
import { newsfeedPosts } from "@UI/placeholder";

const FAKE_RECENT_STORIES_DATA = [
  {
    newStory: "Just finished reading an amazing book!",
    userId: "user123",
    user: {
      id: "user123",
      profile: {
        id: "profile123",
        photo: getRandomImage(),
        profession: "Software Engineer",
        username: "tech_guru",
      },
    },
  },
  {
    newStory: "Exploring the beautiful landscapes of New Zealand.",
    userId: "user456",
    user: {
      id: "user456",
      profile: {
        id: "profile456",
        photo: getRandomImage(),
        profession: "Travel Blogger",
        username: "wanderlust_jane",
      },
    },
  },
  {
    newStory: "Cooked a delicious homemade lasagna today.",
    userId: "user789",
    user: {
      id: "user789",
      profile: {
        id: "profile789",
        photo: getRandomImage(),
        profession: "Chef",
        username: "foodie_chef",
      },
    },
  },
];

const SocialNewsfeedView: React.FC = () => {
  const { isMobile } = useResponsive();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { open } = useStoryModal();
  const { visit } = useRouting();

  const { openSocialNewPostModal } = useSocialControls();

  const { pagination: storiesPagination } = usePaginationControls();
  const { data: _recentStories } = useGetRecentStories({
    pagination: storiesPagination,
  });
  const recentStories = FAKE_RECENT_STORIES_DATA;

  const { pagination: postsPagination } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useGetMyNewsfeedPostsQuery>[0]>(
    { pagination: postsPagination, type: PostType.NewsfeedPost },
    { pagination: postsPagination }
  );
  const { data: _data } = useGetMyNewsfeedPostsQuery(form);
  const data = newsfeedPosts;

  return (
    <div className="flex flex-col items-center w-full gap-8  px-2 md:px-8">
      <div className="flex w-full items-center overflow-x-scroll gap-6 noScroll">
        <div className="min-w-[4.75rem]">
          <AspectRatio ratio={1}>
            <div className="flex justify-center bg-gray-200 rounded-[20%] w-full h-full items-center">
              <SquarePlusOutlineIcon className="text-icon text-lightBlack " />
            </div>
          </AspectRatio>
        </div>
        <RecentStories
          onStoryClick={(props) => open(props.storyUserData.id)}
          stories={
            recentStories?.map((v) => ({
              storyUserData: {
                id: v.user?.id || "3",
                name: v.user?.profile?.username || "name",
                userPhotoSrc: v.user?.profile?.photo || getRandomImage(),
              },
            })) || []
          }
        />
      </div>
      <div className="w-full">
        {isMobile ? (
          <div className="flex flex-col gap-8">
            {mapArray(data, (v, i) => (
              <SocialNewsfeedPostMobileCard
                post={{
                  id: v.postInfo.id,
                  comments: v.postInfo.numberOfComments,
                  content: v.postInfo.content!,
                  createdAt: v.postInfo.createdAt,
                  images: v.postInfo?.attachments?.map((v) => v.src) || [""],
                  liked: true,
                  likes: v.postInfo.numberOfLikes,
                  location: {
                    city: "geneve",
                    country: "switzerland",
                  },
                  saved: true,
                  shares: v.postInfo.numberOfShares,
                  username: v.profileInfo?.name || "",
                  userPhoto: v.profileInfo?.photo || "",
                  verified: false,
                }}
              />
            ))}
          </div>
        ) : (
          <PostCardsListWrapper
            grid={true}
            onPostClick={(post) => {
              // TODO
              // openSocialPostModal(post.postInfo.id);
            }}
            onProfileClick={(username) =>
              visit((r) => r.visitSocialProfile(username))
            }
            cols={cols}
            posts={data}
          />
        )}
      </div>
    </div>
  );
};
export default SocialNewsfeedView;
