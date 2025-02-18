import { Carousel } from "@blocks/Carousel";
import { PostViewPopup } from "@blocks/Popups";
import { ListWrapper, ListWrapperProps } from "@blocks/Wrappers";
import { AspectRatio } from "@partials";
import { useModalDisclouser, useResponsive } from "hooks";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
}

interface ContentDimensions {
  width: number;
  height: number;
}

const classPatterns: string[] = [
  "col-span-18 row-span-1",
  "col-span-18 row-span-1",
  "col-span-14 row-span-2",
  "col-span-18 row-span-1",
  "col-span-18 row-span-1",
  "col-span-18 row-span-2",
  "col-span-18 row-span-1",
  "col-span-12 row-span-1",
  "col-span-20 row-span-1",
  "col-span-14 row-span-1",
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
      "grid grid-rows-2 grid-flow-col grid-cols-[repeat(50,_minmax(0,_1fr))] w-full gap-4 aspect-[8/3]",
    )}
  >
    {posts.map(({ post, className }, index) => (
      <div className={cn(className)} key={index}>
        {post}
      </div>
    ))}
  </div>
);

const useContentDimensions = (content: PostCardInfo) => {
  const [dimensions, setDimensions] = useState<ContentDimensions | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      if (!elementRef.current) return;

      const media = elementRef.current.querySelector("img, video") as
        | HTMLImageElement
        | HTMLVideoElement;

      if (media) {
        const updateDimensions = () => {
          const { naturalWidth, naturalHeight } =
            media instanceof HTMLImageElement
              ? media
              : {
                  naturalWidth: media.videoWidth,
                  naturalHeight: media.videoHeight,
                };

          if (naturalWidth && naturalHeight) {
            const containerWidth = elementRef.current?.clientWidth || 0;
            const aspectRatio = naturalHeight / naturalWidth;
            const calculatedHeight = containerWidth * aspectRatio;

            setDimensions({
              width: containerWidth,
              height: calculatedHeight,
            });
          }
        };

        if (media instanceof HTMLImageElement) {
          if (media.complete) {
            updateDimensions();
          } else {
            media.onload = updateDimensions;
          }
        } else {
          media.onloadedmetadata = updateDimensions;
        }
      }
    };

    calculateDimensions();

    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [content]);

  return { dimensions, elementRef };
};

const MasonryItem: React.FC<{
  post: PostCardInfo;
  children: React.ReactNode;
}> = ({ post, children }) => {
  const { dimensions, elementRef } = useContentDimensions(post);

  return (
    <div
      ref={elementRef}
      className="w-full overflow-hidden transition-all duration-200"
      style={dimensions ? { height: `${dimensions.height}px` } : undefined}
    >
      {children}
    </div>
  );
};

const MasonryGrid: React.FC<{
  posts: PostCardInfo[];
  children: React.ReactNode[];
}> = ({ posts, children }) => {
  const columns = 4;
  const columnContent: { post: PostCardInfo; child: React.ReactNode }[][] =
    Array.from({ length: columns }, () => []);

  children.forEach((child, index) => {
    const columnIndex = index % columns;
    columnContent[columnIndex].push({
      post: posts[index],
      child,
    });
  });

  return (
    <div className="grid grid-cols-4 gap-0.5">
      {columnContent.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-0.5">
          {column.map(({ post, child }, postIndex) => (
            <MasonryItem key={postIndex} post={post}>
              {child}
            </MasonryItem>
          ))}
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
    return <MasonryGrid posts={posts} children={childPosts} />;
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
