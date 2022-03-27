import { t } from "i18next";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { IoMdClock } from "react-icons/io";
import {
  IoCalendar,
  IoHeartOutline,
  IoHome,
  IoLocation,
} from "react-icons/io5";
import { CartSummaryItem } from "types/market/CartSummary";
import { useScreenWidth } from "../../Hooks";
import { getDate, getTime } from "../helpers/Date";
import {
  BoldText,
  BoxShadow,
  Clickable,
  FlexStack,
  Image,
  Padding,
  Prefix,
  Rounded,
  SelectDropdown,
  Text,
} from "../partials";

export interface CartSummaryProdcutCardProps {
  profile: {
    name: string;
    thumbnailUrl: string;
    profileId: string;
  };
  product: CartSummaryItem;
  onRemove?: (itemId: string) => void;
  onMoveToWishList?: (itemId: string) => void;
  onQtyChange?: (itemId: string, Qty: number) => void;
  onProfileClick?: (shopId: string) => void;
  onContactClick?: (shopId: string) => void;
}

export const CartSummaryProductCard: React.FC<CartSummaryProdcutCardProps> = ({
  product,
  profile,
  onMoveToWishList,
  onQtyChange,
  onRemove,
  onContactClick,
  onProfileClick,
}) => {
  const { min } = useScreenWidth({ minWidth: 758 });
  function handleItemQtyChange(qty: number, id: string) {
    if (onQtyChange) onQtyChange(id, qty);
  }
  function handleMoveToWishList() {
    if (onMoveToWishList) {
      onMoveToWishList(product.id);
    }
  }
  function handleItemDeletion() {
    if (onRemove) {
      onRemove(product.id);
    }
  }
  function handleProfileClick() {
    if (onProfileClick) {
      onProfileClick(profile.profileId);
    }
  }
  function handleContactClick() {
    if (onContactClick) {
      onContactClick(profile.profileId);
    }
  }
  return (
    <FlexStack fullWidth>
      <BoxShadow>
        <Padding Y={{ value: 1 }} X={{ value: 0.5 }}>
          <FlexStack fullWidth direction="vertical">
            <FlexStack alignItems="center" justify="between">
              {/* shop info */}
              <Clickable onClick={handleProfileClick}>
                <Prefix
                  prefix={
                    profile.thumbnailUrl ? (
                      <Rounded radius="sm">
                        <BoxShadow>
                          <Image
                            height={{ value: 2 }}
                            width={{ value: 2 }}
                            src={profile.thumbnailUrl}
                          />
                        </BoxShadow>
                      </Rounded>
                    ) : null
                  }
                >
                  {profile.name ? profile.name : null}
                </Prefix>
              </Clickable>
              <Clickable onClick={handleContactClick}>
                <BoldText>{t("contact_shop", "Contact Shop")}</BoldText>
              </Clickable>
            </FlexStack>
            <Padding Y={{ value: 0.5 }} />
            <FlexStack
              fullWidth
              direction={min ? "vertical" : "horizontal"}
              verticalSpacingInRem={1}
              horizontalSpacingInRem={min ? 1 : 4}
              justify="between"
            >
              <FlexStack horizontalSpacingInRem={1} verticalSpacingInRem={1}>
                <Image rotation="portrait" size="lg" src={product.imageUrl} />
                <FlexStack direction="vertical" fullHeight justify="between">
                  <FlexStack direction="vertical">
                    <BoldText>{product.name}</BoldText>
                    <Text maxLines={2}>{product.description}</Text>
                  </FlexStack>
                  <FlexStack direction="vertical">
                    {product.type === "service" && (
                      <FlexStack direction="vertical">
                        {product.date && (
                          <FlexStack horizontalSpacingInRem={0.5}>
                            <Prefix prefix={<IoCalendar />}>
                              {getDate(product.date)}
                            </Prefix>

                            {product.eventDuration && (
                              <Prefix prefix={<IoMdClock />}>
                                {getTime(product.date, product.eventDuration)}
                              </Prefix>
                            )}
                          </FlexStack>
                        )}
                        {product.eventAdresses && product.location && (
                          <FlexStack horizontalSpacingInRem={0.5}>
                            {product.eventAdresses && (
                              <Prefix prefix={<IoHome />}>
                                {product.eventAdresses}
                              </Prefix>
                            )}
                            {product.location && (
                              <Prefix prefix={<IoLocation />}>
                                {product.location}
                              </Prefix>
                            )}
                          </FlexStack>
                        )}
                      </FlexStack>
                    )}
                    <FlexStack widthFit horizontalSpacingInRem={1}>
                      <Clickable onClick={handleItemDeletion}>
                        <Prefix prefix={<BsTrash />}>
                          {t("remove", "Remove")}
                        </Prefix>
                      </Clickable>
                      <Clickable onClick={handleMoveToWishList}>
                        <Prefix prefix={<IoHeartOutline />}>
                          {t("move_to_wishlist", "Move to wish list")}
                        </Prefix>
                      </Clickable>
                    </FlexStack>
                  </FlexStack>
                </FlexStack>
              </FlexStack>
              <FlexStack
                direction="vertical"
                alignItems="end"
                justify="between"
              >
                <div className="w-28 rounded-md">
                  <SelectDropdown
                    onSelection={(value) =>
                      handleItemQtyChange(Number(value), product.id)
                    }
                    initialValue={String(product.qty)}
                    fullWidth={true}
                    options={[...Array(50)].map((_, i) => ({
                      name: String(i + 1),
                      value: String(i + 1),
                    }))}
                  />
                </div>
                <FlexStack alignItems="end" direction="vertical">
                  <FlexStack horizontalSpacingInRem={0.5}>
                    <BoldText>
                      <Text lineThrough={product.oldPrice ? true : false}>
                        ${product.price}
                      </Text>
                    </BoldText>
                    {product.oldPrice && (
                      <BoldText>
                        <Text color="#ff0000">${product.oldPrice}</Text>
                      </BoldText>
                    )}
                  </FlexStack>
                  {product.discount && (
                    <Text color="#ff0000">
                      {t("you_save", "You Save")}{" "}
                      {product.discount.unit === "$" && product.discount.unit}
                      {product.discount.value}
                      {product.discount.unit === "%" && product.discount.unit}
                    </Text>
                  )}
                </FlexStack>
              </FlexStack>
            </FlexStack>
          </FlexStack>
        </Padding>
      </BoxShadow>
    </FlexStack>
  );
};
