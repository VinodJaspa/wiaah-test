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
  VStack,
  Button,
} from "ui";
import { newsfeedPosts } from "ui";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { PostCardInfo } from "types";

const RecentStoriesPlaceHolder: StoryDisplayProps[] = [
  {
    storyUserData: {
      id: "1",
      name: "Wiaah",
      userPhotoSrc: "/shop-3.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      id: "2",
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },
  {
    storyUserData: {
      id: "3",
      name: "sam",
      userPhotoSrc: "/shop-2.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      id: "4",
      name: "Wiaah",
      userPhotoSrc: "/shop-3.jpeg",
    },
    seen: true,
  },
  {
    storyUserData: {
      id: "6",
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },

  {
    storyUserData: {
      id: "7",
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },

  {
    storyUserData: {
      id: "8",
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },

  {
    storyUserData: {
      id: "9",
      name: "Jack",
      userPhotoSrc: "/shop.jpeg",
    },
    seen: false,
  },
];

const Buyer: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Head>
        <title>Wiaah | Buyer</title>
      </Head>
      <SellerLayout header="main">
        <AddNewPostModal />
        <AddNewStoryModal />
        <CommentReportModal />
        <VStack className="w-full gap-4">
          <FloatingContainer
            className="w-full"
            // px="1rem"
            items={
              isMobile
                ? []
                : [
                  {
                    label: (
                      <Button className="rounded-full bg-white bg-opacity-60 shadow-md">
                        <ChevronRightIcon boxSize={9} />
                      </Button>
                    ),
                    right: "1rem",
                    top: "center",
                  },
                  {
                    label: (
                      <Button className="rounded-full bg-white bg-opacity-60 shadow-md">
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
              className="justify-start mx-auto"
              stories={RecentStoriesPlaceHolder}
            />
          </FloatingContainer>
          {!isMobile && (
            <SellerPostInput userName="wiaah" userPhotoSrc="/wiaah_logo.png" />
          )}
          <div className="w-full">
            <PostCardsListWrapper
              onPostClick={
                (post) => { }
                // router.push(
                //   "/",
                //   { query: { newsfeedpostid: post.postInfo.id } },
                //   { shallow: true }
                // )
              }
              cols={cols}
              posts={newsfeedPosts}
            />
          </div>
        </VStack>
      </SellerLayout>
    </>
  );
};

export default Buyer;
