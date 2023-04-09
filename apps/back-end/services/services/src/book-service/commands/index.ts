export * from './impl';
import {
  AcceptPendingAppointmentCommandHandler,
  DeclinePendingAppointmentCommandHandler,
  VerifyBookedServiceCommandHandler,
} from './handlers';

export const BookingCommandHandlers = [
  AcceptPendingAppointmentCommandHandler,
  DeclinePendingAppointmentCommandHandler,
  VerifyBookedServiceCommandHandler,
];
