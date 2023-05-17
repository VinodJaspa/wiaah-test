import React from "react";
import { useTranslation } from "react-i18next";
import {
  Tabs,
  TabTitle,
  TabsHeader,
  TranslationText,
  Table,
  TableContainer,
  Th,
  Td,
  Tr,
  TBody,
  Input,
  InputGroup,
  InputLeftElement,
  PriceDisplay,
  SearchIcon,
  Button,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  CancelIcon,
  Avatar,
  SectionHeader,
  EyeIcon,
  CashPaymentIcon,
  useGetMyBookingsHistoryQuery,
  usePaginationControls,
  Badge,
  GetMyBookingsQuery,
  Pagination,
  Modal,
  ModalContent,
  ModalOverlay,
  HStack,
  ModalHeader,
  CalanderPage,
  Divider,
  QrcodeDisplay,
  useGetAppointmentDetailsQuery,
  usePaybackServiceInsuranceMutation,
  ArrowLeftAlt1Icon,
  InputRightElement,
  CloseIcon,
  Select,
  VerifiedIcon,
  Image,
  MoneyHandIcon,
  ServicePendingAppointmentCard,
  ServiceBookingCardVariant,
} from "@UI";
import { useCancelAppointmentMutation, useResponsive } from "@src/Hooks";
import { bookingsHistoryCtx } from ".";
import { BookedServiceStatus, CashbackType, ServiceType } from "@features/API";
import { mapArray, useForm } from "@UI/../utils/src";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { startCase } from "lodash";
import { useRouting } from "@UI/../routing";

const BookingHistoryAtom = atom<{
  paybackId?: {
    id: string;
    amount: number;
  };
  viewId?: string;
  cancelId?: string;
}>({
  key: "bookingHistoryAtom",
  default: {
    paybackId: undefined,
    cancelId: undefined,
    viewId: undefined,
  },
});

