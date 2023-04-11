import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CancelServiceReservationCommand } from '@book-service/commands/impl';
import { BookedService } from '@book-service/entities';
import { BookingRepository } from '@book-service/repository';
import { GetAppointmentQuery } from '@book-service/queries';
import { bookedServiceStatus } from '@book-service/const';
import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

@CommandHandler(CancelServiceReservationCommand)
export class CancelServiceReservationCommandHandler
  implements ICommandHandler<CancelServiceReservationCommand>
{
  constructor(
    private readonly querybus: QueryBus,
    private readonly repo: BookingRepository,
  ) {}

  async execute({
    bookId,
    userId,
  }: CancelServiceReservationCommand): Promise<BookedService> {
    const reservation = await this.querybus.execute<
      GetAppointmentQuery,
      BookedService
    >(new GetAppointmentQuery(bookId));
    if (reservation.ownerId !== userId)
      throw new UnauthorizedException("you didn't book this appointment");

    if (reservation.status !== bookedServiceStatus.pending)
      throw new UnprocessableEntityException(
        'this reservation was already accepted, reach out to the service provider to ask for manaul cancelation',
      );

    const res = await this.repo.updateStatus(
      bookId,
      bookedServiceStatus.canceled_by_buyer,
    );
    return res;
  }
}
