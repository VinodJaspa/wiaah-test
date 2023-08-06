import { mapArray, useBreakpointValue, useForm } from "@UI/../utils/src";
import {
  PostCardsListWrapper,
  RecentStories,
  usePaginationControls,
  useSocialControls,
  useStoryModal,
} from "@blocks";
import React from "react";
import { useGetMyNewsfeedPostsQuery, useGetRecentStories } from "../services";
import { AspectRatio, SquarePlusOutlineIcon } from "@partials";
import { useResponsive } from "@src/index";
import { SocialNewsfeedPostMobileCard } from "../components/Cards/SocialNewsfeedPostMobileCard";

const SocialNewsfeedView: React.FC = () => {
  const { isMobile } = useResponsive();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { open } = useStoryModal();

  const { openSocialNewPostModal } = useSocialControls();

  const { pagination: storiesPagination } = usePaginationControls();
  const { data: recentStories } = useGetRecentStories({
    pagination: storiesPagination,
  });

  const { pagination: postsPagination } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useGetMyNewsfeedPostsQuery>[0]>(
    { pagination: postsPagination },
    { pagination: postsPagination }
  );
  const { data } = useGetMyNewsfeedPostsQuery(form);

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
                id: v.user?.id,
                name: v.user?.profile?.id,
                userPhotoSrc: v.user?.profile?.photo,
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
                  id: v.id,
                  comments: v.comments,
                  content: v.content,
                  createdAt: v.createdAt,
                  images: v.attachments.map((v) => v.src),
                  liked: true,
                  likes: v.reactionNum,
                  location: {
                    city: "geneve",
                    country: "switzerland",
                  },
                  saved: true,
                  shares: v.shares,
                  username: v.publisher?.username || "",
                  userPhoto: v.publisher?.photo || "",
                  verified: v.publisher?.verified || false,
                }}
              />
            ))}
          </div>
        ) : (
          <PostCardsListWrapper
            grid={true}
            onPostClick={(post) => {
              openSocialNewPostModal(post.postInfo.id);
            }}
            cols={cols}
            posts={data}
          />
        )}
      </div>
    </div>
  );
};
export default SocialNewsfeedView;
