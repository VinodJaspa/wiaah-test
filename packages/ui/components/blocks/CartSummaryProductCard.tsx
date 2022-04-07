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
import { CartSummaryItem, ShopContactDetails } from "types/market/CartSummary";
import { useScreenWidth } from "../../Hooks";
import { colorPalette } from "../helpers/colorPalette";
import { getDate, getTime } from "../helpers/Date";
import {
  Absolute,
  BoldText,
  BoxShadow,
  Clickable,
  FlexStack,
  Grid,
  Image,
  Padding,
  Prefix,
  Releative,
  Rounded,
  SelectDropdown,
  Text,
} from "../partials";

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
                <BoldText>{t("contact_shop", "Contact Shop")}</BoldText>
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
                        <Text color={colorPalette.whiteText}>
                          {product.cashback.unit === "$" && "$"}
                          {product.cashback.value}
                          {product.cashback.unit === "%" && "%"}
                          {t("cashback", "Cashback")}
                        </Text>
                      </Padding>
                    </div>
                  </Absolute>
                )}
                {product.type === "service" && !minimal && (
                  <Absolute
                    position={{ bottom: { value: 0 }, right: { value: 0 } }}
                  >
                    <div className="bg-[#57bf9c] bg-opacity-70">
                      <Padding X={{ value: 1 }}>
                        <Text color={colorPalette.whiteText}>
                          {t("booking", "Booking")}
                        </Text>
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
                  {product.color && (
                    <Text id="ProductColor">
                      {t("color", "Color")}: {product.color}
                    </Text>
                  )}
                  {product.size && (
                    <Text id="ProductSize">
                      {t("size", "Size")}: {product.size}
                    </Text>
                  )}
                </div>
              </FlexStack>
              <FlexStack
                verticalSpacingInRem={minimal ? 0 : 0.5}
                direction="vertical"
              >
                {product.type === "service" && (
                  <div className="text-xs">
                    <Grid fitWidth colsGap={{ value: 0.5 }} cols={min ? 1 : 2}>
                      {product.date && (
                        <FlexStack
                          direction="vertical"
                          horizontalSpacingInRem={0.5}
                        >
                          <Prefix Prefix={<IoCalendar />}>
                            {getDate(product.date)}
                          </Prefix>

                          {product.eventDuration && (
                            <Prefix id="" Prefix={<IoMdClock />}>
                              {getTime(product.date, product.eventDuration)}
                            </Prefix>
                          )}
                        </FlexStack>
                      )}
                      {product.eventAdresses && product.location && (
                        <FlexStack
                          direction="vertical"
                          horizontalSpacingInRem={0.5}
                        >
                          {product.eventAdresses && (
                            <Prefix id="ProductAddress" Prefix={<IoHome />}>
                              {product.eventAdresses}
                            </Prefix>
                          )}
                          {product.location && (
                            <Clickable onClick={handleLocationClick}>
                              <Prefix
                                id="ProductLocation"
                                Prefix={<IoLocation />}
                              >
                                {product.location}
                              </Prefix>
                            </Clickable>
                          )}
                        </FlexStack>
                      )}
                    </Grid>
                  </div>
                )}

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
                <SelectDropdown
                  id="ProductQty"
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
                        <Text
                          id="ProductCashBack"
                          color={colorPalette.whiteText}
                        >
                          {product.cashback.unit === "$" && "$"}
                          {product.cashback.value}
                          {product.cashback.unit === "%" && "%"}
                          {t("cashback", "Cashback")}
                        </Text>
                      </Padding>
                    </div>
                  </FlexStack>
                )}
                {product.type === "service" && (
                  <div className="w-fit bg-[#57bf9c] bg-opacity-70 text-xs">
                    <Padding X={{ value: 0.5 }}>
                      <Text
                        id="ProductBookingIndicator"
                        color={colorPalette.whiteText}
                      >
                        {t("booking", "Booking")}
                      </Text>
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
