import { ProductCheckoutData } from "api";
import { useScreenWidth } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import {
  Image,
  EllipsisText,
  Prefix,
  PriceDisplay,
  UnDiscountedPriceDisplay,
  BoldText,
  CashbackBadge,
  Radio,
  Table,
  TBody,
  Tr,
  Td,
  AspectRatioImage,
} from "ui";

export interface ProductCheckoutCardProps extends ProductCheckoutData {}

export const ProductCheckoutCard: React.FC<ProductCheckoutCardProps> = ({
  cashback,
  color,
  description,
  discount,
  id,
  location,
  name,
  price,
  qty,
  shippingMethods,
  size,
  thumbnail,
}) => {
  const { t } = useTranslation();
  const { min } = useScreenWidth({ minWidth: 900 });
  function handleItemQtyChange(qty: number, id: string) {
    // if (onQtyChange) onQtyChange(id, qty);
  }
  function handleMoveToWishList() {
    // if (onMoveToWishList) {
    //   onMoveToWishList(product.id);
    // }
  }
  function handleItemDeletion() {
    // if (onRemove) {
    //   onRemove(product.id);
    // }
  }
  function handleProfileClick() {
    // if (onProfileClick && profile) {
    //   onProfileClick(profile.id);
    // }
  }
  function handleContactClick() {
    // if (onContactClick && profile) {
    //   onContactClick(profile.id);
    // }
  }
  function handleLocationClick() {}

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div
          className={`${
            min ? "flex-col" : "flex-row"
          } flex w-full gap-4 justify-between`}
        >
          <div className={`${min ? "flex-col" : "flex-row"} flex w-full gap-4`}>
            <div className={`${min ? "w-full" : ""} flex justify-center`}>
              <div className="relative w-40">
                <AspectRatioImage src={thumbnail} alt={name} ratio={6 / 4} />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex  justify-between">
                <div className="flex flex-col">
                  <span id="ProductName" className="font-bold">
                    {name}
                  </span>
                  <EllipsisText maxLines={1}>{description}</EllipsisText>
                  <div>
                    {color && (
                      <p id="ProductColor">
                        {t("Color")}: {color}
                      </p>
                    )}
                    {size && (
                      <p id="ProductSize">
                        {t("Size")}: {size}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    min ? "items-start" : "items-end"
                  } flex flex-col`}
                >
                  <div className="flex gap-2">
                    <BoldText>
                      <UnDiscountedPriceDisplay
                        id="ProductOldPrice"
                        amount={price}
                        discount={discount}
                      />
                    </BoldText>
                    <BoldText>
                      <PriceDisplay price={price} />
                    </BoldText>
                  </div>
                  {discount && (
                    <p
                      className="text-[#ff0000] whitespace-nowrap"
                      id="ProductDiscount"
                    >
                      {t("you_save", "You Save")} %{discount}
                    </p>
                  )}
                </div>
              </div>

              <Table TdProps={{ className: "py-1 px-0" }} className="text-xs">
                <TBody>
                  {Array.isArray(shippingMethods)
                    ? shippingMethods.map((method) => (
                        <Tr>
                          <Td>
                            <Radio
                              name={`shippingMethod-${id}`}
                              value={method.value}
                            >
                              {method.name}
                            </Radio>
                          </Td>
                          <Td>
                            <PriceDisplay price={method.cost} />
                          </Td>
                          <Td>
                            <p>
                              {t("Available in")} {method.deliveryTime.from} -{" "}
                              {method.deliveryTime.to}
                            </p>
                          </Td>
                        </Tr>
                      ))
                    : null}
                </TBody>
              </Table>

              <div className="flex items-end gap-1 justify-between">
                <p className="text-xs">
                  <div className="flex items-center w-fit gap-1">
                    <div
                      className="cursor-pointer"
                      id="RemoveProductButton"
                      onClick={handleItemDeletion}
                    >
                      <Prefix Prefix={<BsTrash />}>{t("Remove")}</Prefix>
                    </div>
                    <div
                      className="cursor-pointer"
                      id="MoveToWishListButton"
                      onClick={handleMoveToWishList}
                    >
                      <Prefix Prefix={<IoHeartOutline />}>
                        {t("move_to_wishlist", "Move to wish list")}
                      </Prefix>
                    </div>
                  </div>
                </p>
                <div className="flex flex-col text-xs items-end gap-1">
                  <p id="ProductQty">
                    {qty} {t("Units")}
                  </p>
                  {cashback && <CashbackBadge {...cashback} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <div
  className={`${min ? "flex-row" : "flex-col"} flex items-end justify-between`}
>
  
</div>; */
}
