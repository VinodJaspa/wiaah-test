import React from "react";
import { useRouting } from "routing";
import {
  GridListOrganiser,
  ListWrapper,
  SocialShopCardProps,
  ListWrapperProps,
  useShopPostPopup,
  SocialShopPostcard,
  SocialShopPostcardProps,
  useResponsive,
} from "@UI";
import { ShopCardInfo } from "types";

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
    <>
      <ListWrapper cols={cols}>
        {items.map((shop, i) => (
          <SocialShopPostcard
            key={i}
            postInfo={shop.postInfo}
            profileInfo={shop.profileInfo}
          />
        ))}
      </ListWrapper>
    </>
  );
};
