import { BookedService } from '@book-service/entities';
import { BookingRepository } from '@book-service/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAppointmentQuery } from '../impl';

@QueryHandler(GetAppointmentQuery)
export class GetAppointmentQueryHandler
  implements IQueryHandler<GetAppointmentQuery>
{
  constructor(private readonly repo: BookingRepository) {}

  async execute({ id }: GetAppointmentQuery): Promise<BookedService> {
    const res = await this.repo.getOneById(id);
    return res;
  }
}
