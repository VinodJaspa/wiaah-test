import { ShopCardsInfoPlaceholder } from "placeholder";
import React from "react";
import { useRouting } from "routing";
import { ShopCardInfo } from "types";
import {
  GridListOrganiser,
  SocialShopCard,
  SocialShopCardProps,
  ListWrapperProps,
  useShopPostPopup,
  PostViewPopup,
  SocialShopPostcard,
} from "@UI";

export interface ShopCardsListWrapperProps
  extends Omit<SocialShopCardProps, "shopCardInfo"> {
  items: ShopCardInfo[];
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
  const { visit } = useRouting();
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
          <SocialShopPostcard
            onCardClick={() => setCurrentPostId(shop.id)}
            showComments
            key={i}
            {...props}
            postInfo={{
              createdAt: new Date().toString(),
              id: shop.id,
              numberOfComments: shop.noOfComments,
              numberOfLikes: shop.likes,
              numberOfShares: 15,
              tags: ["fashion", "gaming"],
              url: "",
              attachments: shop.attachments,
              comments: [],
              content: "test",
              views: shop.views,
            }}
            cashback={5}
            price={150}
            discount={10}
            profileInfo={{
              ...shop.user,
            }}
          />
        ))}
      </GridListOrganiser>
    </>
  );
};
