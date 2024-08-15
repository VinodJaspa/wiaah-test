import React from "react";
import {
  ListWrapper,
  SocialShopCardProps,
  ListWrapperProps,
  useShopPostPopup,
  SocialShopPostcard,
  SocialShopPostcardProps,
  useResponsive,
  PostCommentCardProps,
} from "@UI";
import { useModalDisclouser } from "@UI/../hooks";

import { newsfeedPosts } from "placeholder";
import { PostViewPopup } from "@UI/components/blocks/Popups";
import { AspectRatio } from "@partials";
import { mapArray } from "@UI/../utils/src";
import { PostCardInfo } from "types";
import { Carousel } from "@blocks/Carousel";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: SocialShopPostcardProps[];
  cols?: number;
  wrapperProps?: ListWrapperProps;
  grid?: boolean;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
  wrapperProps,
  grid,
  ...props
}) => {
  const { setCurrentPostId } = useShopPostPopup();

  const { isMobile, isTablet } = useResponsive();

  return (
    <ListWrapper gap={!isMobile} cols={isMobile ? 2 : cols}>
      {items.map((item, i) => {
        const { isOpen, handleClose, handleOpen } = useModalDisclouser();
        const images = item.postInfo.product.presentations.map(
          (image) => image.src
        );

        return (
          <React.Fragment key={i}>
            <SocialShopPostcard
              key={i}
              postInfo={item.postInfo}
              profileInfo={item.profileInfo}
              handleOpen={handleOpen}
            />
            <PostViewPopup
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              queryName="shopName"
              idParam="shopId"
              data={item}
              renderChild={(props: SocialShopPostcardProps) => {
                return (
                  <Carousel componentsPerView={1} controls={true}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`Attachment ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                );
              }}
            />
          </React.Fragment>
        );
      })}
    </ListWrapper>
  );
};
