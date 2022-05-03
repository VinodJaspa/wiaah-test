import { Flex } from "@chakra-ui/react";
import React from "react";
import { AffiliationOfferCardInfo } from "types/market/Social";
import {
  SocialAffiliationCard,
  ListWrapper,
  SocialAffiliationCardProps,
  ListWrapperProps,
} from "ui";

export interface AffiliationOffersCardListWrapperProps
  extends Partial<SocialAffiliationCardProps> {
  items: AffiliationOfferCardInfo[];
  cols?: number;
  wrapperProps?: Partial<ListWrapperProps>;
}

export const AffiliationOffersCardListWrapper: React.FC<AffiliationOffersCardListWrapperProps> =
  ({ items, cols = 3, wrapperProps, ...props }) => {
    return (
      <ListWrapper {...wrapperProps} cols={cols}>
        {items.map((offer, i) => (
          <SocialAffiliationCard {...props} key={i} {...offer} />
        ))}
      </ListWrapper>
    );
  };

export default AffiliationOffersCardListWrapper;
