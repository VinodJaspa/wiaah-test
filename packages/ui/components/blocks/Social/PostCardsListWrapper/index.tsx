import { newsfeedPosts } from "placeholder";
import React from "react";
import {
  PostCard,
  PostCardProps,
} from "../../../../components/blocks/Social/PostCard";
import { PostViewPopup } from "../../../../components/blocks/Popups";
import {
  ListWrapper,
  GridListOrganiser,
  ListWrapperProps,
} from "../../../../components/blocks/Wrappers";
import { useModalDisclouser, useResponsive } from "hooks";
import { AspectRatio } from "../../../partials";
import { mapArray } from "utils";
import { PostCardInfo } from "types";
import { Carousel } from "../../../blocks/Carousel";
import { useRouter } from "next/router";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  popup?: boolean;
  cols?: number;
  grid?: boolean;
  onPostClick?: (postId: string) => any;
  onProfileClick?: (username: string) => any;
  onLocationClick?: (post: PostCardInfo) => any;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  grid,
  onLocationClick,
  onPostClick,
  onProfileClick,
  popup = true,
}) => {
  const router = useRouter();

  const { isMobile, isTablet } = useResponsive();
  const childPosts =
    posts &&
    posts.map((post, idx) => {
      const { isOpen, handleOpen, handleClose } = useModalDisclouser();
      const images = [post.postInfo.thumbnail];
      return (
        <React.Fragment key={idx}>
          <PostCard
            onProfileClick={() =>
              onProfileClick &&
              post.profileInfo?.name &&
              onProfileClick(post.profileInfo?.name)
            }
            onPostClick={() => onPostClick && onPostClick(post.postInfo.id)}
            post={post}
            key={idx}
            openPopup={
              popup
                ? handleOpen
                : () => router.push(`/newsfeed/post/${post.postInfo.id}`)
            }
          />

          {popup && (
            <PostViewPopup
              queryName="newFeedPost"
              data={post}
              idParam="newsfeedpostid"
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              renderChild={(props: PostCardInfo) => {
                return (
                  <Carousel componentsPerView={1} controls={images.length > 1}>
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
        </React.Fragment>
      );
    });

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
