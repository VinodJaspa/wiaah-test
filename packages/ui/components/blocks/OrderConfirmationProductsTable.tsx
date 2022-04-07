import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { CartSummaryItemData } from "types/market/CartSummary";
import {
  FlexStack,
  Padding,
  BoldText,
  Clickable,
  Prefix,
  Image,
  Text,
} from "../partials";

export interface OrderConfirmationProductsTableProps {
  products?: CartSummaryItemData[];
  onRemove?: (productId: string) => void;
}

export const OrderConfirmationProductsTable: React.FC<OrderConfirmationProductsTableProps> =
  ({ onRemove, products = [] }) => {
    function handleRemoveProduct(productId: string) {
      onRemove && onRemove(productId);
    }

    return (
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
                      <Image rotation="portrait" src={product.item.imageUrl} />
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
                    {product.item.color && (
                      <div className="flex gap-2">
                        <span className="capitalize">
                          {t("color", "color")}:
                        </span>
                        <BoldText>{product.item.color}</BoldText>
                      </div>
                    )}
                    {product.item.size && (
                      <div className="flex gap-2">
                        <span className="capitalize">{t("size", "size")}:</span>
                        <BoldText>{product.item.size}</BoldText>
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
    );
  };
