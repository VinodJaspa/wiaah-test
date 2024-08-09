import React from "react";
import {
  ListWrapper,
  SocialShopCardProps,
  ListWrapperProps,
  SocialServicesPostCard,
  SocialServicesPostCardProps,
  useResponsive,
} from "@UI";

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
        {items.map((service, i) => (
          <SocialServicesPostCard
            key={i}
            profileInfo={service.profileInfo}
            postInfo={service.postInfo}
            cashback={service.cashback}
            price={service.price}
            discount={service.discount}
          />
        ))}
      </ListWrapper>
    </>
  );
};
