import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ShopElasticRepository } from '../../../repository';
import { ShopCreatedEvent } from '../impl';
import { Inject } from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES, getTranslatedResource } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { StoreType } from '@prisma-client';
import { NewShopCreatedEvent } from 'nest-dto';

@EventsHandler(ShopCreatedEvent)
export class ShopCreatedEventHandler
  implements IEventHandler<ShopCreatedEvent>
{
  constructor(
    private readonly shopElasticRepo: ShopElasticRepository,
    @Inject(SERVICES.SHOP_SERVICE.token) private kafkaClient: ClientKafka,
  ) {}

  async handle({ shop }: ShopCreatedEvent) {
    await this.shopElasticRepo.indexShopDocument(shop.id, shop.location);
    this.kafkaClient.emit(
      KAFKA_EVENTS.SHOP.newShopCreated(
        shop.storeType === StoreType.product ? 'products' : 'services',
      ),
      new NewShopCreatedEvent({
        city: shop.location.city,
        country: shop.location.country,
        shopId: shop.id,
        shopName: getTranslatedResource({ resource: shop.name, langId: 'en' }),
        state: shop.location.state,
        userId: shop.ownerId,
      }),
    );
  }
}
