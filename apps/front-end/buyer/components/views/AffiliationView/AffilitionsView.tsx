import { Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { AccountType, AffiliationOfferCardInfo } from "types";
import {
  AffiliationOffersCardListWrapper,
  PostAttachmentsViewer,
  PostViewPopup,
  SocialAffiliationCard,
} from "ui";
import {
  socialAffiliationCardPlaceholders,
  AffiliationPostListPlaceholder,
} from "ui/placeholder/social";
import { SocialAffiliationCardProps } from "ui";
import {
  AffiliationStatus,
  CashbackType,
  PresentationType,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  ProductCategoryStatus,
  ProductCondition,
  AccountStatus,
} from "@features/API";
import { getRandomImage } from "placeholder";
import { getRandomName } from "utils";
import { FaKey } from "react-icons/fa";

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
            <SocialAffiliationCard
              showPostInteraction={true}
              post={AffiliationPostListPlaceholder[0]}
              {...props}
            />
          );
        }}
      />
      <AffiliationOffersCardListWrapper
        // onCardClick={(id: any) => {
        //   console.log(id);
        //   router.push(
        //     router.pathname,
        //     { query: { affiliationPostId: id } },
        //     {
        //       shallow: true,
        //     }
        //   );
        // }}
        cols={cols}
        items={AffiliationPostListPlaceholder}
      />
    </>
  );
};
