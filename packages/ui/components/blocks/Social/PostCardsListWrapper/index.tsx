import { Carousel } from "@blocks/Carousel";
import { PostViewPopup } from "@blocks/Popups";
import { ListWrapper, ListWrapperProps } from "@blocks/Wrappers";
import { AspectRatio } from "@partials";
import { useModalDisclouser, useResponsive } from "hooks";
import { useRouter } from "next/router";
import React from "react";
import { PostCardInfo } from "types";
import { cn, mapArray } from "utils";
import { PostCard } from "../PostCard/NewsFeedPostCard";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  popup?: boolean;
  cols?: number;
  grid?: boolean;
  onPostClick?: (postId: string) => any;
  onProfileClick?: (username: string) => any;
  onLocationClick?: (post: PostCardInfo) => any;
}

const classPatterns: string[] = [
  "col-span-18 row-span-1 ", // 0
  "col-span-18 row-span-1 ", // 1
  "col-span-14 row-span-2 ", // 2
  "col-span-18 row-span-1 ", // 3
  "col-span-18 row-span-1 ", // 4
  "col-span-18 row-span-2 ", // 5
  "col-span-18 row-span-1 ", // 6
  "col-span-12 row-span-1 ", // 7
  "col-span-20 row-span-1 ", // 8
  "col-span-14 row-span-1  ", // 9
];

const transformPosts = (
  posts: React.ReactNode[],
): { post: React.ReactNode; className: string }[] => {
  return posts.map((post, index) => ({
    post,
    className: classPatterns[index % classPatterns.length],
  }));
};

const splitIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const Grid: React.FC<{
  posts: { post: React.ReactNode; className: string }[];
}> = ({ posts }) => (
  <div className="grid grid-rows-2 grid-flow-col grid-cols-[repeat(50,_minmax(0,_1fr))] gap-4 w-full aspect-[8/3]">
    {posts.map(({ post, className }, index) => (
      <div className={cn(className)} key={index}>
        {post}
      </div>
    ))}
  </div>
);

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
              posts={posts}
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
                        <img
                          src={props.postInfo.thumbnail}
                          alt={`Attachment ${index + 1}`}
                        />
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

  const transformedPosts = transformPosts(childPosts);
  const postChunks = splitIntoChunks(transformedPosts, 5);

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
          <div className="space-y-4 flex flex-col w-full">
            {postChunks.map((chunk, index) => (
              <Grid key={index} posts={chunk} />
            ))}
          </div>
        )
      ) : (
        <ListWrapper gap={!isMobile} cols={cols}>
          {childPosts}
        </ListWrapper>
      )}
    </>
  );
};
