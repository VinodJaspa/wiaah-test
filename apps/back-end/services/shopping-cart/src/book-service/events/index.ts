export * from './impl';
import {
  ServiceBookedEventHandler,
  ServicePurchasedEventHandler,
  AppointmentRefusedEventHandler,
} from './handlers';

export const BookingsEventHandlers = [
  ServiceBookedEventHandler,
  ServicePurchasedEventHandler,
  AppointmentRefusedEventHandler,
];
