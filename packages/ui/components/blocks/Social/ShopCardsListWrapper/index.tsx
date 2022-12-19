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
      <PostViewPopup
        fetcher={async ({ queryKey }: any) => {
          const id = queryKey[1].postId;

          const post = ShopCardsInfoPlaceholder.find((post) => post.id === id);
          return post ? post : null;
        }}
        queryName="shopPost"
        idParam="shopPostId"
        renderChild={(props: ShopCardInfo) => {
          return (
            <SocialShopCard
              showCommentInput={false}
              showInteraction={false}
              shopCardInfo={props}
            />
          );
        }}
      />

      <GridListOrganiser
        rowSize="14.5rem"
        presets={[
          {
            length: 6,
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
            length: 8,
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
            length: 9,
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
            onCardClick={() =>
              visit((routes) => routes.addQuery({ shopPostId: shop.id }))
            }
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
