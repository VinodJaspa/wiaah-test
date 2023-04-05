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
  useGetCheckoutDataQuery,
  useSearchFilters,
  SpinnerFallback,
  ServiceCheckoutCardSwitcher,
  TotalCost,
} from "ui";
import { AddressCardDetails, AddressDetails } from "types";
import { VoucherState } from "@src/state";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export interface ServiceCheckoutViewProps {}

export const CheckoutView: React.FC<ServiceCheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  const { data: res, isLoading, isError } = useGetCheckoutDataQuery(filters);
  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);

  const { addresses, AddAddress, DeleteAddress, UpdateAddress } =
    useUserAddresses();
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
    <div className="flex flex-col md:table md:h-24 gap-4 w-full p-2">
      <div className="md:table-row">
        <div className="md:table-cell md:w-[99%] md:pr-4">
          <div className="flex flex-col w-full gap-4">
            <BoxShadow className="rounded-3xl overflow-hidden">
              <div className="bg-white flex flex-col gap-4 p-4 py-8">
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
            <PaymentGateway />
          </div>
        </div>
        <div className="md:table-cell">
          <BoxShadow className="h-full transform -translate-y-4 w-full overflow-hidden rounded-3xl md:w-[min(30rem,100vw)]">
            <div className="bg-white h-full p-6">
              <div className="flex flex-col h-full gap-2">
                <div className="w-full border-b pb-2 flex justify-between items-center">
                  <p className="text-2xl font-semibold">
                    {res ? res.data.bookedServices.length : 0} {t("Items")}
                  </p>
                  <p
                    className="text-lg font-normal cursor-pointer"
                    onClick={() => visit((routes) => routes.visitCarySummary())}
                  >
                    {t("Change")}
                  </p>
                </div>

                <div className="relative h-[30rem] py-4 sm:h-full w-full">
                  <div className="flex flex-col absolute top-0 left-0 bottom-0 right-0 overflow-y-scroll thinScroll gap-4 h-full">
                    <SpinnerFallback isError={isError} isLoading={isLoading}>
                      {res
                        ? res.data.bookedServices.map((service, i) => (
                            <ServiceCheckoutCardSwitcher
                              key={i}
                              service={service}
                            />
                          ))
                        : null}
                    </SpinnerFallback>
                  </div>
                </div>
                <Divider />
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
      </div>
    </div>
  );
};
