import { IQuery } from '@nestjs/cqrs';

export class SearchUserQuery implements IQuery {
  constructor(query: string) {}
}
