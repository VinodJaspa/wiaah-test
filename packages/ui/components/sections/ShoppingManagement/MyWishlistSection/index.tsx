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
} from "@UI";
import { HiShoppingCart } from "react-icons/hi";
import { IoTrash } from "react-icons/io5";
import { mapArray, setTestid } from "utils";

export interface MyWishListSectionProps {}

export const MyWishListSection: React.FC<MyWishListSectionProps> = ({}) => {
  const { t } = useTranslation();
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls();

  const { data, isLoading, isError } = useGetMyWishlistQuery();

  const { mutate, isLoading: deleteIsLoading } =
    useRemoveItemFromWishlistMutation();

  function handleItemDelete(itemId: string) {
    mutate({ itemId });
  }

  function handleAddItemToCart(itemId: string) {}

  return (
    <div className="flex flex-col">
      <SectionHeader sectionTitle={t("My Wish List")} />
      <TableContainer>
        <Table>
          <Tr>
            <Th className="pl-0 text-left">{t("Image")}</Th>
            <Th>{t("Product Name")}</Th>
            <Th>{t("Stock")}</Th>
            <Th>{t("Unit Price")}</Th>
            <Th className="pr-0 text-right">{t("Action")}</Th>
          </Tr>
          <TBody>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {mapArray(data?.wishedItems, (item, i) => (
                <Tr {...setTestid("item")}>
                  <Td className="pl-0">
                    <Image
                      {...setTestid("item-thumbnail")}
                      className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                      src={item.product?.thumbnail || item.service?.thumbnail}
                      alt={item.product?.title || item.service?.title}
                    />
                  </Td>
                  <Td {...setTestid("item-title")}>
                    {item.product?.title || item.service?.title}
                  </Td>
                  <Td {...setTestid("item-stock")}>
                    {item.product?.stock || t("Avaiable")}
                  </Td>
                  <Td>
                    <PriceDisplay
                      {...setTestid("item-price")}
                      price={item.product?.price || item.service?.price || 0}
                    />
                  </Td>
                  <Td className="pr-0">
                    <div className="w-full text-4xl gap-2  items-center flex justify-end">
                      <HiShoppingCart
                        {...setTestid("item-add-to-cart-btn")}
                        onClick={() => handleAddItemToCart(item.itemId)}
                        className="text-white p-2 rounded cursor-pointer bg-primary"
                      />
                      <Button
                        {...setTestid("item-delete-btn")}
                        onClick={() => handleItemDelete(item.itemId)}
                        center
                        loading={deleteIsLoading}
                      >
                        <IoTrash className="text-white bg-red-600 rounded cursor-pointer p-2" />
                      </Button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </SpinnerFallback>
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination controls={controls} />
    </div>
  );
};
