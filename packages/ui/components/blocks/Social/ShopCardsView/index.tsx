import { Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  ShopCardsListWrapper,
  PostView,
  Carousel,
  SocialShopPostcardProps,
} from "ui";
import { SocialShopsPostCardPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";

export const ShopCardsView: React.FC<{ postId: string }> = ({ postId }) => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

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
              data={post[0]}
              idParam="shopPostId"
              renderChild={(props: SocialShopPostcardProps) => {
                const images = post[0].postInfo.product.presentations;
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

      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("other_posts", "other posts")}
      </Text>
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
