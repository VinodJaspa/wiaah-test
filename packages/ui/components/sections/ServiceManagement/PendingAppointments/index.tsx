import React from "react";
import {
  useGetPendingAppointmentsQuery,
  useAcceptPendingAppointmentMutation,
  useDeclinePendingAppointmentMutation,
} from "@src/Hooks";
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
} from "@UI";
import { useTranslation } from "react-i18next";
import { PendingAppointmentData } from "api";
import { DeclinePendingAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import { ReturnDeclineRequestValidationSchema } from "validation";

export interface PendingAppointmentsSectionProps {}

export const PendingAppointmentsSection: React.FC<
  PendingAppointmentsSectionProps
> = () => {
  const { data: res } = useGetPendingAppointmentsQuery();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        sectionTitle={t("pending_appointments", "Pending Appointments")}
      />
      <div className="flex flex-col gap-8">
        {res
          ? res.data.map((appointment, i) => (
              <PendingAppointmentCard
                key={i}
                appointmentRequestData={appointment}
              />
            ))
          : null}
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
                declineAppointment(data);
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
          onClick={() =>
            acceptAppointment({ appointmentId: appointmentRequestData.data.id })
          }
        >
          {t("Approve")}
        </Button>
      </div>
    </div>
  );
};
