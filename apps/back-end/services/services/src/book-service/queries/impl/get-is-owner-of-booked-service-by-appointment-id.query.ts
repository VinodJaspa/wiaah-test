export class ValidateIsOwnerOfBookedServiceByAppointmentIdQuery {
  constructor(
    public readonly appointmentId: string,
    public readonly userId: string,
  ) {}
}
