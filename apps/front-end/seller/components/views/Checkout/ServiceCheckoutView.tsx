import React from "react";
import {
  BoxShadow,
  AddressCard,
  Divider,
  Spacer,
  Button,
  AddressInputs,
  useUserAddresses,
  VoucherInput,
  PaymentGateway,
  TotalCost,
  GuestsInput,
  Modal,
  ModalContent,
  ModalOverlay,
  DateInput,
  useGetCheckoutDataQuery,
  useSearchFilters,
  SpinnerFallback,
  CheckInOutInput,
  AspectRatio,
  ServiceCheckoutCardSwitcher,
} from "ui";
import { AddressCardDetails, AddressDetails } from "types";
import { CheckoutProductsState, VoucherState } from "ui/state";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { DateDetails, runIfFn } from "utils";
import { useDateDiff } from "hooks";
import { ServiceCheckoutDataType } from "api";

export interface ServiceCheckoutViewProps {}

export const ServiceCheckoutView: React.FC<ServiceCheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  const { data: res, isLoading, isError } = useGetCheckoutDataQuery(filters);
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
                  const days = dates
                    ? useDateDiff({
                        from: dates.from,
                        to: dates.to,
                      }).days
                    : 0;

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

                  const handleClearDates = () => {
                    setDates(undefined);
                  };

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
                        <ModalContent className="w-[min(50rem,100%)] flex flex-col gap-8">
                          <div className="flex flex-col gap-2 w-full items-center">
                            <CheckInOutInput
                              onDatesChange={() => {}}
                              active={false}
                              checkin={dates ? dates.from : undefined}
                              checkout={dates ? dates.to : undefined}
                            />
                            <p className="font-bold">
                              {days} {t("nights")}
                            </p>
                          </div>
                          <div className="flex gap-8 justify-between">
                            <div className="w-full flex flex-col items-center">
                              <p className="font-bold">{t("Check-in")}</p>
                              <DateInput
                                className="w-[100%]"
                                dayComponent={({
                                  active,
                                  currentMonth,
                                  dayNum,
                                }) => (
                                  <AspectRatio ratio={1}>
                                    <div
                                      className={`${
                                        active
                                          ? "text-white bg-primary"
                                          : currentMonth
                                          ? "text-black bg-white"
                                          : "text-gray-500"
                                      } w-full cursor-pointer rounded h-full flex justify-center items-center`}
                                    >
                                      {dayNum}
                                    </div>
                                  </AspectRatio>
                                )}
                                onDaySelect={(date) =>
                                  setDates((state) => ({
                                    ...state,
                                    from: new Date(date),
                                  }))
                                }
                              />
                            </div>
                            <div className="w-full flex flex-col items-center">
                              <p className="font-bold">{t("Check-out")}</p>
                              <DateInput
                                className="w-[100%]"
                                dayComponent={({
                                  active,
                                  currentMonth,
                                  dayNum,
                                }) => (
                                  <AspectRatio ratio={1}>
                                    <div
                                      className={`${
                                        active
                                          ? "text-white bg-primary"
                                          : currentMonth
                                          ? "text-black bg-white"
                                          : "text-gray-500"
                                      } w-full cursor-pointer rounded h-full flex justify-center items-center`}
                                    >
                                      {dayNum}
                                    </div>
                                  </AspectRatio>
                                )}
                                onDaySelect={(date) =>
                                  setDates((state) => ({
                                    ...state,
                                    to: new Date(date),
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <p
                              className="font-semibold text-primary underline cursor-pointer"
                              onClick={handleClearDates}
                            >
                              {t("Clear dates")}
                            </p>
                            <Button>{t("Save")}</Button>
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
          <div className="flex flex-col p-4 gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-3xl font-bold">
                {products.length} {t("items", "items")}
              </p>
              <p
                className="text-lg cursor-pointer"
                onClick={() => visit((routes) => routes.visitCarySummary())}
              >
                Change
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-4 w-[min(30rem,100vw)]">
              <SpinnerFallback isError={isError} isLoading={isLoading}>
                {res
                  ? res.data.bookedServices.map((service, i) => (
                      <ServiceCheckoutCardSwitcher key={i} service={service} />
                    ))
                  : null}
              </SpinnerFallback>
            </div>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <TotalCost
                  subTotal={res.data.bookedServices.reduce((acc, curr) => {
                    return acc + curr.data.price;
                  }, 0)}
                  vat={res.data.vat}
                  saved={res.data.saved}
                  voucherRemoveable
                />
              ) : null}
            </SpinnerFallback>
          </div>
        </div>
      </BoxShadow>
    </div>
  );
};
