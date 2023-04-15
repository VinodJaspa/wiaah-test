import React from "react";
import {
  SectionHeader,
  Button,
  ControlledModal,
  FormikInput,
  ModalButton,
  ModalCloseButton,
  ModalExtendedWrapper,
  ModalFooter,
  Textarea,
  ServiceCheckoutCardSwitcher,
  useGetMyBookingsHistoryQuery,
  usePaginationControls,
  ScrollPaginationWrapper,
  useAcceptPendingAppointmentMutation,
  useDeclinePendingAppointmentMutation,
} from "@UI";
import { useTranslation } from "react-i18next";
import { PendingAppointmentData } from "api";
import { DeclinePendingAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import { ReturnDeclineRequestValidationSchema } from "validation";
import { BookedServiceStatus } from "@features/API";

export interface PendingAppointmentsSectionProps {}

export const PendingAppointmentsSection: React.FC<
  PendingAppointmentsSectionProps
> = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { data } = useGetMyBookingsHistoryQuery({
    status: BookedServiceStatus.Pending,
    pagination,
    q: "",
  });

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        sectionTitle={t("pending_appointments", "Pending Appointments")}
      />
      <div className="flex flex-col gap-8">
        <ScrollPaginationWrapper controls={controls}>
          {data
            ? data.map((v, i) => (
                <PendingAppointmentCard
                  key={i}
                  appointmentRequestData={{
                    type: v.type,
                    data: {
                      type: v.type,
                      thumbnail:
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
                      rate: 4,
                      rateReason: "customer service",
                      refundingRule: {
                        cost: 15,
                        duration: 5,
                        id: "",
                      },
                      reviews: 46,
                      bookedDates: {
                        from: v.checkin,
                        to: v.checkout,
                      },
                      bookedMenus: v.dishs.map((d) => ({
                        price: d.price,
                        qty: 1,
                        title: d.name,
                      })),
                      bookedTreatments: v.treatments.map((t) => ({
                        category: t.category?.title || "",
                        durationInMinutes: t.duration,
                        id: t.id,
                        price: t.price,
                        title: t.title,
                        discount: v.discount.amount,
                      })),
                      cashback: {
                        amount: v.cashback.amount,
                        type: "cash",
                      },
                      guests: v.guests,
                      discount: v.discount.amount,
                      serviceType: v.type as any,
                      title: v.service.title,
                      doctor: {
                        id: v.doctor.id,
                        name: v.doctor.name,
                        photo: v.doctor.thumbnail,
                        price: v.doctor.price,
                        specialty: v.doctor.speciality?.name,
                      },
                      description: "",
                      duration: "",
                      extras: [],
                      location: v.service.location,
                      id: v.id,
                      name: v.service.title,
                      price: v.service.price,
                    },
                  }}
                />
              ))
            : null}
        </ScrollPaginationWrapper>
      </div>
    </div>
  );
};

export const PendingAppointmentCard: React.FC<{
  appointmentRequestData: PendingAppointmentData;
}> = ({ appointmentRequestData }) => {
  const { t } = useTranslation();
  const { mutate: acceptAppointment, isLoading: acceptIsLoading } =
    useAcceptPendingAppointmentMutation();
  const { mutate: declineAppointment, isLoading: declineIsLoading } =
    useDeclinePendingAppointmentMutation();

  return (
    <div className="flex justify-between gap-2">
      <div className="w-[min(100%,20rem)]">
        <ServiceCheckoutCardSwitcher service={appointmentRequestData} />
      </div>
      <div className="flex gap-2 items-start">
        <ModalExtendedWrapper>
          <ModalButton>
            <Button colorScheme="danger" loading={declineIsLoading}>
              {t("Refuse")}
            </Button>
          </ModalButton>
          <ControlledModal>
            <Formik<DeclinePendingAppointmentDto>
              onSubmit={(data) => {
                declineAppointment({
                  id: data.appointmentId,
                  reason: data.declineReason,
                });
              }}
              initialValues={{
                appointmentId: appointmentRequestData.data.id,
                declineReason: "",
              }}
              validationSchema={ReturnDeclineRequestValidationSchema}
            >
              <Form className="flex flex-col gap-4">
                <FormikInput
                  label={t("Refuse Reason")}
                  as={Textarea}
                  className="min-h-[10rem]"
                  name="cancelationReason"
                />
                <ModalFooter>
                  <ModalCloseButton>
                    <Button colorScheme="white">{t("Close")}</Button>
                  </ModalCloseButton>
                  <Button loading={declineIsLoading} type="submit">
                    {t("Submit")}
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ControlledModal>
        </ModalExtendedWrapper>

        <Button
          loading={acceptIsLoading}
          onClick={() => acceptAppointment(appointmentRequestData.data.id)}
        >
          {t("Approve")}
        </Button>
      </div>
    </div>
  );
};
