
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useGetServicePostDetails,
  PostView,
  SocialServicePostCardPlaceholder,
  SocialServicesPostCardProps,
  Carousel,
  ServiceCardsListWrapper,
  ShadcnText,
} from "ui";

export const ServicePostView: React.FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation();
  // WARNING: graphql query is not ready yet
  const {
    data: _data,
    isLoading: _isloading,
    isError: _isError,
  } = useGetServicePostDetails(postId);
  const post = SocialServicePostCardPlaceholder.filter(
    (post) => post.postInfo.id === postId
  );

  return (
    <div className="w-full h-full ">
      {post[0] ? (
        <div className="flex items-start justify-center h-screen mx-28">
          <div className="w-full h-5/6 ">
            <PostView
              postId="4"
              queryName="newFeedPost"
              data={post[0]}
              idParam="newsfeedpostid"
              renderChild={(props: SocialServicesPostCardProps) => {
                const images = [post[0].postInfo.service.thumbnail];
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
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-xl font-semibold">
            Post {postId} does not exist
          </h1>
        </div>
      )}

<ShadcnText className="text-4xl font-bold w-full text-center capitalize">
  {t("other_posts", "other posts")}
</ShadcnText>

      <div className="flex justify-center w-full h-fit">
        <div className="md:w-8/12 w-11/12">
          <ServiceCardsListWrapper
            cols={3}
            items={SocialServicePostCardPlaceholder}
            popup={false}
          />
        </div>
      </div>
    </div>
  );
};
