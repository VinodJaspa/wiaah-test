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
} from "@UI";
import { useCancelAppointmentMutation } from "@src/Hooks";
import { bookingsHistoryCtx } from ".";
import { BookedServiceStatus, CashbackType, ServiceType } from "@features/API";
import { useForm } from "@UI/../utils/src";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

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

  const [Filter, setFilter] = React.useState<BookedServiceStatus>();
  const [q, setQ] = React.useState<string>("");
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { refetch } = useGetMyBookingsHistoryQuery({
    status: Filter,
    pagination,
    q,
  });

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

  return (
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
