export * from './impl';
import {
  ServiceBookedEventHandler,
  ServicePurchasedEventHandler,
} from './handlers';

export const BookingsEventHandlers = [
  ServiceBookedEventHandler,
  ServicePurchasedEventHandler,
];
