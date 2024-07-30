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
import { ServiceType } from "@features/API";
import { ServiceCheckoutDataType } from "api";

export interface CheckoutViewProps { }

export const OldCheckoutView: React.FC<CheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();

  const { data: _res, isLoading, isError } = useGetCheckoutDataQuery(filters);
  const res = FAKE_CHECKOUT_DATA;

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
            <div
              style={{
                boxShadow: "0px 0px 59px rgba(0, 0, 0, 0.06)",
              }}
              className="bg-white rounded-3xl flex flex-col gap-8 p-6"
            >
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
            <PaymentGateway onSuccess={() => { }} />
          </div>
        </div>
        <div className="md:table-cell">
          <BoxShadow className="h-full transform -translate-y-3 w-full overflow-hidden rounded-3xl md:w-[min(36rem,100vw)]">
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
                            <>
                              <ServiceCheckoutCardSwitcher
                                key={i}
                                service={service}
                              />
                              <Divider className="my-6"></Divider>
                            </>
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

const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";
const FAKE_CHECKOUT_DATA = {
  data: {
    bookedServices: [
      {
        type: "hotel",
        data: {
          serviceType: "hotel",
          bookedDates: {
            from: new Date(Date.now()).toString(),
            to: new Date(Date.now()).toString(),
          },
          rate: 5,
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: 153,
          thumbnail: "/place-1.jpg",
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: 100,
            },
          ],
          guests: 5,
          cashback: {
            amount: 20,
            type: "percent",
          },
          price: 500,
        },
      },
      {
        type: ServiceType.Vehicle,
        data: {
          serviceType: "hotel",
          bookedDates: {
            from: new Date(Date.now()).toString(),
            to: new Date(Date.now()).toString(),
          },
          rate: 5,
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: 153,
          thumbnail: "/place-1.jpg",
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: 100,
            },
          ],
          guests: 5,
          cashback: {
            amount: 20,
            type: "percent",
          },
          price: 500,
        },
      },
      {
        type: ServiceType.Restaurant,
        data: {
          serviceType: "restaurant",
          bookedDates: {
            from: new Date(Date.now()).toString(),
            to: null,
          },

          rate: 5,
          refundingRule: {
            cost: 0,
            duration: 0,
            id: "12",
          },
          reviews: 153,
          thumbnail:
            "https://digital.ihg.com/is/image/ihg/crowne-plaza-jeddah-5499645385-2x1",
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          bookedMenus: [
            {
              price: 100,
              qty: 10,
              title: senctence.slice(0, senctence.length),
            },
            {
              price: 100,
              qty: 10,
              title: senctence.slice(0, senctence.length),
            },
            {
              price: 100,
              qty: 10,
              title: senctence.slice(0, senctence.length),
            },
          ],
          guests: 5,
          cashback: {
            amount: 20,
            type: "percent",
          },

          price: 500,
        },
      },
      {
        type: "health_center",
        data: {
          serviceType: "health_center",
          bookedDates: {
            from: new Date(Date.now()).toString(),
            to: new Date(Date.now()).toString(),
          },
          rate: 5,
          refundingRule: {
            cost: 60,
            duration: 0,
            id: "12",
          },

          reviews: 153,
          thumbnail:
            "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",

          duration: [30, 60],
          guests: 5,
          cashback: {
            amount: 20,
            type: "percent",
          },
          price: 500,
          doctor: {
            id: "123",
            name: "Doctor 1",
            specialty: "spine",
            price: 50,
            photo:
              "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
          },
        },
      },
      {
        type: "beauty_center",
        data: {
          serviceType: "beauty_center",
          bookedDates: {
            from: new Date(Date.now()).toString(),
            to: new Date(Date.now()).toString(),
          },
          rate: 5,
          refundingRule: {
            cost: 0,
            duration: 4,
            id: "12",
          },
          duration: [30, 60],
          reviews: 153,
          thumbnail:
            "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/big/Tacha+Beauty+Center-01.jpg",
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          cashback: {
            amount: 20,
            type: "percent",
          },
          guests: null,
          price: 500,
          bookedTreatments: [
            {
              id: "123",
              category: "Facial",
              title: "Hydro facial with chemical peel",
              durationInMinutes: [30, 60],
              price: 50,
              discount: 60,
            },
          ],
        },
      },
      {
        type: "product",
        data: {
          location: {
            address: "address",
            city: "city",
            cords: {
              lat: 15,
              lng: 16,
            },
            country: "country",
            countryCode: "CH",
            postalCode: 13254,
            state: "state",
          },
          id: "2",
          type: "downloadable",
          thumbnail:
            "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
          name: "item1",
          price: 15,
          qty: 3,
          shippingMethods: [],
          color: "red",
          size: "One Size",
          cashback: {
            amount: 4,
            type: "cash",
          },
          discount: 10,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
        },
      },
      {
        type: "product",
        data: {
          location: {
            address: "address",
            city: "city",
            cords: {
              lat: 15,
              lng: 16,
            },
            country: "country",
            countryCode: "CH",
            postalCode: 13254,
            state: "state",
          },
          id: "2",
          thumbnail:
            "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
          name: "item1",
          price: 15,
          qty: 3,
          type: "goods",
          shippingMethods: [
            {
              cost: 15,
              description: "test",
              id: "12",
              deliveryTime: {
                from: 5,
                to: 7,
              },
              name: "European union",
              value: "european_union",
            },
            {
              cost: 0,
              description: "test",
              id: "12",
              deliveryTime: {
                from: 1,
                to: 3,
              },
              name: "Click & Collect",
              value: "click_and_collect",
            },
            {
              cost: 20,
              description: "test",
              id: "12",
              deliveryTime: {
                from: 6,
                to: 8,
              },
              name: "International",
              value: "international",
            },
          ],
          color: "#F5E0A1",
          size: "XL",
          cashback: {
            amount: 4,
            type: "cash",
          },
          discount: 10,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
        },
      },
    ] as ServiceCheckoutDataType[],
    saved: 150,
    vat: 7,
  },
};
