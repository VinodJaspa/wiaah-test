import React from "react";
import { useScreenWidth } from "hooks";
import {
  BoxShadow,
  FlexStack,
  Padding,
  AddressCard,
  Clickable,
  BoldText,
  Text,
  Divider,
  Spacer,
  CartSummaryProductCard,
  Button,
  AddressInputs,
  useUserAddresses,
  VoucherInput,
  ShippingMotheds,
  PaymentGateway,
  TotalCost,
} from "ui";
import { AddressCardDetails, AddressDetails } from "types";
import { CheckoutProductsState, VoucherState } from "ui/state";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { shippingMotheds } from "placeholder";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export interface ServiceCheckoutViewProps {}

export const ServiceCheckoutView: React.FC<ServiceCheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);

  const { min } = useScreenWidth({ minWidth: 1024 });
  const { addresses, AddAddress, DeleteAddress, UpdateAddress } =
    useUserAddresses();
  const products = useRecoilValue(CheckoutProductsState);
  const setVoucher = useSetRecoilState(VoucherState);

  const [activeAddress, setActiveAddress] = React.useState<number>();

  React.useEffect(() => {
    if (addresses.length < 1) {
      setEditAddress(undefined);
      setEdit(true);
    }
  }, [addresses, edit]);

  function handleDelete(id: string) {
    DeleteAddress(id);
  }

  function handleAddress(address?: AddressCardDetails) {
    if (address) {
      setEditAddress(address);
      setEdit(true);
    } else {
      setEditAddress(undefined);
      setEdit(true);
    }
  }
  function handleCancelEdit() {
    setEdit(false);
    setEditAddress(undefined);
  }

  function handleSaveAddress(input: AddressDetails) {
    // call api to save address
    if (editAddress) {
      UpdateAddress(editAddress.id, input);
      handleCancelEdit();
    } else {
      AddAddress({
        id: String(Math.random()),
        ...input,
      });
      handleCancelEdit();
    }
  }

  async function handleVoucherValidation(code: string) {
    // call api to check if the voucher is valid
    const voucherName = "50OFF";
    let ok = code === voucherName;
    if (ok) {
      setVoucher({
        voucherName,
        value: 50,
        unit: "%",
      });
    }
    return ok;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full py-2">
      <div className="flex flex-col w-full gap-4">
        <BoxShadow>
          <div className="bg-white p-4 py-8">
            <div className="flex w-full justify-center text-3xl">
              <p className="font-bold">{t("Checkout")}</p>
            </div>
            <p className="text-3xl">{"Address"}</p>
            {edit ? (
              <AddressInputs
                initialInputs={editAddress}
                onCancel={handleCancelEdit}
                onSuccess={handleSaveAddress}
              />
            ) : (
              <>
                <div className="w-full flex flex-col gap-4">
                  {addresses.length > 0 &&
                    addresses.map((address, i) => (
                      <div
                        className="cursor-pointer"
                        key={i}
                        onClick={() => setActiveAddress(i)}
                      >
                        <AddressCard
                          borderColor="#000"
                          onDelete={(id) => handleDelete(id)}
                          onEdit={(address) => handleAddress(address)}
                          addressDetails={address}
                          active={activeAddress === i}
                        />
                        <Divider />
                      </div>
                    ))}
                </div>
                <Spacer />
                <div className="w-full flex justify-end">
                  <Button onClick={() => handleAddress()}>
                    {t("add_new_address", "ADD NEW ADDRESS")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </BoxShadow>
        <VoucherInput onSuccess={handleVoucherValidation} />
        {/* <ShippingMotheds motheds={shippingMotheds} /> */}
        <PaymentGateway />
      </div>
      <BoxShadow fitHeight fitWidth>
        <div className="bg-white">
          <Padding X={{ value: 1 }} Y={{ value: 1 }}>
            <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
              <FlexStack
                width={{ value: 100, unit: "%" }}
                justify="between"
                alignItems="center"
              >
                <Text size="3xl">
                  <BoldText>
                    {products.length} {t("items", "items")}
                  </BoldText>
                </Text>
                <Text size="lg">
                  <Clickable
                    onClick={() => visit((routes) => routes.visitCarySummary())}
                  >
                    Change
                  </Clickable>
                </Text>
              </FlexStack>
              <Divider />
              <FlexStack width={{ value: 30 }} direction="vertical">
                {products.map((item, i) => (
                  <>
                    <CartSummaryProductCard minimal key={i} product={item} />
                    <Divider />
                  </>
                ))}
              </FlexStack>
              <TotalCost voucherRemoveable />
            </FlexStack>
          </Padding>
        </div>
      </BoxShadow>
    </div>
  );
};
