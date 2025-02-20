import { ServiceType } from "@features/API";
import { CheckoutProductsState, VoucherState } from "@src/state";
import { ServiceCheckoutCardSwitcher } from "@UI/components/features/Services/components/Switchers/ServiceCheckoutCardSwitcher";
import { ServiceCheckoutDataType } from "api";
import { useDateDiff } from "hooks";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouting } from "routing";
import { AddressCardDetails, AddressDetails } from "types";
import {
  AddressCard,
  AddressInputs,
  AspectRatio,
  BoxShadow,
  Button,
  CheckInOutInput,
  DateInput,
  Divider,
  GuestsInput,
  Modal,
  ModalContent,
  ModalOverlay,
  PaymentGateway,
  Spacer,
  SpinnerFallback,
  TotalCost,
  useGetCheckoutDataQuery,
  useSearchFilters,
  useUserAddresses,
  VoucherInput,
} from "ui";
import { DateDetails, runIfFn } from "utils";

export interface CheckoutViewProps {}

const randomNum = (max: number) => Math.floor(Math.random() * max);

const FAKE_ADDRESS_DATA: AddressCardDetails[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    address2: "Apt 4B",
    city: "New York",
    zipCode: 10001,
    country: "USA",
    contact: "+1 123-456-7890",
  },
];

export const CheckoutView: React.FC<CheckoutViewProps> = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { filters } = useSearchFilters();
  // const { data: _res, isLoading, isError } = useGetCheckoutDataQuery(filters);
  const res = FAKE_CHECKOUT_DATA;

  const [editAddress, setEditAddress] = React.useState<AddressCardDetails>();
  const [edit, setEdit] = React.useState<boolean>(false);
  const { addresses, AddAddress, DeleteAddress, UpdateAddress } =
    useUserAddresses();
  const products = useRecoilValue(CheckoutProductsState);
  const setVoucher = useSetRecoilState(VoucherState);
  const [activeAddress, setActiveAddress] = React.useState<number>(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (addresses.length < 1) {
      FAKE_ADDRESS_DATA.forEach((address) => AddAddress(address));
    }
  }, [addresses, AddAddress]);

  if (!mounted) {
    return null;
  }

  const handleDelete = (id: string) => {
    DeleteAddress(id);
  };

  const handleAddress = (address?: AddressCardDetails) => {
    setEditAddress(address);
    setEdit(true);
  };

  const handleCancelEdit = () => {
    setEdit(false);
    setEditAddress(undefined);
  };

  const handleSaveAddress = (input: AddressDetails) => {
    if (editAddress) {
      UpdateAddress(editAddress.id, input);
    } else {
      AddAddress({
        id: String(Math.random()),
        ...input,
      });
    }
    handleCancelEdit();
  };

  async function handleVoucherValidation(code: string) {
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
    <div className="flex flex-col md:flex-row gap-4 w-full py-2 border-t">
      <div className="flex flex-col w-full gap-4">
        <BoxShadow>
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
                  <Button
                    className="self-end text-lg font-semibold px-[1.5rem] py-[0.75rem]"
                    colorScheme="darkbrown"
                    onClick={() => handleAddress()}
                  >
                    {t("add_new_address", "Add New Address")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </BoxShadow>
        <VoucherInput onSuccess={handleVoucherValidation} />
        <PaymentGateway onSuccess={() => {}} />
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
              <SpinnerFallback>
                {res &&
                  res.data.bookedServices.map((service, i) => (
                    <ServiceCheckoutCardSwitcher key={i} service={service} />
                  ))}
              </SpinnerFallback>
            </div>
            <SpinnerFallback>
              {res && (
                <TotalCost
                  subTotal={res.data.bookedServices.reduce((acc, curr) => {
                    return acc + (curr?.data?.price || 0);
                  }, 0)}
                  vat={res.data.vat}
                  saved={res.data.saved}
                  voucherRemoveable
                />
              )}
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
  const [mounted, setMounted] = React.useState(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [dates, setDates] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const { days } = useDateDiff({ from: dates.from, to: dates.to });
  const { t } = useTranslation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

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
                dayComponent={({ active, currentMonth, dayNum }) => (
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
                dayComponent={({ active, currentMonth, dayNum }) => (
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
            onChange={() => {}}
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

const sentance =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

const FIXED_DATE = "2023-10-10T00:00:00";

const FAKE_CHECKOUT_DATA = {
  data: {
    bookedServices: [
      {
        type: "hotel",
        data: {
          serviceType: "hotel",
          bookedDates: {
            from: FIXED_DATE,
            to: FIXED_DATE,
          },
          rate: 5,
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: 10,
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: 15,
            },
          ],
          guests: 3,
          cashback: {
            amount: 15,
            type: "percent",
          },
          price: 250,
        },
      },
      {
        type: ServiceType.Vehicle,
        data: {
          serviceType: "vehicle",
          bookedDates: {
            from: FIXED_DATE,
            to: FIXED_DATE,
          },
          rate: 4,
          refundingRule: {
            cost: 12,
            duration: 3,
            id: "12",
          },

          reviews: 112,
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          extras: [
            {
              name: "Breakfast + book now, pay later",
              price: 80,
            },
          ],
          guests: 2,
          cashback: {
            amount: 12,
            type: "percent",
          },
          price: 365,
        },
      },
      {
        type: ServiceType.Restaurant,
        data: {
          serviceType: "restaurant",
          bookedDates: {
            from: FIXED_DATE,
            to: FIXED_DATE,
          },

          rate: 3.5,
          refundingRule: {
            cost: 0,
            duration: 0,
            id: "12",
          },
          reviews: 152,
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          duration: [30, 60],
          bookedMenus: [
            {
              price: 85,
              qty: 7,
              title: sentance.slice(0, randomNum(sentance.length)),
            },
            {
              price: 75,
              qty: 5,
              title: sentance.slice(0, randomNum(sentance.length)),
            },
            {
              price: 95,
              qty: 3,
              title: sentance.slice(0, randomNum(sentance.length)),
            },
          ],
          guests: 3,
          cashback: {
            amount: 15,
            type: "percent",
          },

          price: 420,
        },
      },
      {
        type: "health_center",
        data: {
          serviceType: "health_center",
          bookedDates: {
            from: FIXED_DATE,
            to: FIXED_DATE,
          },
          rate: 4,
          refundingRule: {
            cost: 60,
            duration: 0,
            id: "12",
          },

          reviews: 122,
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",

          duration: [30, 60],
          guests: 4,
          cashback: {
            amount: 10,
            type: "percent",
          },
          price: 422,
          doctor: {
            id: "123",
            name: "Doctor 1",
            specialty: "spine",
            price: 45,
            photo: getRandomImage(),
          },
        },
      },
      {
        type: "beauty_center",
        data: {
          serviceType: "beauty_center",
          bookedDates: {
            from: FIXED_DATE,
            to: FIXED_DATE,
          },
          rate: 3,
          refundingRule: {
            cost: 0,
            duration: 4,
            id: "12",
          },
          duration: [30, 60],
          reviews: 45,
          thumbnail: getRandomImage(),
          id: "123",
          rateReason: "cleanliness",
          title: "Citadines Montmartre Paris",
          cashback: {
            amount: 15,
            type: "percent",
          },
          guests: null,
          price: 350,
          bookedTreatments: [
            {
              id: "123",
              category: "Facial",
              title: "Hydro facial with chemical peel",
              durationInMinutes: [30, 60],
              price: 40,
              discount: 12,
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
    saved: 75,
    vat: 7,
  },
};
