import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetAppointmentQuery,
  ValidateIsOwnerOfBookedServiceByAppointmentIdQuery,
} from '@book-service/queries/impl';
import { BookedService } from '@book-service/entities';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@QueryHandler(ValidateIsOwnerOfBookedServiceByAppointmentIdQuery)
export class ValidateIsOwnerOfBookedServiceByAppointmentIdQueryHandler
  implements IQueryHandler<ValidateIsOwnerOfBookedServiceByAppointmentIdQuery>
{
  constructor(private readonly querybus: QueryBus) {}

  async execute({
    appointmentId,
    userId,
  }: ValidateIsOwnerOfBookedServiceByAppointmentIdQuery): Promise<any> {
    const service = await this.querybus.execute<
      GetAppointmentQuery,
      BookedService
    >(new GetAppointmentQuery(appointmentId));

    if (!service) throw new NotFoundException('appointment not found');
    if (service.providerId !== userId)
      throw new UnauthorizedException('you dont own this service');
    return service;
  }
}
