export class AppointmentRefusedEvent {
  constructor(
    public input: {
      id: string;
      reason: string;
      sellerId: string;
      buyerId: string;
      type: string;
    },
  ) {}
}
