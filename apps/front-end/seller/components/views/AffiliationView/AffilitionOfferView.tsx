import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SocialPostHeader,
  SocialAffiliationCard,
  AffiliationOffersCardListWrapper,
  useGetAffiliationPostQuery,
  useGetProfileAffiliationPosts,
  usePaginationControls,
  ScrollPaginationWrapper,
  Button,
} from "ui";
import { useBreakpointValue } from "utils";
import { AffiliationPostPlaceholder } from "placeholder";

export interface AffilitionOfferView {
  id: string;
}

export const AffilitionOfferView: React.FC<AffilitionOfferView> = ({ id }) => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // use this graphql query only if the server is ready if not use placeholder data
  // const { data } = useGetAffiliationPostQuery({
  //   id,
  // });
  //

  const [data] = useState(AffiliationPostPlaceholder);

  const { controls, pagination } = usePaginationControls();
  const { data: profilePosts } = useGetProfileAffiliationPosts(
    {
      userId: data.userId,
      pagination,
    },
    { enabled: !!data.userId }
  );

  return (
    <div className="flex pb-16 gap-8 flex-col">
      <div className="flex flex-col gap-8 mb-24 align-start md:flex-row">
        <SocialPostHeader
          name={data.user.profile.username}
          thumbnail={data.user.profile.photo}
        />
        {data ? (
          <SocialAffiliationCard showPostInteraction showComments post={data} />
        ) : null}
      </div>
      <p className="text-2xl font-bold w-full text-center">
        {t("view")} {data.user?.profile.username} {t("other posts")}
      </p>
      <ScrollPaginationWrapper controls={controls}>
        <AffiliationOffersCardListWrapper cols={cols} items={[data]} />
      </ScrollPaginationWrapper>
      <Button>{t("view more")}</Button>
    </div>
  );
};
