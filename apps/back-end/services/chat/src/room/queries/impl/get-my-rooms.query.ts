import { IQuery } from '@nestjs/cqrs';

export class GetMyRoomsQuery implements IQuery {
  constructor(public userId: string) {}
}
