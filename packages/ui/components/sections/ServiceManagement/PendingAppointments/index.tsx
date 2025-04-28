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
  useResponsive,
  HStack,
  ArrowLeftAlt1Icon,
} from "@UI";
import { useTranslation } from "react-i18next";
import { PendingAppointmentData } from "api";
import { DeclinePendingAppointmentDto } from "dto";
import { Formik, Form } from "formik";
import { ReturnDeclineRequestValidationSchema } from "validation";
import { BookedServiceStatus, ServiceType } from "@features/API";
import { mapArray } from "@UI/../utils/src";
import {
  ServiceBookingCardVariant,
  ServicePendingAppointmentCard,
} from "@features/Services/components/Cards/ServicePendingAppointmentCard";
import { useRouting } from "@UI/../routing";

export interface PendingAppointmentsSectionProps {}

export const PendingAppointmentsSection: React.FC<
  PendingAppointmentsSectionProps
> = () => {
  const { isMobile } = useResponsive();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { back } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { data } = useGetMyBookingsHistoryQuery({
    status: BookedServiceStatus.Pending,
    pagination,
    q: "",
  });
  const placeholderTreatments = [
    {
      category: "Massage",
      duration: 60,
      id: "treatment1",
      price: 100,
      title: "Relaxing Full Body Massage",
      discount: 10,
    },
    {
      category: "Facial",
      duration: 45,
      id: "treatment2",
      price: 80,
      title: "Rejuvenating Facial",
      discount: 5,
    },
  ];

  return isMobile ? (
    <div className="flex flex-col gap-4 p-4">
      <HStack className="justify-center relative">
        <p className="text-lg font-semibold">{t("Pending Appointments")}</p>
        <button onClick={() => back()}>
          <ArrowLeftAlt1Icon className="absolute top-1/2 -translate-y-1/2 left-4" />
        </button>
      </HStack>

      <p className="font-medium text-center text-secondaryRed">{`(${
        data?.length
      }) ${t("Approval pending")}`}</p>

      <div className="flex flex-col gap-6 w-full p-2">
        {mapArray(data, (v, i) => (
          <ServicePendingAppointmentCard
            variant={ServiceBookingCardVariant.seller}
            shopName="Padma Resort Legian"
            amenities={[
              { slug: "wifi", label: "Free WIFI" },
              { label: "Free Movies", slug: "movies" },
            ]}
            cancelationPolicy={{
              id: "policy1",
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
        ))}
      </div>
    </div>
  ) : (
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
                    type: "hotel",
                    //@ts-ignore
                    data: {
                      title: "title",
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
                      ...(v.type === "beauty_center" && {
                        bookedTreatments: placeholderTreatments.map((t) => ({
                          category: t.category || "",
                          durationInMinutes: t.duration,
                          id: t.id,
                          price: t.price,
                          title: t.title,
                          discount: v.discount.amount,
                        })),
                      }),
                      cashback: {
                        amount: v.cashback.amount,
                        type: "cash",
                      },
                      guests: v.guests,
                      serviceType: v.type as any,
                      // title: v.service.title,
                      // doctor: {
                      //   id: v.doctor.id,
                      //   name: v.doctor.name,
                      //   photo: v.doctor.thumbnail,
                      //   price: v.doctor.price,
                      //   specialty: v.doctor.speciality?.name,
                      // },
                      duration: "",
                      // location: v.service.location,
                      id: v.id,
                      price: 44,
                      // name: v.service.title,
                      // price: v.service.price,
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
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { mutate: acceptAppointment, isLoading: acceptIsLoading } =
    useAcceptPendingAppointmentMutation();
  const { mutate: declineAppointment, isLoading: declineIsLoading } =
    useDeclinePendingAppointmentMutation();

  return (
    <div className="flex justify-between gap-2">
      <div className="w-[min(100%,20rem)]">
        <ServiceCheckoutCardSwitcher
          service={{
            type: appointmentRequestData.type === "resturant" ? "restaurant" : (appointmentRequestData.type as "holiday_rentals" | "hotel" | "health_center" | "beauty_center" | "restaurant"),
            data: appointmentRequestData.data as any, // Adjust this cast if you have a more specific type
          }}
        />
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
