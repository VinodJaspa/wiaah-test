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
  const { visit } = useRouting();
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
                  //@ts-ignore
                  typeof post.postInfo.attachments[0] === "object"
                    ? //@ts-ignore
                      post?.postInfo?.attachments[0]?.type
                    : "image"
                }
                footer={
                  post.postInfo.views ? (
                    <span className="w-full px-4 text-left text-xl font-bold text-white">
                      {NumberShortner(post.postInfo.views)}
                    </span>
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
      <>
        <PostViewPopup
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
        <ListWrapper {...props} cols={cols}>
          {posts &&
            posts.map((post) => (
              <PostCard
                showComments
                innerProps={{
                  onClick: () => {
                    visit((routes) =>
                      routes.addQuery({ newsfeedpostid: post.postInfo.id })
                    );
                  },
                }}
                {...post}
                key={post.postInfo.id}
              />
            ))}
        </ListWrapper>
      </>
    );
  }
};
