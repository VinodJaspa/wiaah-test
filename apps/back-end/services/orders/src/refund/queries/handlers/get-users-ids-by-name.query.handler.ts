import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';
import { GetUsersIdsByNameQuery, GetUsersIdsByNameQueryRes } from '../impl';

@QueryHandler(GetUsersIdsByNameQuery)
export class GetUsersIdsByNameQueryHandler
  implements IQueryHandler<GetUsersIdsByNameQuery>
{
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    name,
  }: GetUsersIdsByNameQuery): Promise<GetUsersIdsByNameQueryRes> {
    return [];
  }
}
