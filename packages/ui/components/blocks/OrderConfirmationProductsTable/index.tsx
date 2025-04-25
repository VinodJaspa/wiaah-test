
import React from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import { CartSummaryItemData } from "types";
import {
  FlexStack,
  Padding,
  BoldText,
  Clickable,
  Prefix,
  AspectRatioImage,
  Text,
  TableContainer,
} from "../../partials";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@UI/components/shadcn-components";

export interface OrderConfirmationProductsTableProps {
  products?: CartSummaryItemData[];
  onRemove?: (productId: string) => void;
}

export const OrderConfirmationProductsTable: React.FC<
  OrderConfirmationProductsTableProps
> = ({ onRemove, products = [] }) => {
  function handleRemoveProduct(productId: string) {
    onRemove && onRemove(productId);
  }
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table className="w-full">
        <TableHeader id="ProductsTableHead" className="w-full text-gray-600">
          <TableRow className="w-full">
            <TableHead className="capitalize">{t("item", "item")}</TableHead>
            <TableHead className="capitalize">{t("retailer", "retailer")}</TableHead>
            <TableHead className="capitalize">{t("attributes", "attributes")}</TableHead>
            <TableHead className="capitalize">{t("quantity", "quantity")}</TableHead>
            <TableHead className="capitalize">{t("price", "price")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody id="ProductsTableBody">
          {products.map((product, i) => {
            if (product.item.type === "product") {
              return (
                <TableRow key={product.item.id + i} data-testid="ProductCard">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <AspectRatioImage
                        ratio={4 / 3}
                        alt={product.item.name}
                        src={product.item.imageUrl}
                      />
                      <div className="flex flex-col">
                        <BoldText>{product.shop.name.toUpperCase()}</BoldText>
                        <div className="flex flex-col justify-between">
                          <Text data-testid="ProductName">
                            {product.item.name}
                          </Text>
                          <button
                            data-testid="RemoveButton"
                            onClick={() => handleRemoveProduct(product.item.id)}
                            className="font-semibold text-blue-500 flex items-center"
                          >
                            <BsTrash />
                            {t("remove", "Remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <BoldText>{product.shop.name}</BoldText>
                  </TableCell>
                  <TableCell className="max-w-[4rem]">
                    {product.item.colors && (
                      <div className="flex gap-2">
                        <span className="capitalize">{t("color", "color")}:</span>
                        <BoldText>{product.item.colors[0]}</BoldText>
                      </div>
                    )}
                    {product.item.sizes && (
                      <div className="flex gap-2">
                        <span className="capitalize">{t("size", "size")}:</span>
                        <BoldText>{product.item.sizes[0]}</BoldText>
                      </div>
                    )}
                  </TableCell>
                  <TableCell data-testid="ProductPrice">{product.item.qty}</TableCell>
                  <TableCell data-testid="ProductQty">{product.item.price}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
