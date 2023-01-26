import { useRouter } from "next/router";
import React from "react";
import {
  AffiliationOffersCardListWrapper,
  ScrollPaginationWrapper,
  useGetAffiliationPostsSuggestions,
  usePaginationControls,
} from "ui";
import { useBreakpointValue } from "utils";

export const AffiliationView: React.FC = () => {
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { pagination, controls } = usePaginationControls();
  const { data } = useGetAffiliationPostsSuggestions({
    pagination,
  });

  return (
    <ScrollPaginationWrapper controls={controls}>
      <AffiliationOffersCardListWrapper
        cols={cols}
        items={data.map((v) => ({ ...v, profile: v.user.profile }))}
      />
    </ScrollPaginationWrapper>
  );
};
