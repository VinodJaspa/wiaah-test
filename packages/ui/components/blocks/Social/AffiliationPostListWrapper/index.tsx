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
import { Carousel } from "@blocks/Carousel";
import { useRouter } from "next/router";

export interface AffiliationCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
  grid?: boolean;
  onPostClick?: (postId: string) => any;
  onProfileClick?: (username: string) => any;
  onLocationClick?: (post: PostCardInfo) => any;
  popup?: boolean;
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
  popup = true,
}) => {
    const router = useRouter();
    const childPosts =
      posts &&
      posts.map((post, idx) => {
        const { isOpen, handleClose, handleOpen } = useModalDisclouser();
        const images = [post.postInfo.thumbnail];
        return (
          <>
            {popup && (
              <PostViewPopup
                showLink={true}
                fetcher={async ({ queryKey }) => {
                  const id = queryKey[1].postId;

                  const post = newsfeedPosts.find(
                    (post) => post.postInfo.id === id
                  );
                  return post ? post : null;
                }}
                queryName="newFeedPost"
                idParam="newsfeedpostid"
                isOpen={isOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                renderChild={(props: PostCardInfo) => {
                  return (
                    <Carousel componentsPerView={1} controls={true}>
                      {images.map((image, index) => (
                        <div key={index}>
                          <img src={image} alt={`Attachment ${index + 1}`} />
                        </div>
                      ))}
                    </Carousel>
                  );
                }}
              />
            )}
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
              openPopup={
                popup
                  ? handleOpen
                  : () => router.push(`/affilation/offer/${post.postInfo.id}`)
              }
            />
          </>
        );
      });
    const { isMobile, isTablet } = useResponsive();

    return (
      <>
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
