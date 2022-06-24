import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Shop } from '@prisma-client';
import { KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { ShopService } from './shop.service';
import {
  GetUserShopIdMessage,
  GetUserShopIdMessageReply,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
} from 'nest-dto';

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @MessagePattern(KAFKA_MESSAGES.getUserShopId)
  async getUserStoreData(
    @Payload() payload: { value: GetUserShopIdMessage },
  ): Promise<GetUserShopIdMessageReply> {
    console.log('get shop', payload);
    const shop = await this.shopService.getShopByOwnerId(payload.value.ownerId);
    if (!shop)
      return {
        shopId: null,
      };
    return {
      shopId: shop.id,
    };
  }

  @MessagePattern(KAFKA_MESSAGES.isOwnerOfShop)
  async checkIsOwnerOfShop(
    @Payload() payload: { value: IsOwnerOfShopMessage },
  ): Promise<IsOwnerOfShopMessageReply> {
    console.log('checking is owner', payload);
    const shop = await this.shopService.getShopById(payload.value.shopId);
    if (!shop)
      return {
        isOwner: false,
      };
    if (shop.ownerId !== payload.value.ownerId)
      return {
        isOwner: false,
      };

    return {
      isOwner: true,
    };
  }
}
