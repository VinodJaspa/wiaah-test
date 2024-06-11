import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AffiliationOffersCardListWrapper,
  ScrollPaginationWrapper,
  useGetAffiliationPostsSuggestions,
  usePaginationControls,
} from "ui";
import { useBreakpointValue } from "utils";
import {
  SocialProfileInfo,
  AffiliationPostSuggestionsPlaceholder,
} from "placeholder";

export const AffiliationView: React.FC = () => {
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { pagination, controls } = usePaginationControls();
  // use this graphql endpoint if the server is ready if not use placholder data
  // const { data } = useGetAffiliationPostsSuggestions({
  //   pagination,
  // });

  const data = useState();

  return (
    <ScrollPaginationWrapper controls={controls}>
      <AffiliationOffersCardListWrapper
        cols={cols}
        items={AffiliationPostSuggestionsPlaceholder}
      />
    </ScrollPaginationWrapper>
  );
};
