import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
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
} from "ui";

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
        <Thead id="ProductsTableHead" className="w-full text-gray-600">
          <Tr className="w-full">
            <Td className="capitalize">{t("item", "item")}</Td>
            <Td className="capitalize">{t("retailer", "retailer")}</Td>
            <Td className="capitalize">{t("attributes", "attributes")}</Td>
            <Td className="capitalize">{t("quantity", "quantity")}</Td>
            <Td className="capitalize">{t("price", "price")}</Td>
          </Tr>
        </Thead>
        <Tbody id="ProductsTableBody">
          {products.map((product, i) => {
            if (product.item.type === "product") {
              return (
                <Tr key={product.item.id + i} data-testid="ProductCard">
                  <Td>
                    <FlexStack fullHeight horizontalSpacingInRem={1}>
                      <AspectRatioImage
                        ratio={4 / 3}
                        alt={product.item.name}
                        src={product.item.imageUrl}
                      />
                      <Padding Y={{ value: 0.5 }}>
                        <FlexStack fullHeight direction="vertical">
                          <BoldText>{product.shop.name.toUpperCase()}</BoldText>
                          <FlexStack
                            fullHeight
                            direction="vertical"
                            justify="between"
                          >
                            <Text data-testid="ProductName">
                              {product.item.name}
                            </Text>
                            <Clickable
                              data-testid="RemoveButton"
                              onClick={() =>
                                handleRemoveProduct(product.item.id)
                              }
                            >
                              <span className="font-semibold text-blue-500">
                                <Prefix Prefix={<BsTrash />}>
                                  {t("remove", "Remove")}
                                </Prefix>
                              </span>
                            </Clickable>
                          </FlexStack>
                        </FlexStack>
                      </Padding>
                    </FlexStack>
                  </Td>
                  <Td>
                    <BoldText>{product.shop.name}</BoldText>
                  </Td>
                  <Td className="max-w-[4rem]">
                    {product.item.colors && (
                      <div className="flex gap-2">
                        <span className="capitalize">
                          {t("color", "color")}:
                        </span>
                        <BoldText>{product.item.colors[0]}</BoldText>
                      </div>
                    )}
                    {product.item.sizes && (
                      <div className="flex gap-2">
                        <span className="capitalize">{t("size", "size")}:</span>
                        <BoldText>{product.item.sizes[0]}</BoldText>
                      </div>
                    )}
                  </Td>
                  <Td data-testid="ProductPrice">{product.item.qty}</Td>
                  <Td data-testid="ProductQty">{product.item.price}</Td>
                </Tr>
              );
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
