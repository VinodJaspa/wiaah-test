import React from "react";
import { BsTrash } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { CartSummaryItem, ShopContactDetails } from "types";
import { useScreenWidth } from "@src/Hooks";
import {
  Absolute,
  BoldText,
  BoxShadow,
  Clickable,
  FlexStack,
  Image,
  Padding,
  Prefix,
  Releative,
  Rounded,
  Text,
  Select,
  SelectOption,
} from "@UI";
import { useTranslation } from "react-i18next";

export interface CartSummaryProdcutCardProps {
  profile?: ShopContactDetails;
  product: CartSummaryItem;
  minimal?: boolean;
  onRemove?: (itemId: string) => void;
  onMoveToWishList?: (itemId: string) => void;
  onQtyChange?: (itemId: string, Qty: number) => void;
  onProfileClick?: (shopId: string) => void;
  onContactClick?: (shopId: string) => void;
}

export const CartSummaryProductCard: React.FC<CartSummaryProdcutCardProps> = ({
  product,
  profile,
  minimal,
  onMoveToWishList,
  onQtyChange,
  onRemove,
  onContactClick,
  onProfileClick,
}) => {
  const { t } = useTranslation();
  const { min } = useScreenWidth({ minWidth: 900 });
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
    if (onProfileClick && profile) {
      onProfileClick(profile.id);
    }
  }
  function handleContactClick() {
    if (onContactClick && profile) {
      onContactClick(profile.id);
    }
  }
  function handleLocationClick() {}
  return (
    <FlexStack fullWidth>
      <FlexStack fullWidth direction="vertical">
        {profile && !minimal && (
          <>
            <FlexStack alignItems="center" justify="between">
              {/* shop info */}
              <Clickable onClick={handleProfileClick}>
                <Prefix
                  Prefix={
                    profile.imageUrl ? (
                      <Rounded radius="sm">
                        <BoxShadow>
                          <Image
                            id="ProductImage"
                            height={{ value: 2 }}
                            width={{ value: 2 }}
                            src={profile.imageUrl}
                          />
                        </BoxShadow>
                      </Rounded>
                    ) : null
                  }
                >
                  {profile.name}
                </Prefix>
              </Clickable>
              <Clickable onClick={handleContactClick}>
                <BoldText>{t("Contact Shop")}</BoldText>
              </Clickable>
            </FlexStack>
            <Padding Y={{ value: 0.2 }} />
          </>
        )}
        <FlexStack
          fullWidth
          direction={min ? "vertical" : "horizontal"}
          verticalSpacingInRem={1}
          justify="between"
        >
          <FlexStack
            direction={min ? "vertical" : "horizontal"}
            fullWidth
            horizontalSpacingInRem={1}
            verticalSpacingInRem={1}
          >
            <FlexStack fullWidth={min} justify="center">
              <Releative fullWidth>
                <Image
                  width={min ? { value: 100, unit: "%" } : undefined}
                  height={min ? { value: 16 } : undefined}
                  rotation={min ? "landscape" : "portrait"}
                  fit={"cover"}
                  size={minimal ? "lg" : "xl"}
                  src={product.imageUrl}
                />
                {product.cashback && !minimal && (
                  <Absolute
                    position={{ top: { value: 0 }, left: { value: 0 } }}
                  >
                    <div className="bg-red-500 bg-opacity-70">
                      <Padding X={{ value: 1 }}>
                        <p className="text-white">
                          {product.cashback.unit === "$" && "$"}
                          {product.cashback.value}
                          {product.cashback.unit === "%" && "%"}
                          {t("cashback", "Cashback")}
                        </p>
                      </Padding>
                    </div>
                  </Absolute>
                )}
              </Releative>
            </FlexStack>
            <FlexStack direction="vertical" fullHeight justify="between">
              <FlexStack
                verticalSpacingInRem={minimal ? 0 : 0.5}
                direction="vertical"
              >
                <span id="ProductName" className="font-bold">
                  {product.name}
                </span>
                <Text id="ProductDesc" maxLines={minimal ? 1 : 2}>
                  {product.description}
                </Text>
                <div>
                  {product.colors && (
                    <Text id="ProductColor">
                      {t("Color")}: {product.colors[0]}
                    </Text>
                  )}
                  {product.sizes && (
                    <Text id="ProductSize">
                      {t("Size")}: {product.sizes[0]}
                    </Text>
                  )}
                </div>
              </FlexStack>
              <FlexStack
                verticalSpacingInRem={minimal ? 0 : 0.5}
                direction="vertical"
              >
                {/* {!minimal && ( */}
                <Text size={minimal ? "xs" : "md"}>
                  <FlexStack
                    alignItems="center"
                    fitWidth
                    horizontalSpacingInRem={1}
                  >
                    <Clickable
                      id="RemoveProductButton"
                      onClick={handleItemDeletion}
                    >
                      <Prefix Prefix={<BsTrash />}>
                        {t("remove", "Remove")}
                      </Prefix>
                    </Clickable>
                    <Clickable
                      id="MoveToWishListButton"
                      onClick={handleMoveToWishList}
                    >
                      <Prefix Prefix={<IoHeartOutline />}>
                        {t("move_to_wishlist", "Move to wish list")}
                      </Prefix>
                    </Clickable>
                  </FlexStack>
                </Text>
                {/* )} */}
              </FlexStack>
            </FlexStack>
          </FlexStack>
          <FlexStack
            verticalSpacingInRem={minimal ? 0 : 1}
            direction={min ? "horizontal" : "vertical"}
            alignItems="end"
            justify="between"
          >
            {!minimal && (
              <div className="w-28 rounded-md">
                <Select
                  id="ProductQty"
                  onOptionSelect={(value) =>
                    handleItemQtyChange(Number(value), product.id)
                  }
                >
                  {[...Array(50)].map((_, i) => (
                    <SelectOption value={i + 1}>{i + 1}</SelectOption>
                  ))}
                </Select>
              </div>
            )}
            <FlexStack alignItems={min ? "start" : "end"} direction="vertical">
              <FlexStack horizontalSpacingInRem={0.5}>
                <BoldText>
                  <Text
                    id="ProductOldPrice"
                    lineThrough={product.oldPrice ? true : false}
                  >
                    ${product.oldPrice ? product.oldPrice : product.price}
                  </Text>
                </BoldText>
                {product.oldPrice && (
                  <BoldText>
                    <Text id="ProductPrice" color="#ff0000">
                      ${product.price}
                    </Text>
                  </BoldText>
                )}
              </FlexStack>
              {product.discount && (
                <Text id="ProductDiscount" noWrap color="#ff0000">
                  {t("you_save", "You Save")}{" "}
                  {product.discount.unit === "$" && product.discount.unit}
                  {product.discount.value}
                  {product.discount.unit === "%" && product.discount.unit}
                </Text>
              )}
            </FlexStack>
            {minimal && (
              <FlexStack
                direction="vertical"
                alignItems="end"
                verticalSpacingInRem={0.25}
              >
                <Text id="ProductQty">
                  {product.qty} {t("units", "Units")}
                </Text>
                {product.cashback && (
                  <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
                    <div className="bg-red-500 bg-opacity-70 text-xs">
                      <Padding X={{ value: 0.5 }}>
                        <p id="ProductCashBack" className="text-white">
                          {product.cashback.unit === "$" && "$"}
                          {product.cashback.value}
                          {product.cashback.unit === "%" && "%"}
                          {t("Cashback")}
                        </p>
                      </Padding>
                    </div>
                  </FlexStack>
                )}
                {product.type === "service" && (
                  <div className="w-fit bg-[#57bf9c] bg-opacity-70 text-xs">
                    <Padding X={{ value: 0.5 }}>
                      <p id="ProductBookingIndicator" className="text-white">
                        {t("Booking")}
                      </p>
                    </Padding>
                  </div>
                )}
              </FlexStack>
            )}
          </FlexStack>
        </FlexStack>
      </FlexStack>
    </FlexStack>
  );
};
