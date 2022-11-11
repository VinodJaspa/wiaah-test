import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserStripeCustomerIdQuery } from '../impl';

@QueryHandler(GetUserStripeCustomerIdQuery)
export class GetUserStripeCustomerIdQueryHandler
  implements IQueryHandler<GetUserStripeCustomerIdQuery>
{
  constructor() {}

  async execute({ user }: GetUserStripeCustomerIdQuery): Promise<string> {
    return user.stripeId;
  }
}
