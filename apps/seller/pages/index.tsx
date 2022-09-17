import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  FloatingContainer,
  PostCardsListWrapper,
  PostViewPopup,
  RecentStories,
  SellerLayout,
  SellerPostInput,
  StoryDisplayProps,
  AddNewPostModal,
  PostAttachmentsViewer,
  AddNewStoryModal,
  CommentReportModal,
  AspectRatio,
  SquarePlusOutlineIcon,
} from "ui";
import { newsfeedPosts } from "ui";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PostCardInfo } from "types";
import { randomNum } from "utils";

const RecentStoriesPlaceHolder: StoryDisplayProps[] = [...Array(11)].map(
  (_, i) => ({
    seen: randomNum(10) > 7,
    storyUserData: { name: "wiaah", userPhotoSrc: `profile (${i + 1}).jfif` },
  })
);

const seller: NextPage = () => {
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Head>
        <title>Wiaah | seller</title>
      </Head>
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
        <div className="flex flex-col items-center w-full gap-4">
          <div className="flex w-full items-center overflow-x-scroll gap-6 noScroll">
            <div className="min-w-[4.75rem]">
              <AspectRatio ratio={1}>
                <div className="flex justify-center bg-gray-200 rounded-[20%] w-full h-full items-center">
                  <SquarePlusOutlineIcon className="text-icon text-lightBlack " />
                </div>
              </AspectRatio>
            </div>
            <RecentStories
              stories={RecentStoriesPlaceHolder.concat(
                RecentStoriesPlaceHolder
              )}
            />
          </div>
          {!isMobile && (
            <SellerPostInput userName="wiaah" userPhotoSrc="/wiaah_logo.png" />
          )}
          <div className="w-full">
            <PostCardsListWrapper
              onPostClick={(post) => {
                router.push(
                  "/",
                  { query: { newsfeedpostid: post.postInfo.id } },
                  { shallow: true }
                );
              }}
              cols={cols}
              posts={[
                ...[...Array(4)].reduce((acc) => {
                  return [...acc, ...newsfeedPosts.slice(0, 8)];
                }, []),
              ]}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default seller;
