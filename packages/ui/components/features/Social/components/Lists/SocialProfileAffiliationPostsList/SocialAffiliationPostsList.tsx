import {
  AffiliationOffersCardListWrapper,
  usePaginationControls,
} from "@blocks";
import { useGetProfileAffiliationPosts } from "@features/Social/services";
import { ScrollPaginationWrapper } from "@partials";
import { useResponsive } from "hooks";
import { useBreakpointValue } from "utils";
import React from "react";

export const SocialProfileAffiliationPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { pagination, controls } = usePaginationControls();
  const { data } = useGetProfileAffiliationPosts({
    userId,
    pagination,
  });
  const { isMobile } = useResponsive();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <ScrollPaginationWrapper controls={controls}>
      <AffiliationOffersCardListWrapper
        grid={isMobile}
        cols={cols}
        items={data || []}
      />
    </ScrollPaginationWrapper>
  );
};
