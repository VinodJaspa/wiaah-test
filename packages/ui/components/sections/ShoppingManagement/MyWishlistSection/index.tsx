import React from "react";
import { useTranslation } from "react-i18next";
import {
  ItemsPagination,
  Table,
  Td,
  Tr,
  TBody,
  Th,
  PriceDisplay,
  SectionHeader,
  TableContainer,
  usePaginationControls,
  Image,
  useGetMyWishlistQuery,
  useRemoveItemFromWishlistMutation,
  SpinnerFallback,
  Button,
  Pagination,
  useResponsive,
  AspectRatioImage,
  HStack,
  AddToCartButton,
  GetMyWishListQuery,
} from "@UI";
import { HiShoppingCart } from "react-icons/hi";
import { IoTrash } from "react-icons/io5";
import { mapArray, setTestid } from "utils";
import {
  Product,
  Service,
  ShoppingCartItemType,
  WishedItem,
  WishlistItemType,
} from "@features/API";

export interface MyWishListSectionProps { }

interface WishlistTableProps {
  items: {
    itemId: string;
    itemType: WishlistItemType;
    product?: {
      id: string;
      title: string;
      price: number;
      stock: number;
      thumbnail: string;
      isExternalShopping: boolean;
      vendor_external_link?: string;
    };
    service?: {
      id: string;
      name: string;
      thumbnail: string;
      price: number;
    };
  }[];
  onDelete: (id: string) => void;
  onAdd: (id: string) => void;
  DeletingId?: string;
}

