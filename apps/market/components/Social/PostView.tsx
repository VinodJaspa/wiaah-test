import React from "react";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PostCard, PostCardsListWrapper, SocialPostHeader } from "ui";
import { useRecoilValue } from "recoil";
import {
  SocialNewsfeedOtherPostsState,
  SocialNewsfeedPostState,
} from "ui/state/Recoil/Social";
import { t } from "i18next";

export const PostView: React.FC = () => {
  const postCardInfo = useRecoilValue(SocialNewsfeedPostState);
  const otherPosts = useRecoilValue(SocialNewsfeedOtherPostsState);
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Flex py={{ base: "0.5rem", md: "4rem" }} gap="2rem" direction={"column"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="2rem"
        mb="6rem"
        align={"start"}
      >
        <PostCard
          showComments
          postInfo={postCardInfo.postInfo}
          profileInfo={postCardInfo.profileInfo}
        />
      </Flex>
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {postCardInfo.profileInfo.name}{" "}
        {t("other_posts", "other posts")}
      </Text>
      <PostCardsListWrapper cols={cols} posts={otherPosts} />
      <Button
        _focus={{ ringColor: "primary.main" }}
        bgColor="white"
        borderWidth={"0.25rem"}
        borderColor="gray"
        mt="2rem"
        fontSize={"xl"}
        color="black"
        py="0.5rem"
        textTransform={"capitalize"}
      >
        {t("view_more", "view more")}
      </Button>
    </Flex>
  );
};
