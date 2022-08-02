import React from "react";
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
  Button,
  AddressInputs,
  useUserAddresses,
  VoucherInput,
  PaymentGateway,
  TotalCost,
  ServiceCheckoutCard,
  GuestsInput,
  Modal,
  ModalContent,
  ModalOverlay,
  DateInput,
  useGetServiceCheckoutDataQuery,
  useSearchFilters,
  SpinnerFallback,
} from "ui";
import { AddressCardDetails, AddressDetails } from "types";
import { CheckoutProductsState, VoucherState } from "ui/state";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { DateDetails, runIfFn } from "utils";

export interface ServiceCheckoutViewProps {}

export const ServiceCheckoutView: React.FC<ServiceCheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServiceCheckoutDataQuery(filters);
  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);

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
          <div className="bg-white flex flex-col gap-4 p-4 py-8">
            <div className="flex w-full justify-center text-3xl">
              <p className="font-bold">{t("Checkout")}</p>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-bold">{t("Trip date")}</p>
              <div className="flex justify-between">
                {(() => {
                  const [edit, setEdit] = React.useState<boolean>(false);
                  const [dates, setDates] = React.useState<{
                    from: Date;
                    to: Date;
                  }>();

                  const datesDisplay = dates
                    ? () => {
                        const checkin = DateDetails(dates.from);
                        const checkout = DateDetails(dates.to);

                        const sameMonth =
                          checkin.month_short === checkout.month_short;

                        return (
                          <p>
                            {checkin.day}{" "}
                            {sameMonth ? null : `${checkin.month_short} `}-
                            {checkout.day} {checkout.month_short}
                          </p>
                        );
                      }
                    : null;

                  return (
                    <>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">{t("Dates")}</p>
                        {runIfFn(datesDisplay)}
                      </div>
                      <Modal
                        isOpen={edit}
                        onClose={() => setEdit(false)}
                        onOpen={() => setEdit(true)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <div className="flex gap-4 justify-around">
                            <div className="flex flex-col">
                              <p className="font-bold">{t("Check-in")}</p>
                              <DateInput />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-bold">{t("Check-out")}</p>
                              <DateInput />
                            </div>
                          </div>
                        </ModalContent>
                      </Modal>
                      <p
                        onClick={() => setEdit(true)}
                        className="cursor-pointer underline font-bold"
                      >
                        {t("Edit")}
                      </p>
                    </>
                  );
                })()}
              </div>
              <div className="flex justify-between">
                {(() => {
                  const [edit, setEdit] = React.useState<boolean>(false);
                  return (
                    <>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">{t("Guests")}</p>
                        <p>1 {t("guest")}</p>
                      </div>
                      <Modal
                        isOpen={edit}
                        onClose={() => setEdit(false)}
                        onOpen={() => setEdit(true)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <GuestsInput />
                        </ModalContent>
                      </Modal>

                      <p
                        onClick={() => setEdit(true)}
                        className="cursor-pointer underline font-bold"
                      >
                        {t("Edit")}
                      </p>
                    </>
                  );
                })()}
              </div>
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
                <SpinnerFallback isError={isError} isLoading={isLoading}>
                  {res
                    ? res.data.bookedServices.map((item, i) => (
                        <>
                          <ServiceCheckoutCard {...item} key={i} />
                          <Divider />
                        </>
                      ))
                    : null}
                </SpinnerFallback>
              </FlexStack>
              <TotalCost voucherRemoveable />
            </FlexStack>
          </Padding>
        </div>
      </BoxShadow>
    </div>
  );
};