export const BookingsHistorySection: React.FC<{ accountId: string }> = () => {
  const { shopping } = React.useContext(bookingsHistoryCtx);
  const { isMobile } = useResponsive();
  const [Filter, setFilter] = React.useState<BookedServiceStatus>();
  const { t } = useTranslation();
  const { back } = useRouting();

  const { pagination, controls } = usePaginationControls();

  const { form, inputProps } = useForm<
    Parameters<typeof useGetMyBookingsHistoryQuery>[0]
  >(
    {
      status: Filter,
      pagination,
      q: "",
    },
    {
      status: Filter,
      pagination,
    }
  );

  const { refetch } = useGetMyBookingsHistoryQuery(form);

  React.useEffect(() => {
    refetch();
  }, [Filter]);

  const setBookingHistoryState = useSetRecoilState(BookingHistoryAtom);

  const data: GetMyBookingsQuery["getBookingHistory"] = [...Array(5)].map(
    (v, i) => ({
      id: "test",
      cashback: {
        amount: 5,
        id: "test",
        units: 15,
      },
      buyer: {
        profile: {
          photo: "/profile (2).jfif",
          username: "buyer name",
        },
      },
      checkin: new Date().toString(),
      checkout: new Date().toString(),
      payment: "Visa",
      discount: {
        amount: 15,
        id: "test",
        units: 5,
        type: CashbackType.Cash,
      },
      dishs: [],
      guests: 1,
      seller: {
        profile: {
          photo: "/profile (3).jfif",
          username: "seller name",
        },
      },
      service: {
        price: 48,
        title: "test service name",
      },
      status: BookedServiceStatus.Completed,
      treatments: [],
      type: ServiceType.Hotel,
      insurance: {
        amount: 250,
      },
    })
  );

  return isMobile ? (
    shopping ? (
      <div className="flex flex-col gap-6 w-full">
        <HStack className="justify-center relative">
          <button
            className="absolute top-1/2 -translate-y-1/2 left-1"
            onClick={() => back()}
          >
            <ArrowLeftAlt1Icon />
          </button>
          <p className="text-lg font-semibold">{t("Bookings")}</p>
          <p className="absolute top-1/2 -translate-y-1/2 right-1 font-medium text-secondaryRed">{`(${
            data.length
          }) ${t("Bookings")}`}</p>
        </HStack>

        {mapArray(data, (book, i) => (
          <div
            style={{ boxShadow: "0px 0px 20px -17px black" }}
            key={book.id + i}
            className="p-2 flex flex-col gap-2"
          >
            <p className="text-center text-xl font-semibold">
              {t("Check in details")}
            </p>
            <HStack className="gap-8 py-3 px-2 justify-between">
              <QrcodeDisplay
                style={{ width: "min(100%, 12.5rem)" }}
                value={book.id}
              />
              <div className="flex flex-col gap-5">
                <Button className="whitespace-nowrap" colorScheme="darkbrown">
                  {t("Save QR")}
                </Button>
                <Button
                  className="whitespace-nowrap"
                  colorScheme="primary"
                  outline
                >
                  {t("Share QR")}
                </Button>
              </div>
            </HStack>
            <p>
              {t("Booking Number")}:{" "}
              <span className="font-semibold">{book.id}</span>
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col w-28 gap-1">
                <p>{t("Check in")}:</p>
                <div className="flex flex-col rounded border border-primary">
                  <p className="bg-primary text-xs text-black text-center">
                    {new Date(book.checkin).toLocaleDateString("en-us", {
                      weekday: "long",
                    })}
                  </p>
                  <div className="flex px-2 font-semibold pt-1 flex-col">
                    <p className="text-black text-center">
                      {new Date(book.checkin).toLocaleDateString("en-us", {
                        day: "2-digit",
                      })}
                    </p>
                    <p className="text-black text-center">
                      {new Date(book.checkin).toLocaleDateString("en-us", {
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-28 gap-1">
                <p>{t("Check out")}:</p>
                <div className="flex flex-col rounded border border-primary">
                  <p className="bg-primary text-xs text-black text-center">
                    {new Date(book.checkout).toLocaleDateString("en-us", {
                      weekday: "long",
                    })}
                  </p>
                  <div className="flex px-2 font-semibold pt-1 flex-col">
                    <p className="text-black text-center">
                      {new Date(book.checkout).toLocaleDateString("en-us", {
                        day: "2-digit",
                      })}
                    </p>
                    <p className="text-black text-center">
                      {new Date(book.checkout).toLocaleDateString("en-us", {
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ServicePendingAppointmentCard
              variant={ServiceBookingCardVariant.buyer}
              shopName="Padma Resort Legian"
              amenities={[
                { slug: "wifi", label: "Free WIFI" },
                { label: "Free Movies", slug: "movies" },
              ]}
              cancelationPolicy={{
                cost: 50,
                duration: 15,
              }}
              checkin={new Date()}
              checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
              extras={[{ cost: 50, name: "Mini-bar-20" }]}
              fullAddress="No.1 PO BOX 1107, legian, Indonesia"
              guests={{
                adults: 2,
                childrens: 1,
              }}
              name="Standard room"
              thumbnail="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg"
              total={500}
              serviceType={ServiceType.Hotel}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-2 w-full">
        <HStack className="justify-center relative">
          <ArrowLeftAlt1Icon className="absolute left-0 top-1/2 -translate-y-1/2" />
          <p>{t("Bookings")}</p>
        </HStack>

        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            {...inputProps("q")}
            placeholder={t("Type order ID, customer name, date...")}
          />
          <InputRightElement>
            <CloseIcon />
          </InputRightElement>
        </InputGroup>

        <HStack className="justify-between">
          <HStack className="gap-1">
            <p>{t("Month")}:</p>
            <Select></Select>
          </HStack>
          <HStack className="gap-1">
            <p>{t("Year")}:</p>
            <Select></Select>
          </HStack>
        </HStack>

        {mapArray(data, (v, i) => (
          <div className="flex flex-col w-full">
            <HStack className="justify-between">
              <HStack>
                <Avatar
                  src={v.buyer.profile?.photo}
                  name={v.buyer.profile?.username}
                  alt={v.buyer.profile?.username}
                />
                <div className="flex flex-col">
                  <HStack>
                    <p>{v.buyer.profile?.username}</p>
                    {v.buyer.profile?.verified ? (
                      <VerifiedIcon className="text-xs text-secondaryBlue" />
                    ) : null}
                  </HStack>
                </div>
              </HStack>
              <Badge
                value={v.status}
                cases={{
                  fail: BookedServiceStatus.CanceledByBuyer,
                  info: BookedServiceStatus.Continuing,
                  success: BookedServiceStatus.Completed,
                }}
              >
                {startCase(v.status)}
              </Badge>
            </HStack>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  src={v.service?.thumbnail}
                  className="w-12 h-10 rounded-md"
                />
                <p className="text-sm font-medium">{v.service?.name}</p>
              </div>
              <HStack>
                <p className="text-sm">{t("Payment method")}:</p>
                <p className="text-sm font-semibold">{v.payment}</p>
              </HStack>
              <HStack>
                <p className="text-sm">{t("View")}:</p>
                <EyeIcon></EyeIcon>
              </HStack>
              <HStack>
                <p className="text-sm">{t("Payback")}:</p>
                <MoneyHandIcon />
              </HStack>
            </div>
            <Divider />

            <HStack className="justify-between">
              <HStack className="text-sm">
                <p>{t("Date")}:</p>
                <p className="font-semibold text-base">
                  {new Date(v.checkin).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </HStack>

              <PriceDisplay price={v.total || 0} />
            </HStack>
          </div>
        ))}
      </div>
    )
  ) : (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Bookings")} />
      <TabsHeader className="flex-wrap" />
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder={`${t("Search for order ID")}, ${t("customer")}, ${t(
            "Order Status"
          )}, ${t("Or")} ${t("something")}`}
        />
      </InputGroup>
      <Tabs>
        {Object.values(BookedServiceStatus).map((d, i) => (
          <>
            <TabTitle TabKey={i}>
              {({ currentTabIdx }) => {
                setFilter(d);
                return (
                  <TranslationText
                    className={`${
                      d === Filter
                        ? "text-primary border-b-2 border-primary"
                        : ""
                    } text-xs sm:text-sm md:text-base whitespace-nowrap`}
                    translationObject={d}
                  />
                );
              }}
            </TabTitle>
          </>
        ))}
      </Tabs>
      <TableContainer className="w-full">
        <Table
          ThProps={{
            className:
              "first:text-left first:pl-2 border-gray-300 border-[1px] border-collapse",
          }}
          TrProps={{ className: "border-collapse" }}
          TdProps={{
            className:
              "first:text-left first:pl-2 border-gray-300 border-[1px] border-collapse",
          }}
          className="w-full"
        >
          <Tr>
            <Th>{t("Photo")}</Th>
            <Th>{t("ID")}</Th>
            <Th>{t("Service")}</Th>
            <Th>{shopping ? t("Seller") : t("Customer")}</Th>
            <Th>{t("From")}</Th>
            <Th>{t("To")}</Th>
            <Th>{t("Service Price")}</Th>
            <Th>{t("Service Status")}</Th>
            <Th>{t("Payment")}</Th>
            <Th>{t("View")}</Th>
            {shopping ? <Th>{t("Action")}</Th> : <Th>{t("Payback")}</Th>}
          </Tr>
          <TBody>
            {data && data.length > 0 ? (
              data.map(
                (
                  {
                    id,
                    buyer,
                    checkin,
                    seller,
                    status,
                    checkout,
                    payment,
                    ...rest
                  },
                  i
                ) => (
                  <Tr className="cursor-pointer" key={i}>
                    <Td>
                      <Avatar
                        className=""
                        alt={
                          shopping
                            ? seller?.profile?.username
                            : buyer?.profile?.username
                        }
                        src={
                          shopping
                            ? seller?.profile?.photo
                            : buyer?.profile?.photo
                        }
                      />
                    </Td>
                    <Td>{id}</Td>
                    <Td>{"Service name"}</Td>
                    <Td>
                      <p>
                        {shopping
                          ? buyer.profile?.username
                          : seller.profile?.username}
                      </p>
                    </Td>
                    <Td>
                      {new Date(checkin).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>
                      {new Date(checkout).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>
                      <PriceDisplay price={150} />
                    </Td>
                    <Td>
                      <Badge
                        cases={{
                          success: BookedServiceStatus.Completed,
                          fail: [BookedServiceStatus.CanceledByBuyer],
                          info: BookedServiceStatus.Continuing,
                          warning: BookedServiceStatus.Restitute,
                          off: BookedServiceStatus.Pending,
                        }}
                        value={status}
                      >
                        {status}
                      </Badge>
                    </Td>
                    <Td>{payment}</Td>
                    <Td>
                      <div className="flex w-full justify-center">
                        <EyeIcon
                          onClick={() =>
                            setBookingHistoryState((v) => ({
                              ...v,
                              viewId: id,
                            }))
                          }
                        />
                      </div>
                    </Td>
                    {shopping ? (
                      <Td
                        onClick={() =>
                          setBookingHistoryState((v) => ({
                            ...v,
                            cancelId: id,
                          }))
                        }
                      >
                        <div className="w-full flex justify-center">
                          <CancelIcon className="mx-auto" />
                        </div>
                      </Td>
                    ) : (
                      <Td>
                        {rest?.insurance ? (
                          <div
                            onClick={() =>
                              setBookingHistoryState((v) => ({
                                ...v,
                                paybackId: {
                                  id: rest.insurance?.id || "",
                                  amount: rest.insurance?.amount || 0,
                                },
                              }))
                            }
                            className="flex w-full justify-center"
                          >
                            <CashPaymentIcon />
                          </div>
                        ) : null}
                      </Td>
                    )}
                  </Tr>
                )
              )
            ) : (
              <Tr>
                <Td colSpan={12}>
                  <div className="p-4  text-2xl">
                    {t("No Bookings History Found")}
                  </div>
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </TableContainer>
      <Pagination controls={controls} />
      <BookingPayBackModal />
      <BookingCancelationModal />
      <BookingViewModal />
    </div>
  );
};

const BookingViewModal: React.FC = () => {
  const { t } = useTranslation();
  const id = useRecoilValue(
    selector({
      key: "bookingViewIdState",
      get: ({ get }) => {
        const state = get(BookingHistoryAtom);

        return state.viewId;
      },
    })
  );

  const setId = useSetRecoilState(BookingHistoryAtom);

  const cancel = () => setId((v) => ({ ...v, viewId: undefined }));

  const { data: service } = useGetAppointmentDetailsQuery(id!, {
    enabled: !!id,
  });

  return (
    <Modal isOpen={!!id} onClose={cancel}>
      <ModalOverlay></ModalOverlay>
      <ModalContent className="max-w-[min(90vw)] overflow-y-scroll thinScroll">
        <ModalHeader
          className="font-semibold text-xl"
          title={t("Check in details")}
        />

        <Divider />
        <div className="flex flex-col gap-4 py-2">
          <HStack className="justify-between">
            <div className="w-32">
              <QrcodeDisplay value={service?.id || ""} />
            </div>
            <Button colorScheme="darkbrown">{t("Save QR")}</Button>
          </HStack>
          <p className="font-medium">
            {t("Booking Number")}: <span className="font-semibold">{id}</span>
          </p>

          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{t("Check in")}:</p>
              <CalanderPage
                bgColor="#3AD398"
                textColor="#000"
                date={new Date()}
              />
              <p className="self-center">
                {t("From")}{" "}
                <span className="font-semibold">
                  {new Date().toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>{" "}
                |{" "}
                <span className="font-semibold">
                  {t("Guest")}: {3}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">{t("Check out")}:</p>
              <CalanderPage
                bgColor="#3AD398"
                textColor="#000"
                date={new Date()}
              />
              <p className="self-center">
                {t("Until")}{" "}
                <span className="font-semibold">
                  {new Date().toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>{" "}
                |{" "}
                <span className="font-semibold">
                  {t("Nights")}: {3}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ModalFooter>
          <HStack className="justify-end">
            <Button onClick={cancel} colorScheme="danger">
              {t("Cancel the booking")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const BookingPayBackModal: React.FC = () => {
  const { t } = useTranslation();
  const payback = useRecoilValue(
    selector({
      key: "bookingPaybackIdState",
      get: ({ get }) => {
        const state = get(BookingHistoryAtom);

        return state.paybackId;
      },
    })
  );
  const { mutate, isLoading } = usePaybackServiceInsuranceMutation();

  const setId = useSetRecoilState(BookingHistoryAtom);

  const cancel = () => setId((v) => ({ ...v, paybackId: undefined }));

  return (
    <Modal isOpen={!!payback?.id} onClose={cancel}>
      <ModalOverlay />
      <ModalContent>
        <HStack className="w-full justify-center font-semibold text-xl min-h-[10rem]">
          <p>{t("Pay back client's assurance of")}</p>
          <PriceDisplay price={payback?.amount} /> <p>?</p>
        </HStack>
        <ModalFooter>
          <HStack className="justify-end">
            <Button loading={isLoading} onClick={cancel} colorScheme="danger">
              {t("Cancel")}
            </Button>
            <Button
              loading={isLoading}
              onClick={() => {
                if (payback?.id) {
                  mutate({ id: payback.id });
                }
              }}
            >
              {t("Confirm")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const BookingCancelationModal: React.FC = () => {
  const { t } = useTranslation();
  const id = useRecoilValue(
    selector({
      key: "bookingCancelationIdState",
      get: ({ get }) => {
        const state = get(BookingHistoryAtom);

        return state.cancelId;
      },
    })
  );

  const setId = useSetRecoilState(BookingHistoryAtom);

  const { mutate, isLoading } = useCancelAppointmentMutation();
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>(
    {
      appointmentId: id || "",
      cancelationReason: "",
    },
    { appointmentId: id || "" }
  );

  return (
    <Modal
      isOpen={!!id}
      onClose={() => setId((v) => ({ ...v, cancelId: undefined }))}
    >
      <ModalOverlay />
      <ModalContent>
        <div className="flex flex-col gap-4">
          <label>
            <p>{t("Cancelation Reason")}</p>
            <Textarea
              {...inputProps("cancelationReason")}
              className="min-h-[10rem]"
            />
          </label>
          <ModalFooter>
            <ModalCloseButton>
              <Button colorScheme="white">{t("close", "Close")}</Button>
            </ModalCloseButton>
            <Button
              loading={isLoading}
              onClick={() => {
                mutate(form);
              }}
            >
              {t("Submit")}
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};
