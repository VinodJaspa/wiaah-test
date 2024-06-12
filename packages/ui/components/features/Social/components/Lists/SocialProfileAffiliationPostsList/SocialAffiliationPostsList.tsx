import {
  AffiliationOffersCardListWrapper,
  usePaginationControls,
} from "@blocks";
import { useGetProfileAffiliationPosts } from "@features/Social/services";
import { AspectRatio, Image, ScrollPaginationWrapper } from "@partials";
import { useResponsive } from "hooks";
import { mapArray, useBreakpointValue } from "utils";
import React from "react";
import { AffiliationPostPlaceholder } from "placeholder";

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
      {isMobile ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 xl:grid-cols-5">
          {mapArray(data, (v, i) => (
            <AspectRatio ratio={1}>
              <Image
                className="w-full h-full object-cover"
                src={v.affiliation.product?.thumbnail}
              />
            </AspectRatio>
          ))}
        </div>
      ) : (
        <AffiliationOffersCardListWrapper
          grid={isMobile}
          cols={cols}
          items={[AffiliationPostPlaceholder]}
        />
      )}
    </ScrollPaginationWrapper>
  );
};
