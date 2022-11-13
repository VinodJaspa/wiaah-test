import { IQuery } from '@nestjs/cqrs';
import { AuthorizationDecodedUser } from 'nest-utils';

export class GetUserStripeCustomerIdQuery implements IQuery {
  constructor(public readonly user: AuthorizationDecodedUser) {}
}
