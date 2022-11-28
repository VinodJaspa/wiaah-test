import { BookedService } from '@prisma-client';

export class ServicePurchasedEvent {
  constructor(public readonly service: BookedService) {}
}
