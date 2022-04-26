import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Divider,
  useBreakpointValue,
  VStack,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  FloatingContainer,
  PostCardsListWrapper,
  RecentStories,
  RecentStoriesProps,
  SellerLayout,
  SellerPostInput,
  Spacer,
  StoryDisplayProps,
  TabsViewer,
} from "ui";
import { newsfeedPosts } from "ui/placeholder/social";
import { TabType } from "types/market/misc/tabs";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <>
      <Head>
        <title>Wiaah | seller</title>
      </Head>
      <SellerLayout>
        <VStack
          w={"100%"}
          spacing={"1rem"}
          divider={<Divider borderColor={"gray.200"} opacity="1" />}
        >
          <FloatingContainer
            w={"100%"}
            // px="1rem"
            items={[
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
                right: true,
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
                left: true,
                top: "center",
              },
            ]}
          >
            <RecentStories
              justify={"space-between"}
              mx="auto"
              mt="2rem"
              stories={RecentStoriesPlaceHolder}
            />
          </FloatingContainer>
          <SellerPostInput userName="wiaah" userPhotoSrc="/wiaah_logo.png" />
          <Box w="100%">
            <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
          </Box>
        </VStack>
      </SellerLayout>
    </>
  );
};

export default seller;
