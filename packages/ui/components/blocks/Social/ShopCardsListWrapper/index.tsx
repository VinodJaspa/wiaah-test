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
} from "ui";
import { useModalDisclouser } from "hooks";

import { PostViewPopup } from "../../../../components/blocks/Popups";
import { Carousel } from "../../../blocks/Carousel";
import { useRouter } from "next/router";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: SocialShopPostcardProps[];
  cols?: number;
  wrapperProps?: ListWrapperProps;
  grid?: boolean;
  popup?: boolean;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
  wrapperProps,
  grid,
  popup = true,
  ...props
}) => {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();

  return (
    <ListWrapper gap={!isMobile} cols={isMobile ? 2 : cols}>
      {items.map((item, i) => {
        const { isOpen, handleClose, handleOpen } = useModalDisclouser();
        const images = item.postInfo.product.presentations.map(
          (image) => image.src,
        );

        return (
          <React.Fragment key={i}>
            <SocialShopPostcard
              key={i}
              postInfo={item.postInfo}
              profileInfo={item.profileInfo}
              handleOpen={
                popup
                  ? handleOpen
                  : () => router.push(`/shop/post/${item.postInfo.id}`)
              }
            />
            {popup && (
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
            )}
          </React.Fragment>
        );
      })}
    </ListWrapper>
  );
};
