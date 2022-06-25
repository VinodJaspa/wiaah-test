import {
  Controller,
  Inject,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Shop } from '@prisma-client';
import { formatCaughtError, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
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
    try {
      const shop = await this.shopService.getShopByOwnerId(payload.value.input);
      if (!shop) {
        throw new NotFoundException('no shop with the given id was found');
      }

      return new GetUserShopIdMessageReply({
        success: true,
        data: shop.id,
        error: null,
      });
    } catch (error) {
      return new GetUserShopIdMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(error),
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.isOwnerOfShop)
  async checkIsOwnerOfShop(
    @Payload() payload: { value: IsOwnerOfShopMessage },
  ): Promise<IsOwnerOfShopMessageReply> {
    try {
      const shop = await this.shopService.getShopById(
        payload.value.input.shopId,
      );
      if (!shop) {
        throw new NotFoundException('no shop with the given id was found');
      }

      if (shop.ownerId !== payload.value.input.ownerId) {
        return new IsOwnerOfShopMessageReply({
          success: true,
          data: false,
          error: null,
        });
      }

      return new IsOwnerOfShopMessageReply({
        success: true,
        data: true,
        error: null,
      });
    } catch (error) {
      return new IsOwnerOfShopMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(error),
      });
    }
  }
}
