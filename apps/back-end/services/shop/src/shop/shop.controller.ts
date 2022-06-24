import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Shop } from '@prisma-client';
import { KAFKA_MESSAGES } from 'nest-utils';
import { ShopService } from './shop.service';
import { GetUserShopDataEvent } from 'nest-dto';

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @MessagePattern(KAFKA_MESSAGES.getUserStoreData)
  async getUserStoreData(
    @Payload() payload: { value: GetUserShopDataEvent },
  ): Promise<string> {
    console.log('get shop', payload);
    const shop = await this.shopService.getShopByOwnerId(payload.value.ownerId);
    if (!shop) return null;
    return shop.id;
  }
}
