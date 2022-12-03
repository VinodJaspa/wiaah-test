import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { DeclinePendingAppointmentCommand } from '@book-service/commands/impl';
import { BookedService } from '@book-service/entities';
import { BookingRepository } from '@book-service/repository';
import { ValidateIsOwnerOfBookedServiceByAppointmentIdQuery } from '@book-service/queries';
import { bookedServiceStatus } from '@book-service/const';

@CommandHandler(DeclinePendingAppointmentCommand)
export class DeclinePendingAppointmentCommandHandler
  implements ICommandHandler<DeclinePendingAppointmentCommand>
{
  constructor(
    private readonly repo: BookingRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    input,
    userId,
  }: DeclinePendingAppointmentCommand): Promise<BookedService> {
    const app = await this.querybus.execute<
      ValidateIsOwnerOfBookedServiceByAppointmentIdQuery,
      BookedService
    >(new ValidateIsOwnerOfBookedServiceByAppointmentIdQuery(input.id, userId));

    return this.repo.updateStatus(
      app.id,
      bookedServiceStatus.canceled_by_seller,
      input.reason,
    );
  }
}