export const MyWishListSection: React.FC<MyWishListSectionProps> = ({ }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const { isMobile } = useResponsive();

  const { data, isLoading, isError } = useGetMyWishlistQuery();

  const {
    mutate,
    isLoading: deleteIsLoading,
    variables,
  } = useRemoveItemFromWishlistMutation();

  function handleItemDelete(itemId: string) {
    mutate({ itemId });
  }

  function handleAddItemToCart(itemId: string) { }

  const DeletingId = deleteIsLoading ? variables?.itemId : undefined;

  return (
    <div className="flex flex-col">
      <SectionHeader sectionTitle={t("My Wishlist")} />
      {isMobile ? (
        <div className="flex flex-col gap-4">
          {mapArray(data?.wishedItems, (item, i) => {
            const thumbnail =
              item.itemType === WishlistItemType.Product
                ? item.product?.thumbnail
                : item.service?.thumbnail;
            const title =
              item.itemType === WishlistItemType.Product
                ? item.product?.title
                : item.service?.name;

            const price =
              item.itemType === WishlistItemType.Product
                ? item.product?.price
                : item.service?.price;
            const id =
              item.itemType === WishlistItemType.Product
                ? item.product?.id
                : item.service?.id;

            const available = (item.product?.stock || 0) > 0;

            return (
              <div className="flex gap-3">
                <AspectRatioImage
                  src={thumbnail || ""}
                  ratio={0.9}
                  alt={title || ""}
                />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-medium">{title}</p>
                    {item.itemType === WishlistItemType.Product ? (
                      <HStack>
                        <p className="text-sm">{t("Stock")}:</p>
                        <div
                          className={`${available ? "border-primary" : "border-secondaryRed"
                            } border px-2 py-1`}
                        >
                          {available ? t("Available") : t("Unavailable")}
                        </div>
                      </HStack>
                    ) : null}
                  </div>

                  <HStack className="justify-between">
                    <PriceDisplay price={price}></PriceDisplay>
                    <AddToCartButton
                      isExternal={item.product?.isExternalShopping || false}
                      externalUrl={item.product?.vendor_external_link || ""}
                      itemId={id || ""}
                      itemType={
                        item.itemType === WishlistItemType.Product
                          ? ShoppingCartItemType.Product
                          : ShoppingCartItemType.Service
                      }
                    />
                  </HStack>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            <TableContainer>
              <Table className="w-full">
                <Tr>
                  <Th className="pl-0 text-left">{t("Image")}</Th>
                  <Th>{t("Product Name")}</Th>
                  <Th>{t("Stock")}</Th>
                  <Th>{t("Unit Price")}</Th>
                  <Th className="pr-0 text-right">{t("Action")}</Th>
                </Tr>
                <TBody>
                  {mapArray(data?.wishedItems, (item, i) => (
                    <Tr {...setTestid("item")}>
                      <Td className="pl-0">
                        <Image
                          {...setTestid("item-thumbnail")}
                          className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                          src={
                            item.itemType === WishlistItemType.Product
                              ? item.product?.thumbnail
                              : item.service?.thumbnail
                          }
                          alt={
                            item.itemType === WishlistItemType.Product
                              ? item.product?.title
                              : item.service?.name
                          }
                        />
                      </Td>
                      <Td {...setTestid("item-title")}>
                        {item.itemType === WishlistItemType.Product
                          ? item.product?.title
                          : item.service?.name}
                      </Td>
                      <Td {...setTestid("item-stock")}>
                        {(item.itemType === WishlistItemType.Product &&
                          item.product?.stock) ||
                          t("Avaiable")}
                      </Td>
                      <Td>
                        <PriceDisplay
                          {...setTestid("item-price")}
                          price={
                            item.itemType === WishlistItemType.Product
                              ? item.product?.price
                              : item.service?.price
                          }
                        />
                      </Td>
                      <Td className="pr-0">
                        <div className="w-full text-4xl gap-2  items-center flex justify-end">
                          <HiShoppingCart
                            {...setTestid("item-add-to-cart-btn")}
                            onClick={() => () =>
                              handleAddItemToCart(item.itemId)}
                            className="text-white p-2 rounded cursor-pointer bg-primary"
                          />
                          <Button
                            {...setTestid("item-delete-btn")}
                            onClick={() => () => handleItemDelete(item.itemId)}
                            center
                            loading={!!DeletingId && DeletingId === item.itemId}
                          >
                            <IoTrash className="text-white bg-red-600 rounded cursor-pointer p-2" />
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TableContainer>
          </SpinnerFallback>
          <Pagination controls={controls} />
        </>
      )}
    </div>
  );
};

export const WishlistTable: React.FC<WishlistTableProps> = ({
  items,
  onDelete,
  onAdd,
  DeletingId,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <>
      <TableContainer>
        <Table className="w-full">
          <Tr>
            <Th className="pl-0 text-left">{t("Image")}</Th>
            <Th>{t("Product Name")}</Th>
            <Th>{t("Stock")}</Th>
            <Th>{t("Unit Price")}</Th>
            <Th className="pr-0 text-right">{t("Action")}</Th>
          </Tr>
          <TBody>
            {mapArray(items, (item, i) => (
              <Tr {...setTestid("item")}>
                <Td className="pl-0">
                  <Image
                    {...setTestid("item-thumbnail")}
                    className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                    src={
                      item.itemType === WishlistItemType.Product
                        ? item.product?.thumbnail
                        : item.service?.thumbnail
                    }
                    alt={
                      item.itemType === WishlistItemType.Product
                        ? item.product?.title
                        : item.service?.name
                    }
                  />
                </Td>
                <Td {...setTestid("item-title")}>
                  {item.itemType === WishlistItemType.Product
                    ? item.product?.title
                    : item.service?.name}
                </Td>
                <Td {...setTestid("item-stock")}>
                  {item.itemType === WishlistItemType.Product
                    ? item.product?.stock
                    : t("Avaiable")}
                </Td>
                <Td>
                  <PriceDisplay
                    {...setTestid("item-price")}
                    price={
                      item.itemType === WishlistItemType.Product
                        ? item.product?.price
                        : item.service?.price
                    }
                  />
                </Td>
                <Td className="pr-0">
                  <div className="w-full text-4xl gap-2  items-center flex justify-end">
                    <HiShoppingCart
                      {...setTestid("item-add-to-cart-btn")}
                      onClick={() => onAdd(item.itemId)}
                      className="text-white p-2 rounded cursor-pointer bg-primary"
                    />
                    <Button
                      {...setTestid("item-delete-btn")}
                      onClick={() => onDelete(item.itemId)}
                      center
                      loading={!!DeletingId && DeletingId === item.itemId}
                    >
                      <IoTrash className="text-white bg-red-600 rounded cursor-pointer p-2" />
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
    </>
  );
};
