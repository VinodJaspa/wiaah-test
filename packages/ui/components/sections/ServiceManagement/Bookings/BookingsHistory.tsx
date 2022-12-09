import { CancelAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import { usePagination } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { FormOptionType, OrdersFilter, TranslationTextType } from "types";
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
  OrderStatusDisplay,
  PriceDisplay,
  SearchIcon,
  Button,
  ControlledModal,
  FormikInput,
  ModalButton,
  ModalCloseButton,
  ModalExtendedWrapper,
  ModalFooter,
  Textarea,
  CancelIcon,
  Avatar,
  SectionHeader,
  EyeIcon,
  CashPaymentIcon,
} from "ui";
import {
  useGetBookingsHistoryQuery,
  useCancelAppointmentMutation,
} from "@src/Hooks";
import { ReturnDeclineRequestValidationSchema } from "validation";
import { bookingsHistoryCtx } from ".";
import { useTypedReactPubsub } from "@libs";

export const BookingsHistorySection: React.FC = () => {
  const { viewAppointment, shopping } = React.useContext(bookingsHistoryCtx);
  const { emit: openConfirmationModal } = useTypedReactPubsub(
    (keys) => keys.openBookConfirmationModal
  );
  const [Filter, setFilter] = React.useState<OrdersFilter>("all");
  const { t } = useTranslation();
  const { page, take } = usePagination(10);
  const { data, refetch } = useGetBookingsHistoryQuery({
    page,
    limit: 10,
    filter: Filter,
  });
  console.log(data);

  React.useEffect(() => {
    refetch();
  }, [Filter]);

  const {
    mutate: cancelAppointment,
    isLoading: appointmentCancelationLoading,
  } = useCancelAppointmentMutation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Bookings")} />
      <Tabs>
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
        {appointmentsTabs.map(({ tabName, filter }, i) => (
          <>
            <TabTitle TabKey={i}>
              {({ currentTabIdx }) => {
                setFilter(appointmentsTabs[currentTabIdx].filter);
                return (
                  <TranslationText
                    className={`${
                      appointmentsTabs[currentTabIdx].filter === filter
                        ? "text-primary border-b-2 border-primary"
                        : ""
                    } text-xs sm:text-sm md:text-base whitespace-nowrap`}
                    translationObject={tabName}
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
            <Th>{shopping ? t("Seller") : t("Customer")}</Th>
            <Th>{t("Appointment ID")}</Th>
            <Th>{t("Service")}</Th>
            <Th>{t("From")}</Th>
            <Th>{t("To")}</Th>
            <Th>{t("Service Price")}</Th>
            <Th>{t("Service Status")}</Th>
            <Th>{t("Payment")}</Th>
            <Th>{t("View")}</Th>
            {shopping ? <Th>{t("Action")}</Th> : <Th>{t("Payback")}</Th>}
          </Tr>
          <TBody>
            {data &&
              data.data &&
              data.data.map(
                (
                  {
                    customer,
                    appointmentId,
                    from,
                    service,
                    servicePrice,
                    serviceStatus,
                    to,
                    payment,
                  },
                  i
                ) => (
                  <Tr className="cursor-pointer" key={i}>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          className=""
                          name={customer.name.fullName}
                          src={customer.photo}
                          alt={`${customer.name.fullName}`}
                        />
                        <span>{customer.name.fullName}</span>
                      </div>
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      {appointmentId}
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      {service}
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      {new Date(from).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      {new Date(to).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      <PriceDisplay priceObject={servicePrice} />
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      <OrderStatusDisplay
                        className="w-fit capitalize mx-auto"
                        status={serviceStatus}
                      />
                    </Td>
                    <Td onClick={() => viewAppointment(appointmentId)}>
                      {payment}
                    </Td>
                    <Td>
                      <div className="flex w-full justify-center">
                        <EyeIcon
                          onClick={() =>
                            openConfirmationModal({
                              id: appointmentId,
                            })
                          }
                        />
                      </div>
                    </Td>
                    {shopping ? (
                      <Td>
                        <ModalExtendedWrapper>
                          <ModalButton>
                            <div className="w-full flex justify-center">
                              <CancelIcon className="mx-auto" />
                            </div>
                          </ModalButton>
                          <ControlledModal>
                            <Formik<CancelAppointmentDto>
                              onSubmit={(data) => {
                                cancelAppointment(data);
                              }}
                              initialValues={{
                                appointmentId,
                                cancelationReason: "",
                              }}
                              validationSchema={
                                ReturnDeclineRequestValidationSchema
                              }
                            >
                              <Form className="flex flex-col gap-4">
                                <FormikInput
                                  label={t(
                                    "cancelation_reason",
                                    "Cancelation Reason"
                                  )}
                                  as={Textarea}
                                  className="min-h-[10rem]"
                                  name="cancelationReason"
                                />
                                <ModalFooter>
                                  <ModalCloseButton>
                                    <Button colorScheme="white">
                                      {t("close", "Close")}
                                    </Button>
                                  </ModalCloseButton>
                                  <Button
                                    loading={appointmentCancelationLoading}
                                    type="submit"
                                  >
                                    {t("submit", "Submit")}
                                  </Button>
                                </ModalFooter>
                              </Form>
                            </Formik>
                          </ControlledModal>
                        </ModalExtendedWrapper>
                      </Td>
                    ) : (
                      <Td>
                        <div className="flex w-full justify-center">
                          <CashPaymentIcon />
                        </div>
                      </Td>
                    )}
                  </Tr>
                )
              )}
          </TBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const appointmentsTabs: {
  tabName: TranslationTextType;
  filter: OrdersFilter;
}[] = [
  {
    tabName: {
      translationKey: "all_appointments",
      fallbackText: "All Appointments",
    },
    filter: "all",
  },
  {
    tabName: {
      translationKey: "completed",
      fallbackText: "Completed",
    },
    filter: "completed",
  },
  {
    tabName: {
      translationKey: "continuing",
      fallbackText: "Continuing",
    },
    filter: "continuing",
  },
  {
    tabName: {
      translationKey: "restitute",
      fallbackText: "Restitute",
    },
    filter: "restitue",
  },
  {
    tabName: {
      translationKey: "canceled",
      fallbackText: "Canceled",
    },
    filter: "canceled",
  },
];

const statusOptions: FormOptionType[] = [
  {
    name: {
      translationKey: "active",
      fallbackText: "Active",
    },
    value: "active",
  },
  {
    name: {
      translationKey: "pending",
      fallbackText: "Pending",
    },
    value: "pending",
  },
];
