import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import { BsTrash } from "react-icons/bs";

import {
  BoldText,
  BoxShadow,
  Clickable,
  Divider,
  FlexStack,
  Image,
  Padding,
  Prefix,
  Spacer,
  Text,
  TotalCost,
  useCartSummary,
  UserInfoConfirmation,
  useScreenWidth,
} from "ui";
import { DividerProps } from "ui/components/partials/Divider";
import { CartSummaryItemsState, CheckoutProductsState } from "ui/state";

interface TableDividerProps extends DividerProps {
  cols: number;
}
const TableDivider: React.FC<TableDividerProps> = ({ cols, ...props }) => {
  return (
    <tr>
      {[...Array(cols)].map(() => (
        <td>
          <Divider {...props} />
        </td>
      ))}
    </tr>
  );
};

export interface OrderConfirmationViewProps {}

const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = () => {
  const router = useRouter();
  const { products, RemoveItem } = useCartSummary();
  const { min } = useScreenWidth({ minWidth: 1024 });
  function handleRemoveProduct(productId: string) {
    RemoveItem(productId);
  }

  return (
    <Padding Y={{ value: 2 }}>
      <BoxShadow>
        <FlexStack
          direction={min ? "vertical" : "horizontal"}
          horizontalSpacingInRem={1}
          fullWidth
        >
          <FlexStack fullWidth direction="vertical">
            <UserInfoConfirmation />
            <div className="flex flex-col items-end gap-4 bg-white p-4 ">
              <Spacer spaceInRem={2} />
              <table className="w-full">
                <thead className="w-full text-gray-600">
                  <tr className="w-full">
                    <td className="capitalize">{t("item", "item")}</td>
                    <td className="capitalize">{t("retailer", "retailer")}</td>
                    <td className="capitalize">
                      {t("attributes", "attributes")}
                    </td>
                    <td className="capitalize">{t("quantity", "quantity")}</td>
                    {/* <td className="capitalize">{t("shipping", "shipping")}</td> */}
                    <td className="capitalize">{t("price", "price")}</td>
                  </tr>
                </thead>
                <TableDivider cols={6} />
                <tbody>
                  {products.map((product, i) => (
                    <>
                      <tr>
                        <td>
                          <FlexStack fullHeight horizontalSpacingInRem={1}>
                            <Image
                              rotation="portrait"
                              src={product.item.imageUrl}
                            />
                            <Padding Y={{ value: 0.5 }}>
                              <FlexStack fullHeight direction="vertical">
                                <BoldText>
                                  {product.shop.name.toUpperCase()}
                                </BoldText>
                                <FlexStack
                                  fullHeight
                                  direction="vertical"
                                  justify="between"
                                >
                                  <Text>{product.item.name}</Text>
                                  <Clickable
                                    onClick={() =>
                                      handleRemoveProduct(product.item.id)
                                    }
                                  >
                                    <span className="font-semibold text-blue-500">
                                      <Prefix prefix={<BsTrash />}>
                                        {t("remove", "Remove")}
                                      </Prefix>
                                    </span>
                                  </Clickable>
                                </FlexStack>
                              </FlexStack>
                            </Padding>
                          </FlexStack>
                        </td>
                        <td>
                          <BoldText>{product.shop.name}</BoldText>
                        </td>
                        <td className="max-w-[4rem]">
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
                              <span className="capitalize">
                                {t("size", "size")}:
                              </span>
                              <BoldText>{product.item.size}</BoldText>
                            </div>
                          )}
                        </td>
                        <td>{product.item.qty}</td>
                        {/* <td></td> */}
                        <td>{product.item.price}</td>
                      </tr>
                      <TableDivider cols={6} />
                    </>
                  ))}
                </tbody>
              </table>
              <div className="w-96">
                <TotalCost />
              </div>
            </div>
          </FlexStack>
        </FlexStack>
      </BoxShadow>
    </Padding>
  );
};

export default OrderConfirmationView;
