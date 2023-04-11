import { DeclineAppointmentInput } from '@book-service/dto';

export class DeclinePendingAppointmentCommand {
  constructor(
    public readonly input: DeclineAppointmentInput,
    public readonly userId: string,
  ) {}
}
