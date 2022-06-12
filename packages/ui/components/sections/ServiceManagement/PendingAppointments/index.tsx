import React from "react";
import {
  useGetPendingAppointmentsQuery,
  useAcceptPendingAppointmentMutation,
  useDeclinePendingAppointmentMutation,
} from "ui/Hooks";
import {
  SectionHeader,
  Avatar,
  CalenderIcon,
  Button,
  TimeIcon,
  NoteIcon,
  HStack,
  CancelIcon,
  ControlledModal,
  FormikInput,
  ModalButton,
  ModalCloseButton,
  ModalExtendedWrapper,
  ModalFooter,
  Textarea,
} from "ui";
import { useTranslation } from "react-i18next";
import { PendingAppointmentData } from "api";
import { CancelOrderDto, DeclinePendingAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import { ReturnDeclineRequestValidationSchema } from "validation";

export interface PendingAppointmentsSectionProps {}

export const PendingAppointmentsSection: React.FC<PendingAppointmentsSectionProps> =
  () => {
    const { data: appointments } = useGetPendingAppointmentsQuery();
    const { t } = useTranslation();

    return (
      <div className="flex flex-col gap-4">
        <SectionHeader
          sectionTitle={t("pending_appointments", "Pending Appointments")}
        />
        <div className="flex flex-col gap-8">
          {appointments
            ? appointments.map((appointment, i) => (
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
}> = ({
  appointmentRequestData: {
    appointmentId,
    customer,
    date,
    from,
    specialRequest,
    to,
  },
}) => {
  const { t } = useTranslation();
  const { mutate: acceptAppointment, isLoading: acceptIsLoading } =
    useAcceptPendingAppointmentMutation();
  const { mutate: declineAppointment, isLoading: declineIsLoading } =
    useDeclinePendingAppointmentMutation();
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-2">
        <HStack className="flex gap-2">
          <Avatar
            className="w-[2em] h-[2em]"
            src={customer.photo}
            alt={customer.name}
            name={customer.name}
          />
          <span className="text-primary font-bold">{customer.name}</span>
        </HStack>
        <HStack className="flex gap-2">
          <CalenderIcon />
          {new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            weekday: "long",
            day: "2-digit",
          })}
        </HStack>
        <HStack className="flex gap-2">
          <TimeIcon />
          <span>
            {new Date(from).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          -
          <span>
            {new Date(to).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </HStack>
        <HStack>
          <NoteIcon />
          <span>{specialRequest}</span>
        </HStack>
      </div>
      <div className="flex items-center gap-2">
        <ModalExtendedWrapper>
          <ModalButton>
            <Button colorScheme="danger" loading={declineIsLoading}>
              {t("refuse", "Refuse")}
            </Button>
          </ModalButton>
          <ControlledModal>
            <Formik<DeclinePendingAppointmentDto>
              onSubmit={(data) => {
                declineAppointment(data);
              }}
              initialValues={{
                appointmentId,
                declineReason: "",
              }}
              validationSchema={ReturnDeclineRequestValidationSchema}
            >
              <Form className="flex flex-col gap-4">
                <FormikInput
                  label={t("refuse_reason", "Refuse Reason")}
                  as={Textarea}
                  className="min-h-[10rem]"
                  name="cancelationReason"
                />
                <ModalFooter>
                  <ModalCloseButton>
                    <Button colorScheme="white">{t("close", "Close")}</Button>
                  </ModalCloseButton>
                  <Button loading={declineIsLoading} type="submit">
                    {t("submit", "Submit")}
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ControlledModal>
        </ModalExtendedWrapper>

        <Button
          loading={acceptIsLoading}
          onClick={() => acceptAppointment({ appointmentId })}
        >
          {t("approve", "Approve")}
        </Button>
      </div>
    </div>
  );
};
