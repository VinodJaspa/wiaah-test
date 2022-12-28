import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { DeclinePendingAppointmentCommand } from '@book-service/commands/impl';
import { BookedService } from '@book-service/entities';
import { BookingRepository } from '@book-service/repository';
import { ValidateIsOwnerOfBookedServiceByAppointmentIdQuery } from '@book-service/queries';
import { bookedServiceStatus } from '@book-service/const';
import { AppointmentRefusedEvent } from '@book-service/events';

@CommandHandler(DeclinePendingAppointmentCommand)
export class DeclinePendingAppointmentCommandHandler
  implements ICommandHandler<DeclinePendingAppointmentCommand>
{
  constructor(
    private readonly repo: BookingRepository,
    private readonly querybus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input,
    userId,
  }: DeclinePendingAppointmentCommand): Promise<BookedService> {
    const app = await this.querybus.execute<
      ValidateIsOwnerOfBookedServiceByAppointmentIdQuery,
      BookedService
    >(new ValidateIsOwnerOfBookedServiceByAppointmentIdQuery(input.id, userId));

    const res = await this.repo.updateStatus(
      app.id,
      bookedServiceStatus.canceled_by_seller,
      input.reason,
    );
    this.eventBus.publish(
      new AppointmentRefusedEvent({
        buyerId: res.ownerId,
        id: res.id,
        reason: res.rejectReason,
        sellerId: res.providerId,
        type: res.type,
      }),
    );

    return res;
  }
}
