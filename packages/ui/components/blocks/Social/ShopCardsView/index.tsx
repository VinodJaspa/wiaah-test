
import React from "react";
import {
  ShopCardsListWrapper,
  PostView,
  Carousel,
  SocialShopPostcardProps,
  ShadcnText,
} from "ui";
import { SocialShopsPostCardPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export const ShopCardsView: React.FC<{ postId: string }> = ({ postId }) => {
const { t } = useTranslation();

  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });

  const cols = isLg ? 3 : isMd ? 2 : 1;

  const post = SocialShopsPostCardPlaceholder.filter(
    (shop) => shop.postInfo.id === postId
  );

  return (
    <div className="w-full h-full ">
      {post[0] ? (
        <div className="flex items-start justify-center h-screen mx-28">
          <div className="w-full h-5/6 ">
            <PostView
              postId={postId}
              queryName="shopPost"
              data={{
                postType: "shop",
                ...post[0],
              }}
              idParam="shopPostId"
              renderChild={(props: any) => {
                const images = props.postInfo.product.presentations;
                return (
                  <Carousel componentsPerView={1} controls={images.length > 1}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img src={image.src} alt={`Attachment ${index + 1}`} />
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
          <ShopCardsListWrapper
            cols={cols}
            items={SocialShopsPostCardPlaceholder}
            popup={false}
          />
        </div>
      </div>
    </div>
  );
};
