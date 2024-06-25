import { ProductCheckoutData } from "api";
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
  Image,
  HStack,
  Button,
  EditNoteIcon,
  HeartIcon,
  TrashIcon,
  Verified,
} from "@UI";
import { mapArray, setTestid } from "utils";
import {
  OrderItem,
  Product,
  ProductAttribute,
  ProductType,
} from "@features/API";
import { GiCheckMark } from "react-icons/gi";

export interface ProductCheckoutCardProps {
  id: string;
  shopName: string;
  shopVerified: boolean;
  title: string;
  size: string;
  color: string;
  thumbnail: string;
  qty: number;
  price: number;
  total: number;
  shippingMethods: {
    name: string;
    price: number;
    deliveryRange: [number, number];
  }[];
  type: ProductType;
  format?: string;
  onItemDelete?: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

export const ProductCheckoutCard: React.FC<ProductCheckoutCardProps> = ({
  color,
  price,
  qty,
  shippingMethods,
  shopName,
  shopVerified,
  size,
  thumbnail,
  total,
  id,
  title,
  type,
  format,
  onItemDelete,
  onMoveToWishlist,
}) => {
  const { t } = useTranslation();

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

  const showOn = (types: ProductType[]) => types.includes(type);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-3">
        <Image
          src={thumbnail}
          className="rounded-[0.625rem] h-[11.813rem] object-cover min-w-[13.75rem]"
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <HStack className="text-lg">
              <p className="font-semibold ">{shopName}</p>
              {shopVerified ? <Verified className="text-primary" /> : null}
            </HStack>
            <p className="font-semibold text-2xl">{title}</p>
            <div className=""></div>
          </div>

          {showOn([ProductType.Digital]) ? (
            <div className="rounded-md bg-iconGray w-12 h-9 flex justify-center items-center text-white text-lg font-medium uppercase">
              {format}
            </div>
          ) : null}

          {showOn([ProductType.Goods]) ? (
            <>
              <HStack>
                {/* <p className="font-medium text-lg">{t("Selected Size")}:</p> */}
                <div className="rounded-md bg-primary w-9 h-9 flex justify-center items-center text-white text-lg font-medium uppercase">
                  {size}
                </div>
              </HStack>
              <HStack>
                <p className="font-medium text-lg">{t("Selected Colour")}:</p>
                <div className="border-primary rounded-md p-[0.125rem] border-2 w-9 h-9 text-lg font-medium">
                  <div
                    style={{ backgroundColor: `${color}` }}
                    className="w-full h-full rounded-md flex justify-center items-center"
                  >
                    <GiCheckMark className="text-white" />
                  </div>
                </div>
              </HStack>
            </>
          ) : null}
        </div>
      </div>

      {showOn([ProductType.Goods]) ? (
        <>
          <p className="font-semibold text-[1.375rem]">{t("Order details")}:</p>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[1.375rem] border-b-2 border-b-black pb-2 w-fit">
              {t("Quantity")}
            </p>
            <p className="font-medium text-lg whitespace-nowrap flex items-center gap-1">
              {qty} {t("Unit")}{" "}
              <span className="flex font-normal text-base">
                (<PriceDisplay price={price}></PriceDisplay>/{t("Unit")})
              </span>
            </p>
          </div>
        </>
      ) : null}

      {showOn([ProductType.Goods]) ? (
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-[1.375rem] border-b-2 border-b-black pb-2 w-fit">
            {t("Shipping method")}
          </p>

          {mapArray(shippingMethods, (v, i) => (
            <div className="w-full grid grid-cols-12 gap-2">
              <div className="col-span-4 font-medium">
                <Radio name={`shipping-${id}`} className="" colorScheme="black">
                  {v.name}
                </Radio>
              </div>
              <PriceDisplay
                className="col-span-2 font-bold text-xl"
                price={v.price}
              ></PriceDisplay>
              <p className="font-medium col-span-3">{t("Avaiable in")}</p>
              <p className="text-xl font-bold col-span-3">
                {v.deliveryRange?.at(0)}-{v.deliveryRange?.at(1)} {t("Days")}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 w-full">
        <HStack className="justify-end text-[1.75rem] font-bold">
          <PriceDisplay price={total} />
        </HStack>
        <div className="flex justify-between w-full gap-4 items-center">
          <Button className="h-[3.25rem]" colorScheme="darkbrown">
            <HStack className="text-lg whitespace-nowrap font-semibold">
              <EditNoteIcon />
              {t("Modify order")}
            </HStack>
          </Button>
          <Button
            onClick={() => onMoveToWishlist && onMoveToWishlist(id)}
            className="h-[3.25rem]"
            colorScheme="darkbrown"
            outline
          >
            <HStack className="font-semibold text-lg">
              <HeartIcon />
              {t("Add to wishlist")}
            </HStack>
          </Button>
          <Button
            onClick={() => onItemDelete && onItemDelete(id)}
            colorScheme="danger"
            center
            className="px-5 text-2xl py-[0.875rem]"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
