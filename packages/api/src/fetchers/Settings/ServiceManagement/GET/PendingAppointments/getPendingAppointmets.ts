import { getRandomImage } from "placeholder";
import { randomNum } from "utils";

export interface PendingAppointmentData {
  appointmentId: string;
  date: string;
  from: string;
  to: string;
  customer: {
    name: string;
    photo: string;
  };
  specialRequest: string;
}

export const getPendingAppointmentsFetcher = (): PendingAppointmentData[] => {
  return [...Array(5)].map((_, i) => ({
    appointmentId: `${randomNum(15134)}`,
    customer: {
      name: "wiaah",
      photo: getRandomImage(),
    },
    date: new Date(Date.now()).toString(),
    from: new Date(Date.now()).toString(),
    to: new Date(Date.now()).toString(),
    specialRequest: "big room and 1 big bed for 2",
  }));
};
