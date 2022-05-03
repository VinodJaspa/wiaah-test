import { Flex } from "@chakra-ui/react";
import React from "react";
import { ShopCardInfo } from "types/market/Social";
import {
  ListWrapper,
  SocialShopCard,
  SocialShopCardProps,
  ListWrapperProps,
} from "ui";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: ShopCardInfo[];
  cols?: number;
  wrapperProps?: ListWrapperProps;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
  wrapperProps,
  ...props
}) => {
  return (
    <ListWrapper {...wrapperProps} cols={cols}>
      {items.map((shop, i) => (
        <SocialShopCard key={i} {...props} shopCardInfo={shop} />
      ))}
    </ListWrapper>
  );
};
