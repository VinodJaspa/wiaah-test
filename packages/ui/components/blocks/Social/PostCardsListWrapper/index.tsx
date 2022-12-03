import { newsfeedPosts } from "placeholder";
import React from "react";
import { PostCardInfo } from "types";
import { PostCard } from "ui/components/blocks/Social/PostCard";
import { PostViewPopup } from "ui/components/blocks/Popups";
import { PostAttachmentsViewer } from "ui/components/blocks/DataDisplay";
import {
  ListWrapper,
  GridListOrganiser,
  ListWrapperProps,
} from "ui/components/blocks/Wrappers";
import { useNewsFeedPostPopup } from "ui/Hooks";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts?: PostCardInfo[];
  cols?: number;
  onPostClick?: (post: PostCardInfo) => any;
  grid?: boolean;
}

const _posts = [...Array(5)].reduce((acc) => {
  return [...acc, ...newsfeedPosts];
}, [] as PostCardInfo[]) as PostCardInfo[];

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts = _posts,
  cols = 1,
  onPostClick,
  grid,
}) => {
  const { setCurrentPost } = useNewsFeedPostPopup();
  const childPosts =
    posts && posts.map((post, idx) => <PostCard {...post} key={idx} />);
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
          rowSize="14.5rem"
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
              cols: 5,
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
      ) : (
        <ListWrapper cols={cols}>{childPosts}</ListWrapper>
      )}
    </>
  );
};
