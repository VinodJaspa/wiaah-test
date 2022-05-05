import React from "react";
import { PostCardInfo } from "types/market/Social";
import { Flex, Text } from "@chakra-ui/react";
import {
  ListWrapper,
  ListWrapperProps,
  PostCard,
  GridWrapper,
  PostAttachment,
  useNewsFeedPostPopup,
  SocialPostsCommentsDrawer,
  usePostsCommentsDrawer,
  NewsfeedPostDetailsPopup,
} from "ui";
import { NumberShortner } from "ui/components/helpers";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
  onPostClick?: (post: PostCardInfo) => any;
  grid?: boolean;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  onPostClick,
  grid,
  ...props
}) => {
  const { setCurrentPost } = useNewsFeedPostPopup();
  if (grid) {
    return (
      <>
        <NewsfeedPostDetailsPopup />
        <GridWrapper
          cols={cols}
          itemProps={{ bgColor: "black" }}
          items={posts.map((post, i) => ({
            displayVariant:
              i < 2
                ? "portrait"
                : i === 4
                ? "landscape"
                : i === 6
                ? "large"
                : "normal",
            component: (
              <PostAttachment
                blur
                minimal
                controls={false}
                key={i}
                style={{ onClick: () => setCurrentPost(post.postInfo.id) }}
                src={
                  (post.postInfo.attachments &&
                    post.postInfo.attachments[0].src) ||
                  ""
                }
                type={
                  (post.postInfo.attachments &&
                    post.postInfo.attachments[0].type) ||
                  ""
                }
                footer={
                  post.postInfo.views ? (
                    <Text
                      w="100%"
                      px="1rem"
                      textAlign={"start"}
                      fontSize={"lg"}
                      fontWeight="bold"
                      color="white"
                    >
                      {NumberShortner(post.postInfo.views)}
                    </Text>
                  ) : undefined
                }
              />
            ),
          }))}
        />
      </>
    );
  } else {
    return (
      <ListWrapper {...props} cols={cols}>
        {posts &&
          posts.map((post) => (
            <PostCard
              showComments
              innerProps={{ onClick: () => onPostClick && onPostClick(post) }}
              {...post}
              key={post.postInfo.id}
            />
          ))}
      </ListWrapper>
    );
  }
};
