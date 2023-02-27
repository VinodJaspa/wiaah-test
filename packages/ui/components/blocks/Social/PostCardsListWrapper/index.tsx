import { newsfeedPosts } from "placeholder";
import React from "react";
import { PostCardInfo } from "types";
import { PostCard, PostCardProps } from "@UI/components/blocks/Social/PostCard";
import { PostViewPopup } from "@UI/components/blocks/Popups";
import { PostAttachmentsViewer } from "@UI/components/blocks/DataDisplay";
import {
  ListWrapper,
  GridListOrganiser,
  ListWrapperProps,
} from "@UI/components/blocks/Wrappers";
import { useResponsive } from "@UI/../hooks";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts: (PostCardProps["postInfo"] & {
    publisher?: PostCardProps["profileInfo"] | null;
  })[];
  cols?: number;
  onPostClick?: (post: PostCardInfo) => any;
  grid?: boolean;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  grid,
}) => {
  const childPosts =
    posts &&
    posts.map((post, idx) => (
      <PostCard postInfo={post} profileInfo={post.publisher!} key={idx} />
    ));

  const { isMobile, isTablet } = useResponsive();

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
      {grid ? (
        <GridListOrganiser
          rowSize={isMobile ? "6rem" : isTablet ? "10rem" : "14.5rem"}
          presets={
            isMobile
              ? [
                  {
                    cols: 3,
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
                        r: 1,
                      },
                      {
                        c: 2,
                        r: 2,
                      },
                      {
                        c: 2,
                        r: 1,
                      },
                    ],
                  },
                  {
                    cols: 3,
                    points: [
                      { c: 2, r: 2 },
                      { c: 1, r: 1 },
                      { c: 1, r: 1 },
                      { c: 2, r: 1 },
                      { c: 1, r: 1 },
                      { c: 2, r: 1 },
                      { c: 1, r: 1 },
                    ],
                  },

                  {
                    cols: 2,
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
                ]
              : [
                  {
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
                ]
          }
        >
          {childPosts}
        </GridListOrganiser>
      ) : (
        <ListWrapper cols={cols}>{childPosts}</ListWrapper>
      )}
    </>
  );
};
