import React from "react";
import { useRouting } from "routing";
import {
  GridListOrganiser,
  SocialShopCardProps,
  ListWrapperProps,
  useShopPostPopup,
  SocialShopPostcard,
  ProductPost,
  SocialShopPostcardProps,
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

  return (
    <>
      <GridListOrganiser
        rowSize="14.5rem"
        presets={[
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
        ]}
      >
        {items.map((shop, i) => (
          <SocialShopPostcard key={i} {...shop} />
        ))}
      </GridListOrganiser>
    </>
  );
};
