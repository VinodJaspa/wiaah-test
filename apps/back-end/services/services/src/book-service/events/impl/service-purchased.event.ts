import { BookedService } from 'prismaClient';

export class ServicePurchasedEvent {
  constructor(public readonly service: BookedService) {}
}
