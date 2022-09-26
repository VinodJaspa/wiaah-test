import { newsfeedPosts } from "placeholder";
import React from "react";
import { useRouting } from "routing";
import { PostCardInfo } from "types";
import {
  ListWrapper,
  ListWrapperProps,
  PostCard,
  GridWrapper,
  PostAttachment,
  useNewsFeedPostPopup,
  NewsfeedPostDetailsPopup,
  PostViewPopup,
  PostAttachmentsViewer,
  GridListOrganiser,
} from "ui";
import { NumberShortner } from "utils";

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
  return (
    <>
      <PostViewPopup
        // @ts-ignore
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
              attachments={props.postInfo.attachments || []}
              profileInfo={props.profileInfo}
              carouselProps={{
                arrows: true,
              }}
            />
          );
        }}
      />
      <GridListOrganiser
        rowSize="14.5rem"
        presets={[
          {
            length: 6,
            cols: 5,
            points: [
              {
                c: 2,
                r: 2,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 2,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 1,
              },
            ],
          },
          {
            cols: 5,
            length: 8,
            points: [
              { c: 1, r: 1 },
              { c: 1, r: 1 },
              { c: 1, r: 1 },
              { c: 1, r: 1 },
              { c: 1, r: 2 },
              { c: 2, r: 1 },
              { c: 1, r: 1 },
              { c: 1, r: 1 },
            ],
          },

          {
            length: 9,
            cols: 4,
            points: [
              {
                c: 2,
                r: 1,
              },
              {
                c: 2,
                r: 2,
              },
              {
                c: 1,
                r: 2,
              },
              {
                c: 1,
                r: 2,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 1,
                r: 1,
              },
              {
                c: 2,
                r: 1,
              },
            ],
          },
        ]}
      >
        {posts && posts.map((post, idx) => <PostCard {...post} key={idx} />)}
      </GridListOrganiser>
    </>
  );
};
