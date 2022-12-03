import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ShopElasticRepository } from '../../../repository';
import { ShopCreatedEvent } from '../impl';

@EventsHandler(ShopCreatedEvent)
export class ShopCreatedEventHandler
  implements IEventHandler<ShopCreatedEvent>
{
  constructor(private readonly shopElasticRepo: ShopElasticRepository) {}

  async handle({ shop }: ShopCreatedEvent) {
    await this.shopElasticRepo.indexShopDocument(shop.id, shop.location);
  }
}
