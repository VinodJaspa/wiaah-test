export * from './impl';
import {
  GetPendingAppointmentsQueryHandler,
  GetAppointmentQueryHandler,
  ValidateIsOwnerOfBookedServiceByAppointmentIdQueryHandler,
} from './handlers';

export const BookingQueryHandlers = [
  GetPendingAppointmentsQueryHandler,
  GetAppointmentQueryHandler,
  ValidateIsOwnerOfBookedServiceByAppointmentIdQueryHandler,
];
