
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import React from "react";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { PostCardsListWrapper, PostView, Carousel, ShadcnText, ShadCnButton, ShadcnFlex } from "ui";
import { useMediaQuery } from "react-responsive";

export interface GeneralPostViewProps {
  postId: string;
  children: React.ReactNode;
  allPostsData: any[];
}

export const GeneralPostView: React.FC<GeneralPostViewProps> = ({
  postId,
  children,
  allPostsData,
}) => {
  const isBase = useMediaQuery({ maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  const cols = isBase ? 1 : isMd ? 2 : isLg ? 3 : 1;
const { t } = useTranslation();
  const router = useRouter();

  const { data: _post, isLoading: PostIsLoading } = useQuery<PostCardInfo>([
    "newsFeedPost",
    { postId: router.query.postId },
    () => {
      return PostCardPlaceHolder;
    },
  ]);

  const otherPosts = newsfeedPosts;
  const { data: _otherPosts, isLoading: otherPostsIsLoading } = useQuery<
    PostCardInfo[]
  >([
    "newsFeedPost",
    { postId: router.query.postId },
    () => {
      return newsfeedPosts;
    },
  ]);

  const post = allPostsData.filter((post) => post.postInfo.id === postId);

  return (
    <ShadcnFlex className="flex flex-col gap-8 pb-2 md:pb-16">
      <div className="flex items-start justify-center h-screen mx-28">
        <div className="w-full h-5/6 ">
          {post[0] ? (
            <PostView
              postId="4"
              queryName="newFeedPost"
              data={post[0]}
              idParam="newsfeedpostid"
              renderChild={(props: PostCardInfo) => {
                const images = [props.postInfo.thumbnail];
                return (
                  <Carousel componentsPerView={1} controls={false}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`Attachment ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                );
              }}
            />
          ) : (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-4xl font-semibold">
                Post {postId} does not exist
              </h1>
            </div>
          )}
        </div>
      </div>
      <ShadcnText className="text-4xl font-bold w-full text-center capitalize">
        {t("other_posts", "other posts")}
      </ShadcnText>

      <div className="flex justify-center w-full h-fit">
        <div className="md:w-8/12 w-11/12">{children}</div>
      </div>
      <ShadCnButton
        className="focus:ring-primary bg-white border-4 border-gray mt-8 text-xl text-black py-2 capitalize"
      >
        {t("view_more", "view more")}
      </ShadCnButton>

    </ShadcnFlex>
  );
};
