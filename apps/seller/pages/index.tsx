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
  VStack,
  Button,
  CommentReportModal,
} from "ui";
import { newsfeedPosts } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { PostCardInfo } from "types";

const RecentStoriesPlaceHolder: StoryDisplayProps[] = [
  {
    storyUserData: {
      name: "Wiaah",
      userPhotoSrc: "/shop-3.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },
  {
    storyUserData: {
      name: "sam",
      userPhotoSrc: "/shop-2.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      name: "Wiaah",
      userPhotoSrc: "/shop-3.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },
];

const seller: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
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
            console.log("idParam", queryKey);
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
          <FloatingContainer
            className="w-full"
            // px="1rem"
            items={
              isMobile
                ? []
                : [
                    {
                      label: (
                        <Button className="rounded-full bg-black bg-opacity-60 shadow-md">
                          <ChevronRightIcon boxSize={9} />
                        </Button>
                      ),
                      right: "1rem",
                      top: "center",
                    },
                    {
                      label: (
                        <Button className="rounded-full bg-black bg-opacity-60 shadow-md">
                          <ChevronLeftIcon boxSize={9} />
                        </Button>
                      ),
                      left: "1rem",
                      top: "center",
                    },
                  ]
            }
          >
            <RecentStories
              className="justify-between mx-auto"
              stories={RecentStoriesPlaceHolder}
            />
          </FloatingContainer>
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
              posts={newsfeedPosts}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default seller;
