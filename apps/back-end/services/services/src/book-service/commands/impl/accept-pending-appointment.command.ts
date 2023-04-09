export class AcceptPendingAppointmentCommand {
  constructor(
    public readonly appointmentId: string,
    public readonly userId: string,
  ) {}
}
