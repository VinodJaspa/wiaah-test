import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import {
  SocialStoriesModal,
  SocialPostHeader,
  SocialAffiliationCard,
  AffiliationOffersCardListWrapper,
} from "ui";
import {
  socialAffiliationCardPlaceholder,
  socialAffiliationCardPlaceholders,
} from "ui/placeholder";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export interface AffilitionOfferView {}

export const AffilitionOfferView: React.FC<AffilitionOfferView> = () => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const router = useRouter();
  console.log(router);
  const offer = socialAffiliationCardPlaceholder;
  const { data: _offer, isLoading } = useQuery(
    ["affiliationOffer", { offerId: 15 }],
    () => {
      return socialAffiliationCardPlaceholder;
    }
  );

  const otherOffers = socialAffiliationCardPlaceholders;
  const { data: _otherOffers, isLoading: offersLoading } = useQuery(
    "affiliationOffers",
    () => {
      return socialAffiliationCardPlaceholders;
    }
  );
  return (
    <Flex pb="4rem" gap="2rem" direction={"column"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="2rem"
        mb="6rem"
        align={"start"}
      >
        <SocialStoriesModal />
        <SocialPostHeader
          name={offer.user.name}
          thumbnail={offer.user.thumbnail}
        />
        <SocialAffiliationCard showPostInteraction showComments {...offer} />
      </Flex>
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {offer.user.name} {t("other_posts", "other posts")}
      </Text>
      <AffiliationOffersCardListWrapper cols={cols} items={otherOffers} />
      <Button
        _focus={{ ringColor: "primary.main" }}
        bgColor="white"
        borderWidth={"0.25rem"}
        borderColor="gray"
        mt="2rem"
        fontSize={"xl"}
        color="black"
        py="0.5rem"
        textTransform={"capitalize"}
      >
        {t("view_more", "view more")}
      </Button>
    </Flex>
  );
};
