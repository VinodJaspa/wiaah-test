import React from "react";
import { Event } from "ui";
import {
  ServiceBookingCalander,
  Modal,
  ModalContent,
  ModalOverlay,
  DateInput,
  StepperFormController,
  StepperFormHandler,
  DateInputProps,
  Button,
} from "ui";
import { useServiceBookedRange, useServiceBookingModal } from "state";
import * as yup from "yup";
import { DateRange } from "types";
import { useTranslation } from "react-i18next";

export interface BookingEventProps {
  onSuccess?: (event: Event) => void;
}
export interface BookingEventRefProps {
  openServiceBooking: () => void;
  closeServiceBooking: () => void;
}

export const BookingEventPopup: React.FC<BookingEventProps> = ({
  onSuccess,
}) => {
  const { modalState, closeBooking } = useServiceBookingModal();
  const { SetRange } = useServiceBookedRange();

  function handleCloseBooking() {
    closeBooking();
  }

  function handleOpenBooking() {}

  function handleSuccess(event: Event) {
    if (!onSuccess) return;
    onSuccess(event);
  }

  return (
    <Modal
      isLazy
      isOpen={!!modalState}
      onClose={handleCloseBooking}
      onOpen={handleOpenBooking}
    >
      <ModalOverlay />
      <ModalContent className="w-[fit-content]">
        {modalState === "event" ? (
          <ServiceBookingCalander
            month={{
              name: "October",
              number: 11,
              daysNum: 31,
              firstDayName: "Fr",
              year: 2022,
              lastMonthDaysNum: 30,
              events: [
                {
                  id: "1",
                  name: "event 1 ",
                  day: 5,
                  availablity: true,
                  from: "October 5, 2022 11:00:00",
                  to: "October 5, 2022 11:40:00",
                },
                {
                  id: "2",
                  name: "event 2 ",
                  day: 5,
                  availablity: true,
                  from: "October 5, 2022 12:20:00",
                  to: "October 5, 2022 12:50:00",
                },
                {
                  id: "3",
                  name: "event 3 ",
                  day: 9,
                  availablity: true,
                  from: "October 9, 2022 10:00:00",
                  to: "October 9, 2022 10:40:00",
                },
              ],
            }}
            onClose={() => handleCloseBooking()}
            onSuccess={(event: Event) => handleSuccess(event)}
          />
        ) : modalState === "rent" ? (
          <BookingServiceDateRangeStepper
            onSuccess={(range) => {
              SetRange(range);
              handleCloseBooking();
            }}
          />
        ) : null}
      </ModalContent>
    </Modal>
  );
};

export interface BookingServiceDateRangeStepperProps {
  onSuccess?(date: DateRange): any;
}

const checkinValidationSchema = yup.object().shape({
  from: yup.date().required(),
});
const checkoutValidationSchema = yup.object().shape({
  to: yup.date().required(),
});

export const BookingServiceDateRangeStepper: React.FC<BookingServiceDateRangeStepperProps> =
  ({ onSuccess }) => {
    const { t } = useTranslation();
    return (
      <StepperFormController<DateRange>
        stepsNum={2}
        onFormComplete={(data) => {
          onSuccess && onSuccess(data);
        }}
      >
        {({
          currentStepIdx,
          goToStep,
          nextStep,
          prevoiusStep,
          isFirstStep,
          isLastStep,
        }) => {
          return (
            <div className="w-full flex flex-col gap-2  justify-center">
              {currentStepIdx === 0 ? (
                <StepperFormHandler
                  handlerKey="check-in"
                  validationSchema={checkinValidationSchema}
                >
                  {({ validate }) => (
                    <div className="flex flex-col gap-2 w-full items-center">
                      <p className="font-bold">{t("Check-in")}</p>
                      <CheckinDateInput
                        className="w-[100%]"
                        onDaySelect={(date) =>
                          validate({ from: new Date(date) })
                        }
                      />
                    </div>
                  )}
                </StepperFormHandler>
              ) : currentStepIdx === 1 ? (
                <StepperFormHandler
                  handlerKey="check-out"
                  validationSchema={checkoutValidationSchema}
                >
                  {({ validate }) => (
                    <div className="flex flex-col gap-2 w-full items-center">
                      <p className="font-bold">{t("Check-out")}</p>
                      <CheckoutDateInput
                        className="w-[100%]"
                        style={{ widows: "100%" }}
                        onDaySelect={(date) => validate({ to: new Date(date) })}
                      />
                    </div>
                  )}
                </StepperFormHandler>
              ) : null}
              <div className="flex items-center gap-2 justify-between">
                <Button onClick={prevoiusStep} disabled={isFirstStep}>
                  {t("previous")}
                </Button>
                <Button onClick={nextStep}>
                  {isLastStep ? t("Finish") : t("Next")}
                </Button>
              </div>
            </div>
          );
        }}
      </StepperFormController>
    );
  };

export const CheckinDateInput: React.FC<DateInputProps> = (props) => {
  return <DateInput {...props} />;
};
export const CheckoutDateInput: React.FC<DateInputProps> = (props) => {
  return <DateInput {...props} />;
};
