export class CancelServiceReservationCommand {
  constructor(public readonly bookId: string, public readonly userId: string) {}
}
