import { ShopCardsInfoPlaceholder } from "placeholder";
import React from "react";
import { useRouting } from "routing";
import { ShopCardInfo } from "types";
import {
  ListWrapper,
  SocialShopCard,
  SocialShopCardProps,
  ListWrapperProps,
  GridWrapper,
  ShopCardAttachment,
  useShopPostPopup,
  ShopPostViewModal,
  PostViewPopup,
} from "ui";
import { NumberShortner } from "utils";

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
  if (grid) {
    return (
      <>
        <ShopPostViewModal />
        <GridWrapper
          cols={cols}
          itemProps={{
            bgColor: "black",
          }}
          items={items.map((item, i) => ({
            displayVariant:
              i === 0
                ? "landscape"
                : i === 1
                ? "portrait"
                : i === 4
                ? "large"
                : "normal",
            component: (
              <ShopCardAttachment
                innerProps={{ onClick: () => setCurrentPostId(item.id) }}
                attachmentProps={{
                  controls: false,
                  blur: true,
                  src: item.attachments[0].src,
                  type: item.attachments[0].type,
                  footer: item.views ? (
                    <p className="w-full px-4 text-left text-xl font-bold text-white">
                      {NumberShortner(item.views)}
                    </p>
                  ) : undefined,
                }}
                productType={item.type || "product"}
                {...item}
              />
            ),
          }))}
        />
      </>
    );
  }

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
      <ListWrapper {...wrapperProps} cols={cols}>
        {items.map((shop, i) => (
          <SocialShopCard
            onCardClick={() =>
              visit((routes) => routes.addQuery({ shopPostId: shop.id }))
            }
            showComments
            key={i}
            {...props}
            shopCardInfo={shop}
          />
        ))}
      </ListWrapper>
    </>
  );
};
