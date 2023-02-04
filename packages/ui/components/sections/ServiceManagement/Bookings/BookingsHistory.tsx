import { CancelAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
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
  useGetMyBookingsHistoryQuery,
  usePaginationControls,
  Badge,
} from "@UI";
import { useCancelAppointmentMutation } from "@src/Hooks";
import { ReturnDeclineRequestValidationSchema } from "validation";
import { bookingsHistoryCtx } from ".";
import { useTypedReactPubsub } from "@libs";
import { BookedServiceStatus } from "@features/API";

export const BookingsHistorySection: React.FC = () => {
  const { viewAppointment, shopping } = React.useContext(bookingsHistoryCtx);
  const { emit: openConfirmationModal } = useTypedReactPubsub(
    (keys) => keys.openBookConfirmationModal
  );
  const [Filter, setFilter] = React.useState<BookedServiceStatus>();
  const [q, setQ] = React.useState<string>("");
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();

  const { data, refetch } = useGetMyBookingsHistoryQuery({
    status: Filter,
    pagination,
    q,
  });

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
                    service,
                    status,
                    type,
                    checkout,
                    payment,
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
                    <Td onClick={() => viewAppointment(id)}>{id}</Td>
                    <Td onClick={() => viewAppointment(id)}>{service.title}</Td>
                    <Td onClick={() => viewAppointment(id)}>
                      <p>
                        {shopping
                          ? buyer.profile?.username
                          : seller.profile?.username}
                      </p>
                    </Td>
                    <Td onClick={() => viewAppointment(id)}>
                      {new Date(checkin).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td onClick={() => viewAppointment(id)}>
                      {new Date(checkout).toLocaleDateString("en", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Td>
                    <Td onClick={() => viewAppointment(id)}>
                      <PriceDisplay price={service.price} />
                    </Td>
                    <Td onClick={() => viewAppointment(id)}>
                      <Badge
                        cases={{
                          success: BookedServiceStatus.Completed,
                          fail: [
                            BookedServiceStatus.CanceledByBuyer,
                            BookedServiceStatus.CanceledBySeller,
                          ],
                          info: BookedServiceStatus.Continuing,
                          warning: BookedServiceStatus.Restitute,
                          off: BookedServiceStatus.Pending,
                        }}
                        value={status}
                      >
                        {status}
                      </Badge>
                    </Td>
                    <Td onClick={() => viewAppointment(id)}>{payment}</Td>
                    <Td>
                      <div className="flex w-full justify-center">
                        <EyeIcon
                          onClick={() =>
                            openConfirmationModal({
                              id: id,
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
                                appointmentId: id,
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
    </div>
  );
};
