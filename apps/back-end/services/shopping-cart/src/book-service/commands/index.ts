export * from './impl';
import {
  AcceptPendingAppointmentCommandHandler,
  DeclinePendingAppointmentCommandHandler,
} from './handlers';

export const BookingCommandHandlers = [
  AcceptPendingAppointmentCommandHandler,
  DeclinePendingAppointmentCommandHandler,
];
