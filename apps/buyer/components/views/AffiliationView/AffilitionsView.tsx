import { Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { AffiliationOfferCardInfo } from "types";
import {
  AffiliationOffersCardListWrapper,
  PostAttachmentsViewer,
  PostViewPopup,
  SocialAffiliationCard,
} from "ui";
import { socialAffiliationCardPlaceholders } from "ui/placeholder/social";

export const AffiliationView: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  return (
    <>
      {/* <Text
        textTransform={"capitalize"}
        fontSize={"4xl"}
        pb="2rem"
        w="100%"
        textAlign={"center"}
        fontWeight="bold"
      >
        {t("affiliation", "affiliation")}
      </Text> */}
      <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          console.log("idParam", queryKey);
          const post = socialAffiliationCardPlaceholders.find(
            (post) => post.id === id
          );
          return post ? post : null;
        }}
        queryName="affiliationPost"
        idParam="affiliationPostId"
        renderChild={(props: AffiliationOfferCardInfo) => {
          return (
            <SocialAffiliationCard showPostInteraction={true} {...props} />
          );
        }}
      />
      <AffiliationOffersCardListWrapper
        onCardClick={(id) => {
          console.log(id);
          router.push(
            router.pathname,
            { query: { affiliationPostId: id } },
            {
              shallow: true,
            }
          );
        }}
        cols={cols}
        items={socialAffiliationCardPlaceholders}
      />
    </>
  );
};
