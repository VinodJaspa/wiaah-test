import { bookedServiceStatus } from '@book-service/const';
import { BookedService } from '@book-service/entities';
import { ValidateIsOwnerOfBookedServiceByAppointmentIdQuery } from '@book-service/queries';
import { BookingRepository } from '@book-service/repository';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { AcceptPendingAppointmentCommand } from '../impl';

@CommandHandler(AcceptPendingAppointmentCommand)
export class AcceptPendingAppointmentCommandHandler
  implements ICommandHandler<AcceptPendingAppointmentCommand>
{
  constructor(
    private readonly repo: BookingRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    appointmentId,
    userId,
  }: AcceptPendingAppointmentCommand): Promise<BookedService> {
    const app = await this.querybus.execute<
      ValidateIsOwnerOfBookedServiceByAppointmentIdQuery,
      BookedService
    >(
      new ValidateIsOwnerOfBookedServiceByAppointmentIdQuery(
        appointmentId,
        userId,
      ),
    );

    const res = await this.repo.updateStatus(
      app.id,
      bookedServiceStatus.continuing,
    );
    return res;
  }
}
