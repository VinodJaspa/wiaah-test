import { Shop } from '@prisma-client';

export class ShopCreatedEvent {
  constructor(
    public readonly ownerId: string,
    public readonly shop: Shop,
  ) {}
}
