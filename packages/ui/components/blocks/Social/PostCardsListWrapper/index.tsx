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
  isDiscover?: boolean;
  getItemHeight?: (index: number) => number;
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
  <div
    className={cn(
      "grid grid-rows-2 grid-flow-col grid-cols-[repeat(50,_minmax(0,_1fr))] w-full aspect-[8/3] gap-4",
    )}
  >
    {posts.map(({ post, className }, index) => (
      <div className={cn(className)} key={index}>
        {post}
      </div>
    ))}
  </div>
);

const MasonryGrid: React.FC<{
  posts: React.ReactNode[];
  getItemHeight?: (index: number) => number;
}> = ({ posts, getItemHeight }) => {
  const columns = 4;
  const columnPosts: React.ReactNode[][] = Array.from(
    { length: columns },
    () => [],
  );
  const columnIndices: number[][] = Array.from({ length: columns }, () => []);

  posts.forEach((post, index) => {
    const columnIndex = index % columns;
    columnPosts[columnIndex].push(post);
    columnIndices[columnIndex].push(index);
  });

  return (
    <div className="grid grid-cols-4 gap-0.5">
      {columnPosts.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-0.5">
          {column.map((post, postIndex) => {
            const originalIndex = columnIndices[columnIndex][postIndex];
            const height = getItemHeight
              ? getItemHeight(originalIndex)
              : "auto";

            return (
              <div
                key={postIndex}
                className={cn(
                  "w-full overflow-hidden transition-all duration-200",
                  height !== "auto" && "relative",
                )}
                style={
                  height !== "auto" ? { height: `${height}px` } : undefined
                }
              >
                {height !== "auto" ? (
                  <div className="absolute inset-0">{post}</div>
                ) : (
                  post
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  grid,
  onLocationClick,
  onPostClick,
  onProfileClick,
  popup = true,
  isDiscover = false,
  getItemHeight,
}) => {
  const router = useRouter();
  const { isMobile } = useResponsive();

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

  if (isDiscover && !isMobile) {
    return <MasonryGrid posts={childPosts} getItemHeight={getItemHeight} />;
  }

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
          <div className="flex flex-col w-full space-y-4">
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
