import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_MESSAGES } from 'nest-utils';
import { ShopService } from './shop.service';
import {
  GetUserShopMetaDataMessage,
  GetUserShopMetaDataMessageReply,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
  KafkaPayload,
} from 'nest-dto';

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @MessagePattern(KAFKA_MESSAGES.getUserShopId)
  async getUserStoreData(
    @Payload() payload: KafkaPayload<GetUserShopMetaDataMessage>,
  ): Promise<GetUserShopMetaDataMessageReply> {
    try {
      const shop = await this.shopService.getShopByOwnerId(
        payload.value.input.accountId,
      );
      if (!shop) {
        throw new NotFoundException('no shop with the given id was found');
      }

      return new GetUserShopMetaDataMessageReply({
        success: true,
        data: {
          shopId: shop.id,
        },
        error: null,
      });
    } catch (error) {
      return new GetUserShopMetaDataMessageReply({
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
