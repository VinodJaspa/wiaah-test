import { newsfeedPosts } from "placeholder";
import React from "react";
import { PostCard, PostCardProps } from "@UI/components/blocks/Social/PostCard";
import { PostViewPopup } from "@UI/components/blocks/Popups";
import { PostAttachmentsViewer } from "@UI/components/blocks/DataDisplay";
import {
  ListWrapper,
  GridListOrganiser,
  ListWrapperProps,
} from "@UI/components/blocks/Wrappers";
import { useModalDisclouser, useResponsive } from "@UI/../hooks";
import { AspectRatio } from "@partials";
import { mapArray } from "@UI/../utils/src";
import { PostCardInfo } from "types";

export interface AffiliationCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
  grid?: boolean;
  onPostClick?: (postId: string) => any;
  onProfileClick?: (username: string) => any;
  onLocationClick?: (post: PostCardInfo) => any;
}

export const AffiliationCardsListWrapper: React.FC<
  AffiliationCardsListWrapperProps
> = ({
  posts,
  cols = 1,
  grid,
  onLocationClick,
  onPostClick,
  onProfileClick,
}) => {
    const { isOpen, handleClose, handleOpen } = useModalDisclouser();
    const childPosts =
      posts &&
      posts.map((post, idx) => (
        <PostCard
          onProfileClick={() =>
            onProfileClick &&
            post.profileInfo?.name &&
            onProfileClick(post.profileInfo?.name)
          }
          // onLocationClick={()=> onLocationClick && onLocationClick(post.id)}
          onPostClick={() => onPostClick && onPostClick(post.postInfo.id)}
          post={post}
          key={idx}
          openPopup={handleOpen}
        />
      ));

    const { isMobile, isTablet } = useResponsive();

    return (
      <>
        <PostViewPopup
          fetcher={async ({ queryKey }) => {
            const id = queryKey[1].postId;

            const post = newsfeedPosts.find((post) => post.postInfo.id === id);
            return post ? post : null;
          }}
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          queryName="affiliationPost"
          idParam="affiliationPostId"
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
          isMobile ? (
            <div className="grid grid-cols-3 gap-[1px]">
              {mapArray(childPosts, (v, i) => (
                <AspectRatio key={i} ratio={1.24}>
                  {v}
                </AspectRatio>
              ))}
            </div>
          ) : (
            <GridListOrganiser
              rowSize={isMobile ? "6rem" : isTablet ? "10rem" : "14.5rem"}
              presets={[
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
              ]}
            >
              {childPosts}
            </GridListOrganiser>
          )
        ) : (
          <ListWrapper gap={!isMobile} cols={cols}>
            {childPosts}
          </ListWrapper>
        )}
      </>
    );
  };
