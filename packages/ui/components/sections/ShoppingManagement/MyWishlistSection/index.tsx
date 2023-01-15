import React from "react";
import { useTranslation } from "react-i18next";
import { PriceType } from "types";
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
} from "@UI";
import { getRandomImage } from "placeholder";
import { HiShoppingCart } from "react-icons/hi";
import { randomNum } from "../../../helpers";
import { IoTrash } from "react-icons/io5";

export interface MyWishListSectionProps {}

export const MyWishListSection: React.FC<MyWishListSectionProps> = ({}) => {
  const { t } = useTranslation();
  const {
    changeTotalItems,
    controls,
    pagination: { page, take },
  } = usePaginationControls();
  function handleItemDelete(itemId: string) {}

  function handleAddItemToCart(itemId: string) {}

  React.useEffect(() => {
    changeTotalItems(wishlistItems.length);
  }, []);

  return (
    <div className="flex flex-col">
      <SectionHeader sectionTitle={t("my_wish_list", "My Wish List")} />
      <TableContainer>
        <Table>
          <Tr>
            <Th className="pl-0 text-left">{t("image", "Image")}</Th>
            <Th>{t("product_name", "Product Name")}</Th>
            <Th>{t("info", "Info")}</Th>
            <Th>{t("stock", "Stock")}</Th>
            <Th>{t("unit_price", "Unit Price")}</Th>
            <Th className="pr-0 text-right">{t("action", "Action")}</Th>
          </Tr>
          <TBody>
            {wishlistItems
              .slice(page * take, page * take + take)
              .map((item, i) => (
                <Tr>
                  <Td className="pl-0">
                    <img
                      className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                      src={item.productImage}
                      alt={item.productName}
                    />
                  </Td>
                  <Td>{item.productName}</Td>
                  <Td>{item.info}</Td>
                  <Td>{item.stock}</Td>
                  <Td>
                    <PriceDisplay priceObject={item.unitPrice} />
                  </Td>
                  <Td className="pr-0">
                    <div className="w-full text-4xl gap-2  items-center flex justify-end">
                      <HiShoppingCart
                        onClick={() => handleAddItemToCart(item.id)}
                        className="text-white p-2 rounded cursor-pointer bg-primary"
                      />
                      <IoTrash
                        onClick={() => handleItemDelete(item.id)}
                        className="text-white bg-red-600 rounded cursor-pointer p-2"
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
          </TBody>
        </Table>
      </TableContainer>
      <ItemsPagination controls={controls} />
    </div>
  );
};

type MyWishlistItemData = {
  id: string;
  productImage: string;
  productName: string;
  info: string;
  stock: number;
  unitPrice: PriceType;
};

const wishlistItems: MyWishlistItemData[] = [...Array(15)].map((_, i) => ({
  id: `${randomNum(1000000)}`,
  productImage: "",
  productName: `product ${i}`,
  info: "info",
  stock: randomNum(200),
  unitPrice: {
    amount: randomNum(500),
    currency: "USD",
  },
}));
