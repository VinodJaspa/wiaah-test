import { ProductCheckoutData, ProductType } from "api";
import { useScreenWidth } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import {
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
  AspectRatio,
} from "@UI";
import { setTestid } from "utils";
import {
  CartProduct,
  OrderItem,
  Product,
  ProductAttribute,
} from "@features/API";

type productDataType = Pick<CartProduct, "id" | "qty" | "productId"> & {
  product: Pick<Product, "title" | "description" | "attributes"> & {
    attributes: Pick<ProductAttribute, "name" | "values">[];
  };
};

export interface ProductCheckoutCardProps extends ProductCheckoutData {
  onItemDelete?: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

export const ProductCheckoutCard: React.FC<ProductCheckoutCardProps> = ({
  cashback,
  color,
  description,
  discount,
  id,
  name,
  price,
  qty,
  shippingMethods,
  size,
  thumbnail,
  type,
  onItemDelete,
  onMoveToWishlist,
}) => {
  const { t } = useTranslation();
  const { min } = useScreenWidth({ minWidth: 900 });

  function handleMoveToWishList() {
    if (onMoveToWishlist) {
      onMoveToWishlist(id);
    }
  }
  function handleItemDeletion() {
    if (onItemDelete) {
      onItemDelete(id);
    }
  }

  return type === "goods" ? (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div
          className={`${
            min ? "flex-col" : "flex-row"
          } flex w-full gap-4 justify-between`}
        >
          <div className={`flex flex-col sm:flex-row w-full gap-4`}>
            <div className={`${min ? "w-full" : ""} flex justify-center`}>
              <div className="relative w-full sm:w-40">
                <AspectRatioImage
                  src={thumbnail}
                  alt={name}
                  ratio={min ? 9 / 16 : 6 / 4}
                />
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
                      {t("You Save")} %{discount}
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
                              {method.deliveryTime.to} {t("Days")}
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
                      {...setTestid("DeleteBtn")}
                      onClick={handleItemDeletion}
                    >
                      <Prefix Prefix={<BsTrash />}>{t("Remove")}</Prefix>
                    </div>
                    <div
                      className="cursor-pointer"
                      id="MoveToWishListButton"
                      onClick={handleMoveToWishList}
                      {...setTestid("MoveToWishlistBtn")}
                    >
                      <Prefix Prefix={<IoHeartOutline />}>
                        {t("Move to wish list")}
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
  ) : (
    <div className="p-4 h-16 flex gap-4">
      <AspectRatio className="w-16" ratio={4 / 6}>
        <div className="bg-gray-200 h-full w-full"></div>
      </AspectRatio>

      <div>{name}</div>
    </div>
  );
};
