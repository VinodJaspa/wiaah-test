import {
  AffiliationOffersCardListWrapper,
  usePaginationControls,
} from "@blocks";
import { useGetProfileAffiliationPosts } from "@features/Social/services";
import { AspectRatio, Image, ScrollPaginationWrapper } from "@partials";
import { useResponsive } from "hooks";
import { mapArray, useBreakpointValue } from "utils";
import React from "react";
import {
  AffiliationPostPlaceholder,
  AffiliationPostListPlaceholder,
  getRandomImage,
} from "placeholder";

export const SocialProfileAffiliationPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { pagination, controls } = usePaginationControls();

  // WARNING: This grqphql is not working so I replaced it with placeholder once it's ready replace it back
  const { data: _affiliationPosts } = useGetProfileAffiliationPosts({
  userId, pagination;
  });
  const { isMobile } = useResponsive();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <ScrollPaginationWrapper controls={controls}>
      {isMobile ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 xl:grid-cols-5">
          {mapArray(AffiliationPostListPlaceholder, (v, i) => (
            <AspectRatio ratio={1}>
              <Image
                className="w-full h-full object-cover"
                src={getRandomImage()}
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
