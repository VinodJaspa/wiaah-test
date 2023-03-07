import React from "react";
import { useRouting } from "routing";
import {
  GridListOrganiser,
  SocialShopCardProps,
  ListWrapperProps,
  useShopPostPopup,
  SocialShopPostcard,
  SocialShopPostcardProps,
  useResponsive,
} from "@UI";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: {
    postInfo: SocialShopPostcardProps["postInfo"];
    profileInfo: SocialShopPostcardProps["profileInfo"];
  }[];
  cols?: number;
  wrapperProps?: ListWrapperProps;
  grid?: boolean;
}

export const ShopCardsListWrapper: React.FC<ShopCardsListWrapperProps> = ({
  items,
  cols = 1,
  wrapperProps,
  grid,
  ...props
}) => {
  const { setCurrentPostId } = useShopPostPopup();

  const { isMobile, isTablet } = useResponsive();
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
        {items.map((shop, i) => (
          <SocialShopPostcard key={i} {...shop} />
        ))}
      </GridListOrganiser>
    </>
  );
};
