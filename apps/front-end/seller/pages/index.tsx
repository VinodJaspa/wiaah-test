import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useBreakpointValue } from "utils";
import {
  PostCardsListWrapper,
  PostViewPopup,
  RecentStories,
  SellerLayout,
  AddNewPostModal,
  PostAttachmentsViewer,
  AddNewStoryModal,
  CommentReportModal,
  AspectRatio,
  SquarePlusOutlineIcon,
  useStoryModal,
  useGetRecentStories,
  usePaginationControls,
} from "ui";
import { newsfeedPosts } from "ui";
import { useRouter } from "next/router";
import { PostCardInfo } from "types";
import { StoryModal } from "@components";

const Seller: NextPage = () => {
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { open } = useStoryModal();

  const { pagination } = usePaginationControls();
  const { data: recentStories } = useGetRecentStories({
    pagination,
  });

  return (
    <>
      <Head>
        <title>Wiaah | seller</title>
      </Head>
      <StoryModal />
      <SellerLayout header="main">
        <PostViewPopup
          fetcher={async ({ queryKey }) => {
            const id = queryKey[1].postId;
            const post = newsfeedPosts.find((post) => post.postInfo.id === id);
            return post ? post : null;
          }}
          queryName="newFeedPost"
          idParam="newsfeedpostid"
          renderChild={(props: PostCardInfo) => {
            return (
              <PostAttachmentsViewer
                attachments={props.postInfo.attachments}
                profileInfo={props.profileInfo}
                carouselProps={{
                  arrows: true,
                }}
              />
            );
          }}
        />
        <AddNewPostModal />
        <AddNewStoryModal />
        <CommentReportModal />
        <div className="flex flex-col items-center w-full gap-8">
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
                    id: v.user.id,
                    name: v.user.profile.id,
                    userPhotoSrc: v.user.profile.photo,
                  },
                })) || []
              }
            />
          </div>
          <div className="w-full">
            <PostCardsListWrapper
              grid={true}
              onPostClick={(post) => {
                router.push(
                  "/",
                  { query: { newsfeedpostid: post.postInfo.id } },
                  { shallow: true }
                );
              }}
              cols={cols}
              posts={[]}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default Seller;
