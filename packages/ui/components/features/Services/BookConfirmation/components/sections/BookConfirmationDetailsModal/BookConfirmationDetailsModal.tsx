import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import {
  useGetBookedServiceConfirmationDataQuery,
  ModalOverlay,
  ModalContent,
  Modal,
  SpinnerFallback,
  QrcodeDisplay,
  Divider,
  Button,
  ServiceReachOutSection,
  ServiceWorkingHoursSection,
  ServiceCheckoutCardSwitcher,
} from "@UI";

export const BookConfirmationDataDisplayModal: React.FC = () => {
  const { Listen } = useReactPubsub((keys) => keys.openBookConfirmationModal);
  const [id, setId] = React.useState<string>();
  const { t } = useTranslation();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetBookedServiceConfirmationDataQuery(id || "", { enabled: !!id });

  Listen((props) => {
    if ("id" in props && typeof props.id === "string") {
      setId(props.id);
    } else {
      setId(undefined);
    }
  });

  return (
    <Modal isOpen={!!id} onOpen={() => {}} onClose={() => setId(undefined)}>
      <ModalOverlay />
      <ModalContent className="w-[95%]">
        <div className="flex flex-col lg:flex-row gap-32">
          <div className="w-full">
            <div className="flex gap-4">
              {/* book qr and number  */}
              <div className="w-40">
                <SpinnerFallback isError={isError} isLoading={isLoading}>
                  {res ? <QrcodeDisplay value={res.data.bookedId} /> : null}
                </SpinnerFallback>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {t("booking_number", "Booking Number")}
                  <span className="font-bold" data-testid="BookNumber">
                    #{res ? res.data.bookedId : null}
                  </span>
                </div>
                <Divider />
                <Button outline>{t("Save the QR")}</Button>
              </div>
            </div>
            <Divider />
            <div className="flex gap-4 w-full justify-between">
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {res ? <ServiceReachOutSection {...res.data.reactOut} /> : null}
              </SpinnerFallback>
              <SpinnerFallback isError={isError} isLoading={isLoading}>
                {res ? (
                  <ServiceWorkingHoursSection
                    workingDays={res.data.workingDays}
                  />
                ) : null}
              </SpinnerFallback>
            </div>
          </div>
          <div className="text-xl w-[min(40rem,100%)] gap-2 flex flex-col">
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <ServiceCheckoutCardSwitcher service={res.data.propertyData} />
              ) : null}
            </SpinnerFallback>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
