import { bookedServiceStatus } from '@book-service/const';
import { BookedService } from '@book-service/entities';
import { BookingRepository } from '@book-service/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPendingAppointmentsQuery } from '../impl/get-pending-appointments.query';

@QueryHandler(GetPendingAppointmentsQuery)
export class GetPendingAppointmentsQueryHandler
  implements IQueryHandler<GetPendingAppointmentsQuery>
{
  constructor(private readonly repo: BookingRepository) {}

  async execute({
    sellerId,
  }: GetPendingAppointmentsQuery): Promise<BookedService[]> {
    const res = await this.repo.getAllBySellerIdAndStatus(sellerId, [
      bookedServiceStatus.pending,
    ]);

    return res;
  }
}
