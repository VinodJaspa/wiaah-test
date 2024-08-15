import React from "react";
import {
  ListWrapper,
  SocialShopCardProps,
  ListWrapperProps,
  SocialServicesPostCard,
  SocialServicesPostCardProps,
  useResponsive,
  PostViewPopup,
  Carousel,
} from "@UI";
import { useModalDisclouser } from "hooks";

export interface ServiceCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: SocialServicesPostCardProps[];
  cols?: number;
  wrapperProps?: ListWrapperProps;
  grid?: boolean;
}

export const ServiceCardsListWrapper: React.FC<
  ServiceCardsListWrapperProps
> = ({ items, cols = 1, wrapperProps, grid, ...props }) => {
  const { isMobile } = useResponsive();
  return (
    <>
      <ListWrapper gap={!isMobile} squareItem={false} cols={cols}>
        {items.map((service, i) => {
          const { isOpen, handleClose, handleOpen } = useModalDisclouser();
          const images = [service.postInfo.service.thumbnail];
          return (
            <React.Fragment key={i}>
              <SocialServicesPostCard
                key={i}
                profileInfo={service.profileInfo}
                postInfo={service.postInfo}
                cashback={service.cashback}
                price={service.price}
                discount={service.discount}
                handleOpne={handleOpen}
              />

              <PostViewPopup
                isOpen={isOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                queryName="shopName"
                idParam="shopId"
                data={service}
                renderChild={(props: SocialServicesPostCardProps) => {
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
    </>
  );
};
