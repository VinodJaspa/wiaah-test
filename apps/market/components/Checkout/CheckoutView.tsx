import { t } from "i18next";
import React from "react";
import { FaEdit } from "react-icons/fa";
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
} from "ui";
import { colorPalette } from "ui/components/helpers/colorPalette";
import { useRouter } from "next/router";
import {
  AddressCardDetails,
  AddressDetails,
} from "types/market/AddressDetails.interface";

export interface CheckoutViewProps {
  products: CartSummaryItem[];
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ products }) => {
  const router = useRouter();
  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);
  const { min } = useScreenWidth({ minWidth: 1024 });
  const { addresses, AddAddress, DeleteAddress, UpdateAddress } =
    useUserAddresses();

  const totalPrice = products.reduce((acc, current) => {
    const total = current.price * current.qty;
    return acc + total;
  }, 0);

  const [activeAddress, setActiveAddress] = React.useState<number>();
  const shippingFee = 5;
  const TotalWithFee = totalPrice + shippingFee;

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

  return (
    <Padding Y={{ value: 0.5 }}>
      <Spacer spaceInRem={2} />
      <FlexStack
        direction={min ? "vertical" : "horizontal"}
        horizontalSpacingInRem={1}
        fullWidth
      >
        <BoxShadow>
          <div className="bg-white">
            <Padding X={{ value: 2 }} Y={{ value: 1 }}>
              <Text size="3xl">
                <BoldText>{t("checkout", "Checkout")}</BoldText>
              </Text>
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
                    {addresses.length > 0 ? (
                      addresses.map((address, i) => (
                        <Clickable key={i} onClick={() => setActiveAddress(i)}>
                          <AddressCard
                            onDelete={(id) => handleDelete(id)}
                            onEdit={(address) => handleAddress(address)}
                            addressDetails={address}
                            active={activeAddress === i}
                          />
                          <Divider marginY={{ value: 0 }} />
                        </Clickable>
                      ))
                    ) : (
                      <Text>
                        {t(
                          "no_address",
                          "You have not added any Shipping Address yet"
                        )}
                      </Text>
                    )}
                  </FlexStack>
                  <Spacer />
                  <Button
                    onClick={() => handleAddress()}
                    fitWidth
                    outlined
                    paddingX={{ value: 1 }}
                    hexTextColor={colorPalette.PrimaryGreen}
                  >
                    {t("add_new_address", "ADD NEW ADDRESS")}
                  </Button>
                </>
              )}
            </Padding>
          </div>
        </BoxShadow>
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
                  <Clickable onClick={() => router.push("/cart-summary")}>
                    <Text size="2xl">
                      <FaEdit />
                    </Text>
                  </Clickable>
                </FlexStack>

                <FlexStack
                  width={{ value: 30 }}
                  direction="vertical"
                  // verticalSpacingInRem={}
                >
                  {products.map((item, i) => (
                    <>
                      <CartSummaryProductCard minimal key={i} product={item} />
                      <Divider />
                    </>
                  ))}
                </FlexStack>
                <div className="text-lg">
                  <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
                    <FlexStack justify="between">
                      <BoldText>{t("subtotal", "Subtotal")}</BoldText>
                      <BoldText>${totalPrice}</BoldText>
                    </FlexStack>
                    <FlexStack justify="between">
                      <BoldText>{t("shipping_fee", "Shipping Fee")}</BoldText>
                      <BoldText>${shippingFee}</BoldText>
                    </FlexStack>
                    <FlexStack justify="between">
                      <BoldText>{t("total_to_pay", "Total to Pay")}</BoldText>
                      <BoldText>${TotalWithFee}</BoldText>
                    </FlexStack>
                  </FlexStack>
                </div>
              </FlexStack>
            </Padding>
          </div>
        </BoxShadow>
      </FlexStack>
    </Padding>
  );
};
