import { t } from "i18next";
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
  Input,
  VoucherInput,
  Grid,
  FilterInput,
  ShippingMotheds,
  PaymentGateway,
  TotalCost,
} from "ui";
import { useRouter } from "next/router";
import { AddressCardDetails, AddressDetails } from "types";
import {
  CheckoutProductsState,
  CheckoutProductsTotalPriceState,
  VoucherState,
} from "ui/state";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { shippingMotheds } from "ui/placeholder";

export interface CheckoutViewProps {}

export const CheckoutView: React.FC<CheckoutViewProps> = () => {
  const router = useRouter();
  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);

  const { min } = useScreenWidth({ minWidth: 1024 });
  const { addresses, AddAddress, DeleteAddress, UpdateAddress } =
    useUserAddresses();
  const totalPrice = useRecoilValue(CheckoutProductsTotalPriceState);
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
    <Padding Y={{ value: 0.5 }}>
      <Spacer spaceInRem={2} />
      <FlexStack
        direction={min ? "vertical" : "horizontal"}
        horizontalSpacingInRem={1}
        fullWidth
      >
        <FlexStack direction="vertical" fullWidth verticalSpacingInRem={1}>
          <BoxShadow>
            <div className="bg-white p-4">
              <Padding Y={{ value: 1 }}>
                <div className="flex w-full justify-center text-3xl">
                  <BoldText>{t("checkout", "Checkout")}</BoldText>
                </div>
                <Spacer />
                {edit ? (
                  <AddressInputs
                    initialInputs={editAddress}
                    onCancel={handleCancelEdit}
                    onSuccess={handleSaveAddress}
                  />
                ) : (
                  <>
                    <FlexStack
                      fullWidth
                      direction="vertical"
                      verticalSpacingInRem={1}
                    >
                      {addresses.length > 0 &&
                        addresses.map((address, i) => (
                          <Clickable
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
                          </Clickable>
                        ))}
                    </FlexStack>
                    <Spacer />
                    <Padding X={{ value: 1 }}>
                      <Button onClick={() => handleAddress()}>
                        {t("add_new_address", "ADD NEW ADDRESS")}
                      </Button>
                    </Padding>
                  </>
                )}
              </Padding>
            </div>
          </BoxShadow>
          <VoucherInput onSuccess={handleVoucherValidation} />
          <ShippingMotheds motheds={shippingMotheds} />
          <PaymentGateway />
        </FlexStack>
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
                    <Clickable onClick={() => router.push("cart-summary")}>
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
      </FlexStack>
    </Padding>
  );
};
