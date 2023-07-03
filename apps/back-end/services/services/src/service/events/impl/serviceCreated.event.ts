import { AuthorizationDecodedUser } from 'nest-utils';
import { Service } from 'prismaClient';

export class ServiceCreatedEvent {
  constructor(public service: Service, public user: AuthorizationDecodedUser) {}
}
