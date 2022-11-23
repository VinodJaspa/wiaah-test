import { AffiliationPost } from 'prismaClient';

export class AffiliationPostCreatedEvent {
  constructor(public readonly post: AffiliationPost) {}
}
