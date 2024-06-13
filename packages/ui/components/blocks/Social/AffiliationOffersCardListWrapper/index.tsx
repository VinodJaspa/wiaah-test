import React from "react";
import {
  SocialAffiliationCard,
  ListWrapper,
  SocialAffiliationCardProps,
  ListWrapperProps,
  useAffiliationPostViewPopup,
  NumberShortner,
  PostAttachment,
  GridWrapper,
  GridListOrganiser,
  useResponsive,
} from "@UI";
import { Text } from "@chakra-ui/react";
import { AttachmentType } from "@features/API";
import { getRandomImage } from "placeholder";

export interface AffiliationOffersCardListWrapperProps {
  items: SocialAffiliationCardProps["post"][];
  cols?: number;
  wrapperProps?: Partial<ListWrapperProps>;
  grid?: boolean;
}

export const AffiliationOffersCardListWrapper: React.FC<
  AffiliationOffersCardListWrapperProps
> = ({ items, cols = 3, wrapperProps, grid }) => {
  const { setCurrentPost } = useAffiliationPostViewPopup();
  const { isMobile, isTablet } = useResponsive();

  if (grid) {
    return (
      <>
        <GridListOrganiser
          rowSize={isMobile ? "6rem" : isTablet ? "10rem" : "14.5rem"}
          presets={
            isMobile
              ? [
                {
                  cols: 3,
                  points: [
                    {
                      c: 2,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 2,
                      r: 2,
                    },
                    {
                      c: 2,
                      r: 1,
                    },
                  ],
                },
                {
                  cols: 3,
                  points: [
                    { c: 2, r: 2 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 2, r: 1 },
                    { c: 1, r: 1 },
                    { c: 2, r: 1 },
                    { c: 1, r: 1 },
                  ],
                },

                {
                  cols: 2,
                  points: [
                    {
                      c: 2,
                      r: 1,
                    },
                    {
                      c: 2,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 2,
                      r: 1,
                    },
                  ],
                },
              ]
              : [
                {
                  cols: 5,
                  points: [
                    {
                      c: 2,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                  ],
                },
                {
                  cols: 5,
                  points: [
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 2 },
                    { c: 2, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                  ],
                },

                {
                  cols: 4,
                  points: [
                    {
                      c: 2,
                      r: 1,
                    },
                    {
                      c: 2,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 2,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 1,
                      r: 1,
                    },
                    {
                      c: 2,
                      r: 1,
                    },
                  ],
                },
              ]
          }
        >
          {items.map((post, i) => (
            <>
              test
              <PostAttachment
                style={{ onClick: () => setCurrentPost(post.id) }}
                blur
                key={i}
                src={getRandomImage()}
                type={AttachmentType.Img}
                footer={
                  post.views ? (
                    <div className="w-full px-4 text-start text-lg font-bold text-white">
                      {NumberShortner(post.views)}
                    </div>
                  ) : undefined
                }
              />
            </>
          ))}
        </GridListOrganiser>
      </>
    );
  } else {
    return (
      <ListWrapper {...wrapperProps} cols={cols}>
        {items.map((offer, i) => (
          <SocialAffiliationCard showComments key={i} post={offer} />
        ))}
      </ListWrapper>
    );
  }
};

export default AffiliationOffersCardListWrapper;
