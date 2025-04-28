
import React from "react";
import { PostView, Carousel, ShadcnText } from "ui";
import { newsfeedPosts } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { AffiliationCardsListWrapper } from "../AffiliationPostListWrapper";
import { PostCardInfo } from "types";
import { useMediaQuery } from "react-responsive";

export const AffiliationOfferView: React.FC<{ offerId: string }> = ({
  offerId,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const isBase = useMediaQuery({ maxWidth: 767 }); 
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 
  const isLg = useMediaQuery({ minWidth: 1024 }); 
  
  const cols = isBase ? 1 : isMd ? 2 : isLg ? 3 : 1;

  const affiliationPost = newsfeedPosts.filter(
    (affiliation) => affiliation.postInfo.id === offerId
  );

  return (
    <div className="w-full h-full ">
      {affiliationPost[0] ? (
        <div className="flex items-start justify-center h-screen mx-28">
          <div className="w-full h-5/6 ">
            <PostView
              postId="4"
              queryName="newFeedPost"
              data={affiliationPost[0]}
              idParam="newsfeedpostid"
              renderChild={(props: PostCardInfo) => {
                const images = [affiliationPost[0].postInfo.thumbnail];
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
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-xl font-semibold">
            Post {offerId} does not exist
          </h1>
        </div>
      )}

<ShadcnText className="text-4xl font-bold w-full text-center capitalize">
        {t("other_posts", "other affiliation posts")}
      </ShadcnText>
      <div className="flex justify-center w-full h-fit">
        <div className="md:w-8/12 w-11/12">
          <AffiliationCardsListWrapper
            cols={cols}
            posts={newsfeedPosts}
            popup={false}
          />
        </div>
      </div>
    </div>
  );
};
