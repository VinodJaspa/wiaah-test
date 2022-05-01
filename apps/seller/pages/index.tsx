import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Divider,
  useBreakpointValue,
  VStack,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
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
        {/* <AddNewPostModal /> */}
        <VStack w={"100%"} py="2rem" spacing={"1rem"}>
          <FloatingContainer
            w={"100%"}
            // px="1rem"
            items={
              isMobile
                ? []
                : [
                    {
                      label: (
                        <Button
                          colorScheme={"primary"}
                          variant="link"
                          rounded={"full"}
                          bgColor="whiteAlpha.600"
                          minW={0}
                          boxShadow={"md"}
                        >
                          <ChevronRightIcon boxSize={9} />
                        </Button>
                      ),
                      right: "1rem",
                      top: "center",
                    },
                    {
                      label: (
                        <Button
                          colorScheme={"primary"}
                          variant="link"
                          rounded={"full"}
                          bgColor="whiteAlpha.600"
                          boxShadow={"md"}
                          minW={0}
                        >
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
              justify={"space-between"}
              mx="auto"
              stories={RecentStoriesPlaceHolder}
            />
          </FloatingContainer>
          {!isMobile && (
            <SellerPostInput userName="wiaah" userPhotoSrc="/wiaah_logo.png" />
          )}
          <Box w="100%">
            <PostCardsListWrapper
              onPostClick={(post) =>
                router.push(
                  "/",
                  { query: { newsfeedpostid: post.postInfo.id } },
                  { shallow: true }
                )
              }
              cols={cols}
              posts={newsfeedPosts}
            />
          </Box>
        </VStack>
      </SellerLayout>
    </>
  );
};

export default seller;
