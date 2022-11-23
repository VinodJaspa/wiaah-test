import { Affiliation } from '@prisma-client';

export class AffiliationCreatedEvent {
  constructor(public readonly affiliation: Affiliation) {}
}
