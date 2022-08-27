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
import { shippingMotheds } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { randomNum } from "utils";

export interface CheckoutViewProps {}

export const CheckoutView: React.FC<CheckoutViewProps> = () => {
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
                <p className="font-bold text-lg">{"Address"}</p>
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
                        {t("ADD NEW ADDRESS")}
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
                      {products.length} {t("items")}
                    </BoldText>
                  </Text>
                  <Text size="lg">
                    <Clickable
                      onClick={() =>
                        visit((routes) => routes.visitCarySummary())
                      }
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
                <TotalCost
                  shippingFee={randomNum(30)}
                  subTotal={randomNum(500)}
                  vat={randomNum(20)}
                  voucherRemoveable
                />
              </FlexStack>
            </Padding>
          </div>
        </BoxShadow>
      </FlexStack>
    </Padding>
  );
};
