import { BookedService } from '@prisma-client';

export class ServiceBookedEvent {
  constructor(
    public readonly service: {
      id: string;
      purchaserId: string;
      type: string;
      sellerId: string;
    },
    public readonly userId: string,
  ) {}
}
