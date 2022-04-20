import { Flex } from "@chakra-ui/react";
import React from "react";
import { ShopCardInfo } from "types/market/Social";
import { ListWrapper, SocialShopCard } from "ui";
import { SocialShopCardProps } from "../SocialShopCard";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: ShopCardInfo[];
  cols?: number;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
  ...props
}) => {
  return (
    <ListWrapper cols={cols}>
      {items.map((shop, i) => (
        <SocialShopCard key={i} {...props} shopCardInfo={shop} />
      ))}
    </ListWrapper>
  );
};
