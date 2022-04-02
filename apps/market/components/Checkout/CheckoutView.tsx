import { t } from "i18next";
import React from "react";
import { CartSummaryItem } from "types/market/CartSummary";
import { useScreenWidth } from "ui/Hooks/useScreenWidth";
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
import {
  AddressCardDetails,
  AddressDetails,
} from "types/market/AddressDetails.interface";
import {
  CheckoutProductsState,
  CheckoutProductsTotalPriceState,
  VoucherState,
} from "ui/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ShippingMothed } from "types/market/Checkout";
const shippingMotheds: ShippingMothed[] = [
  {
    cost: 0,
    name: "Click and collect",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    id: "1",
  },
  {
    cost: 0,
    name: "Free shipping",
    id: "2",
  },
  {
    cost: 0.99,
    name: "European shipping",
    id: "3",
  },
  {
    cost: 5.99,
    name: "International",
    id: "4",
  },
];
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
            <div className="bg-white">
              <Padding Y={{ value: 1 }}>
                <div className="flex w-full justify-center text-3xl">
                  <BoldText>{t("checkout", "Checkout")}</BoldText>
                </div>
                <Spacer />
                {edit ? (
                  <AddressInputs
                    inputs={editAddress}
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
                            <Divider marginY={{ value: 0 }} />
                          </Clickable>
                        ))}
                    </FlexStack>
                    <Spacer />
                    <Padding X={{ value: 1 }}>
                      <Button
                        onClick={() => handleAddress()}
                        fitWidth
                        outlined
                        paddingX={{ value: 1 }}
                        hexTextColor={"#000"}
                        borderWidthInPx={1}
                        borderColor="#000"
                      >
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
                <Divider marginY={{ value: 0.5 }} />
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
