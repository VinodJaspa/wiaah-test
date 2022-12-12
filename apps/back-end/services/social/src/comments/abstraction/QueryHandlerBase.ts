import { QueryBus } from '@nestjs/cqrs';

export class QueryHandlerBase {
  constructor(public querybus: QueryBus) {}

  async validateCommentsQuery(contentId: string, userId: string) {
    // TODO: check for block secenario
    return true;
  }
}
