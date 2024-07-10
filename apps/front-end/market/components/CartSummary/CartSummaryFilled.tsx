import React from "react";
import { useTranslation } from "react-i18next";
import {
  BoxShadow,
  Stack,
  Divider,
  useGetMyCartSummaryDataQuery,
  ServiceCheckoutCardSwitcher,
  Avatar,
  Button,
} from "ui";

export interface CartSummaryFilledProps { }

const CartSummaryFilled: React.FC<CartSummaryFilledProps> = () => {
  const { data: res, isLoading, isError } = useGetMyCartSummaryDataQuery();
  const items = res ? res.data : [];
  const { t } = useTranslation();
  function handleContactClick(shopId: string) { }

  function handleMoveToWishlist(productId: string) { }

  function handleProfileClick(shopId: string) { }

  function handleQtyChange(productId: string) { }

  function handleRemove(productId: string) { }

  return (
    <BoxShadow>
      <Stack divider={<Divider />} col>
        {items.map(({ itemData, providerData }, i) => (
          <div key={providerData.id + i} className="flex flex-col gap-1">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                <Avatar src={providerData.thumbnail} alt={providerData.name} />
                <p>{providerData.name}</p>
              </div>
              <Button outline>
                {itemData.type === "product"
                  ? t("Contact seller")
                  : t("Contact service")}
              </Button>
            </div>
            <ServiceCheckoutCardSwitcher
              passingProps={{ horizontal: true }}
              service={itemData}
            />
          </div>
        ))}
      </Stack>
    </BoxShadow>
  );
};

export default CartSummaryFilled;
