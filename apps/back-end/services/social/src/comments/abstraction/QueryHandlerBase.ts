import { QueryBus } from '@nestjs/cqrs';

export class QueryHandlerBase {
  querybus: QueryBus;
  constructor(querybus: QueryBus) {
    this.querybus = querybus;
  }

  async validateCommentsQuery(contentId: string, userId: string) {
    // TODO: check for block secenario
    return true;
  }
}
