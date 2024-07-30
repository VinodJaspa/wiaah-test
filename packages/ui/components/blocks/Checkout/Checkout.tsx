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
  ResturantCheckoutCard,
  HealthCenterCheckoutCard,
  BeautyCenterCheckoutCard,
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
import { CheckoutProductsState, VoucherState } from "@src/state";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { DateDetails, runIfFn } from "utils";

import { useDateDiff } from "hooks";
import { ServiceCheckoutDataType } from "api";
import { ServiceType } from "@features/API";
import { getRandomImage } from "placeholder";

const randomNum = (max: number) => Math.floor(Math.random() * max);
export interface CheckoutViewProps { }

export const CheckoutView: React.FC<CheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  //WARNING: this graphql query is not created yet
  const { data: _res, isLoading, isError } = useGetCheckoutDataQuery(filters);
  const res = FAKE_CHECKOUT_DATA;

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
              <DatePicker />
              <GuestsPicker />
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
        <PaymentGateway onSuccess={() => { }} />
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
                    return acc + (curr?.data?.price || 0);
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

interface DateRange {
  from: Date;
  to: Date;
}

const DatePicker: React.FC = () => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [dates, setDates] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const { days } = useDateDiff({ from: dates.from, to: dates.to });
  const { t } = useTranslation();

  const datesDisplay = () => {
    if (!dates) return null;

    const checkin = DateDetails(dates.from);
    const checkout = DateDetails(dates.to);
    const sameMonth = checkin?.month_short === checkout?.month_short;

    return (
      <p>
        {checkin?.day} {sameMonth ? null : `${checkin?.month_short} `}-
        {checkout?.day} {checkout?.month_short}
      </p>
    );
  };

  const handleClearDates = () => {
    setDates({ from: new Date(), to: new Date() });
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Dates")}</p>
        {runIfFn(datesDisplay)}
      </div>
      <Modal isOpen={edit} onClose={() => setEdit(false)}>
        <ModalOverlay />
        <ModalContent className="w-[min(50rem,100%)] flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full items-center">
            <CheckInOutInput
              onDatesChange={() => { }}
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
                dayComponent={({ active, currentMonth, dayNum }) => (
                  <AspectRatio ratio={1}>
                    <div
                      className={`${active
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
                dayComponent={({ active, currentMonth, dayNum }) => (
                  <AspectRatio ratio={1}>
                    <div
                      className={`${active
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
            <Button onClick={() => setEdit(false)}>{t("Save")}</Button>
          </div>
        </ModalContent>
      </Modal>
      <p
        onClick={() => setEdit(true)}
        className="cursor-pointer underline font-bold"
      >
        {t("Edit")}
      </p>
    </div>
  );
};

const GuestsPicker = () => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Guests")}</p>
        <p>1 {t("guest")}</p>
      </div>
      <Modal isOpen={edit} onClose={() => setEdit(false)}>
        <ModalOverlay />
        <ModalContent>
          <GuestsInput
            value={{
              adults: 3,
              childrens: 1,
              infants: 1,
            }}
            onChange={() => { }}
          />
        </ModalContent>
      </Modal>
      <p
        onClick={() => setEdit(true)}
        className="cursor-pointer underline font-bold"
      >
        {t("Edit")}
      </p>
    </div>
  );
};

export default GuestsPicker;

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
          rate: randomNum,
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: randomNum(153),
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: randomNum(100),
            },
          ],
          guests: randomNum(5),
          cashback: {
            amount: randomNum(20),
            type: "percent",
          },
          price: randomNum(500),
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
          rate: randomNum(5),
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: randomNum(153),
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: randomNum(100),
            },
          ],
          guests: randomNum(5),
          cashback: {
            amount: randomNum(20),
            type: "percent",
          },
          price: randomNum(500),
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

          rate: randomNum(5),
          refundingRule: {
            cost: 0,
            duration: 0,
            id: "12",
          },
          reviews: randomNum(153),
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          bookedMenus: [
            {
              price: randomNum(100),
              qty: randomNum(10),
              title: senctence.slice(0, randomNum(senctence.length)),
            },
            {
              price: randomNum(100),
              qty: randomNum(10),
              title: senctence.slice(0, randomNum(senctence.length)),
            },
            {
              price: randomNum(100),
              qty: randomNum(10),
              title: senctence.slice(0, randomNum(senctence.length)),
            },
          ],
          guests: randomNum(5),
          cashback: {
            amount: randomNum(20),
            type: "percent",
          },

          price: randomNum(500),
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
          rate: randomNum(5),
          refundingRule: {
            cost: 60,
            duration: 0,
            id: "12",
          },

          reviews: randomNum(153),
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",

          duration: [30, 60],
          guests: randomNum(5),
          cashback: {
            amount: randomNum(20),
            type: "percent",
          },
          price: randomNum(500),
          doctor: {
            id: "123",
            name: "Doctor 1",
            specialty: "spine",
            price: randomNum(50),
            photo: getRandomImage(),
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
          rate: randomNum(5),
          refundingRule: {
            cost: 0,
            duration: 4,
            id: "12",
          },
          duration: [30, 60],
          reviews: randomNum(153),
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          cashback: {
            amount: randomNum(20),
            type: "percent",
          },
          guests: null,
          price: randomNum(500),
          bookedTreatments: [
            {
              id: "123",
              category: "Facial",
              title: "Hydro facial with chemical peel",
              durationInMinutes: [30, 60],
              price: randomNum(50),
              discount: randomNum(60),
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
          thumbnail: getRandomImage(),
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
          thumbnail: getRandomImage(),
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
    saved: randomNum(150),
    vat: 7,
  },
};
