import React from "react";
import {
  BoxShadow,
  AddressCard,
  Divider,
  Spacer,
  Button,
  AddressInputs,
  VoucherInput,
  PaymentGateway,
  useGetCheckoutDataQuery,
  useSearchFilters,
  SpinnerFallback,
  ServiceCheckoutCardSwitcher,
  TotalCost,
  useGetMyShippingAddressesQuery,
  useDeleteShippingAddressMutation,
  useAddShippingAddress,
  useEditShippingAddressMutation,
  useApplyVoucherMutation,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export interface CheckoutViewProps { }

export const OldCheckoutView: React.FC<CheckoutViewProps> = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  const { data: res, isLoading, isError } = useGetCheckoutDataQuery(filters);
  const [edit, setEdit] = React.useState<string | true>();

  const { data: addresses } = useGetMyShippingAddressesQuery();
  const { mutate: deleteShipping } = useDeleteShippingAddressMutation();
  const { mutate: addShipping } = useAddShippingAddress();
  const { mutate: editShipping } = useEditShippingAddressMutation();

  const { mutate: applyVoucher } = useApplyVoucherMutation();

  const [activeAddress, setActiveAddress] = React.useState<number>();

  function handleDelete(id: string) {
    deleteShipping(id);
  }

  function handleCancelEdit() {
    setEdit(undefined);
  }

  function handleSaveAddress(
    input:
      | Parameters<typeof editShipping>[0]
      | Parameters<typeof addShipping>[0]
  ) {
    // call api to save address
    if ("id" in input) {
      editShipping(input);
      handleCancelEdit();
    } else {
      addShipping(input);
      handleCancelEdit();
    }
  }

  async function handleVoucherValidation(code: string) {
    // call api to check if the voucher is valid
    return new Promise<boolean>((res, rej) => {
      applyVoucher(
        {
          voucherCode: code,
        },
        {
          onError: rej,
          onSuccess: () => res(true),
        }
      );
    });
  }
  const editAddress = addresses?.find((v) => v.id === edit);
  return (
    <div className="flex flex-col md:table md:h-24 gap-4 w-full py-2">
      <div className="md:table-row">
        <div className="md:table-cell md:w-[99%] md:pr-4">
          <div className="flex flex-col w-full gap-4">
            <BoxShadow>
              <div className="bg-white flex flex-col gap-4 p-4 py-8">
                <div className="flex w-full justify-center text-3xl">
                  <p className="font-bold">{t("Checkout")}</p>
                </div>

                <p className="text-3xl">{"Address"}</p>
                {edit ? (
                  <AddressInputs
                    initialInputs={
                      editAddress
                        ? {
                          address: editAddress.location.address,
                          city: editAddress.location.city,
                          contact: editAddress.phone,
                          country: editAddress.location.country,
                          firstName: editAddress.firstname,
                          lastName: editAddress.lastname,
                          zipCode: parseInt(editAddress.zipCode),
                        }
                        : null
                    }
                    onCancel={handleCancelEdit}
                    onSuccess={({
                      address,
                      city,
                      contact,
                      country,
                      firstName,
                      lastName,
                      address2,
                      zipCode,
                    }) =>
                      handleSaveAddress({
                        id: typeof edit === "string" ? edit : undefined,
                        firstname: firstName,
                        lastname: lastName,
                        location: {
                          address,
                          city,
                          country,
                          state: city,
                          postalCode: zipCode.toString(),
                        },
                        phone: String(contact),
                        zipCode: String(zipCode),
                      })
                    }
                  />
                ) : (
                  <>
                    <div className="w-full flex flex-col gap-4">
                      {(addresses?.length || 0) > 0 &&
                        addresses.map((address, i) => (
                          <div
                            className="cursor-pointer"
                            key={i}
                            onClick={() => setActiveAddress(i)}
                          >
                            <AddressCard
                              borderColor="#000"
                              onDelete={(id) => handleDelete(id)}
                              onEdit={(address) => setEdit(address.id)}
                              addressDetails={{
                                address: address.location.address,
                                city: address.location.city,
                                country: address.location.country,
                                firstName: address.firstname,
                                lastName: address.lastname,
                                contact: address.phone,
                                id: address.id,
                                zipCode: parseInt(address.zipCode),
                              }}
                              active={activeAddress === i}
                            />
                            <Divider />
                          </div>
                        ))}
                    </div>
                    <Spacer />
                    <div className="w-full flex justify-end">
                      <Button onClick={() => setEdit(true)}>
                        {t("ADD NEW ADDRESS")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </BoxShadow>
            <VoucherInput onSuccess={(data) => handleVoucherValidation(data)} />
            <PaymentGateway onSuccess={(data) => { }} />
          </div>
        </div>
        <div className="md:table-cell ">
          <BoxShadow className="h-full w-[min(30rem,100vw)]">
            <div className="bg-white h-full">
              <div className="flex flex-col h-full p-4 gap-2">
                <div className="w-full flex justify-between items-center">
                  <p className="text-3xl font-bold">
                    {res ? res.data.bookedServices.length : 0} {t("items")}
                  </p>
                  <p
                    className="text-lg cursor-pointer"
                    onClick={() => visit((routes) => routes.visitCarySummary())}
                  >
                    {t("Change")}
                  </p>
                </div>
                <Divider />
                <div className="relative h-full w-full">
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
