import React from "react";
import {
  BoxShadow,
  Divider,
  VoucherInput,
  PaymentGateway,
  useGetCheckoutDataQuery,
  useSearchFilters,
  SpinnerFallback,
  ServiceCheckoutCardSwitcher,
  TotalCost,
  Select,
  SelectOption,
  HStack,
  FlagIcon,
  Input,
  InputGroup,
  InputLeftElement,
  SearchIcon,
  Radio,
  Button,
} from "ui";
import { AddressCardDetails } from "types";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { countries, mapArray, useForm } from "utils";

export interface ServiceCheckoutViewProps {}

export const CheckoutView: React.FC<ServiceCheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();

  const { data: res, isLoading, isError } = useGetCheckoutDataQuery(filters);

  const { inputProps, handleChange } = useForm<{
    firstName: string;
    lastName: string;
    postal_code: string;
    phone: string;
    defaultDelivery?: boolean;
    defaultShipping?: boolean;
  }>(
    {
      firstName: "",
      lastName: "",
      phone: "",
      postal_code: "",
    },
    {},
    { addLabel: true }
  );

  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);

  const [activeAddress, setActiveAddress] = React.useState<number>();

  return (
    <div className="flex flex-col md:table md:h-24 gap-4 w-full p-2">
      <div className="md:table-row">
        <div className="md:table-cell md:w-[99%] md:pr-4">
          <div className="flex flex-col w-full gap-4">
            <div className="bg-white rounded-3xl flex flex-col gap-8 p-6">
              <p className="text-center font-bold text-[2rem]">
                {t("Checkout")}
              </p>
              <div className="flex flex-col gap-[1.625rem]">
                <p className="text-[1.375rem] font-medium">
                  {t("Shipping address")}
                </p>
                {/* {edit ? ( */}
                <div className="flex flex-col gap-6 w-full">
                  <Select
                    labelClassName="font-medium text-[#B2B2B2]"
                    label={`${t("Country")}/${t("region")}`}
                  >
                    {mapArray(countries, (v, i) => (
                      <SelectOption value={v.isoCode}>
                        <HStack className="text-">
                          <FlagIcon code={v.isoCode}></FlagIcon>
                          {v.name}
                        </HStack>
                      </SelectOption>
                    ))}
                  </Select>
                  <div className="flex flex-col gap-4 w-full">
                    <p className="font-medium text-[#B2B2B2]">
                      {t("Delivery Address")}
                    </p>
                    <Input {...inputProps("firstName")} />
                    <Input {...inputProps("lastName")} />
                    <Input
                      {...inputProps("postal_code")}
                      label={t("Zip code")}
                    />
                    <Input {...inputProps("phone")} label={t("Contact")} />
                    <div>
                      <p className="text-lg font-medium">
                        {t("Address Finder")}
                      </p>
                      <InputGroup className="rounded-xl border-[#EDEDED]">
                        <InputLeftElement className="pl-4">
                          <SearchIcon />
                        </InputLeftElement>
                        <Input
                          placeholder={t("Type the first line of your address")}
                        ></Input>
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Radio
                        colorScheme="black"
                        {...inputProps(
                          "defaultDelivery",
                          undefined,
                          undefined,
                          (e) => e.target.checked
                        )}
                      >
                        {t("Set as default delivery address")}
                      </Radio>
                      <Radio
                        colorScheme="black"
                        {...inputProps(
                          "defaultShipping",
                          undefined,
                          undefined,
                          (e) => e.target.checked
                        )}
                      >
                        {t("Set as default billing address")}
                      </Radio>
                    </div>
                  </div>
                  <Button
                    className="self-end text-lg font-semibold px-[1.5rem] py-[0.75rem]"
                    colorScheme="darkbrown"
                  >
                    {t("Add Address")}
                  </Button>
                </div>

                {/* ) : ( */}
                <>
                  {/* <div className="w-full flex flex-col gap-4">
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
                        <div className="w-full flex uppercase justify-end">
                        <Button
                        colorScheme="darkbrown"
                        onClick={() => handleAddress()}
                        >
                        {t("add address")}
                        </Button>
                      </div> */}
                </>
                {/* )} */}
              </div>
            </div>
            <VoucherInput />
            <PaymentGateway onSuccess={() => {}} />
          </div>
        </div>
        <div className="md:table-cell">
          <BoxShadow className="h-full transform -translate-y-4 w-full overflow-hidden rounded-3xl md:w-[min(36rem,100vw)]">
            <div className="bg-white h-full">
              <div className="flex flex-col h-full">
                <div className="w-full border-b pb-2 p-6 flex justify-between items-center">
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

                <div className="relative sm:h-full w-full">
                  <div className=" p-6 absolute top-0 left-0 bottom-0 right-0 overflow-y-scroll thinScroll h-full">
                    <div className="p-4 border-[#F1F1F1] border rounded-3xl">
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
                </div>
                <Divider className="mb-0" />
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
