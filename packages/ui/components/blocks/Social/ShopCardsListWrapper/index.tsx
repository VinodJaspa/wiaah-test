import { Flex } from "@chakra-ui/react";
import React from "react";
import { ShopCardInfo } from "types/market/Social";
import { PostCard, SocialShopCard } from "ui";

export interface ShopCardsListWrapperProps {
  items: ShopCardInfo[];
  cols?: number;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
}) => {
  function sort<T>(items: T[], cols: number): { item: T; postion: number }[] {
    let postion = 0;
    const newItems: { item: T; postion: number }[] = [];

    items.map((item) => {
      if (postion >= cols) postion = 0;
      newItems.push({ item, postion });
      postion++;
    });

    return newItems;
  }
  return (
    <Flex justify={"space-between"} gap="1rem">
      {[...Array(cols)].map((_, index) => (
        <Flex w="100%" gap="1rem" direction={"column"} key={index}>
          {sort(items, cols).map(
            ({ item, postion }, i) =>
              postion == index && (
                <Flex direction={"column"} key={i}>
                  <SocialShopCard showbook shopCardInfo={item} showComments />
                </Flex>
              )
          )}
        </Flex>
      ))}
    </Flex>
  );
};
