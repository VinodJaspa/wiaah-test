import { Flex } from "@chakra-ui/react";
import React from "react";
import { AffiliationOfferCardInfo } from "types/market/Social";
import { SocialAffiliationCard } from "./SocialAffiliationCard";
import { SocialShopCard } from "./SocialShopCard";

export interface AffiliationOffersCardListWrapperProps {
  items: AffiliationOfferCardInfo[];
  cols?: number;
}

export const AffiliationOffersCardListWrapper: React.FC<AffiliationOffersCardListWrapperProps> =
  ({ items, cols = 3 }) => {
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
      <Flex data-testid="ColumnsWrapper" justify={"space-between"} gap="1rem">
        {[...Array(cols)].map((_, index) => (
          <Flex w="100%" gap="1rem" direction={"column"} key={index}>
            {sort(items, cols).map(
              ({ item, postion }, i) =>
                postion == index && (
                  <SocialAffiliationCard
                    key={i}
                    data-testid="AffiliationCard"
                    {...item}
                    showComments
                  />
                )
            )}
          </Flex>
        ))}
      </Flex>
    );
  };

export default AffiliationOffersCardListWrapper;
