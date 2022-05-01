import { Flex } from "@chakra-ui/react";
import React from "react";
import { AffiliationOfferCardInfo } from "types/market/Social";
import { SocialAffiliationCard, ListWrapper } from "ui";
import { SocialAffiliationCardProps } from "../SocialAffiliationCard";

export interface AffiliationOffersCardListWrapperProps
  extends Partial<SocialAffiliationCardProps> {
  items: AffiliationOfferCardInfo[];
  cols?: number;
}

export const AffiliationOffersCardListWrapper: React.FC<AffiliationOffersCardListWrapperProps> =
  ({ items, cols = 3, ...props }) => {
    return (
      <ListWrapper cols={cols}>
        {items.map((offer, i) => (
          <SocialAffiliationCard {...props} key={i} {...offer} />
        ))}
      </ListWrapper>
    );
  };

export default AffiliationOffersCardListWrapper;
