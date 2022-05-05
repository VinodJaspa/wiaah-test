import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ShopCardInfo } from "types/market/Social";
import {
  ListWrapper,
  SocialShopCard,
  SocialShopCardProps,
  ListWrapperProps,
  GridWrapper,
  ShopCardAttachment,
  useShopPostPopup,
  ShopPostViewModal,
  usePostsCommentsDrawer,
} from "ui";
import { NumberShortner } from "../../../helpers";

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
                    <Text
                      w="100%"
                      px="1rem"
                      textAlign={"start"}
                      fontSize={"lg"}
                      fontWeight="bold"
                      color="white"
                    >
                      {NumberShortner(item.views)}
                    </Text>
                  ) : undefined,
                }}
                productType={item.type}
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
      <ListWrapper {...wrapperProps} cols={cols}>
        {items.map((shop, i) => (
          <SocialShopCard showComments key={i} {...props} shopCardInfo={shop} />
        ))}
      </ListWrapper>
    </>
  );
};
