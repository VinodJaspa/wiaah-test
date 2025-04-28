import { Controller, Inject, NotFoundException } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  formatCaughtError,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ShopService } from './shop.service';
import {
  GetUserShopMetaDataMessage,
  GetUserShopMetaDataMessageReply,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
  KafkaPayload,
  LookForNearShopsPromotionsEvent,
  ShopNearPromotionsResolvedEvent,
} from 'nest-dto';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetHeighestDiscountProductInShopQuery,
  GetHeighstDiscountProductInShopQueryRes,
} from './queries';
import { Shop } from '@prisma-client';

@Controller()
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    @Inject(SERVICES.SHOP_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
  ) {}

  @MessagePattern(KAFKA_MESSAGES.getUserShopId)
  async getUserStoreData(
    @Payload() payload: KafkaPayload<GetUserShopMetaDataMessage>,
  ): Promise<GetUserShopMetaDataMessageReply> {
    try {
      const shop = await this.shopService.getShopByOwnerId(
        payload.value.input.accountId,
        'en',
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
    } catch (error: any) {
      return new GetUserShopMetaDataMessageReply({
        success: false,
        data: null,
        error: {
          ...error,
          message: formatCaughtError(error),
        },
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
        'en',
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
    } catch (error: any) {
      return new IsOwnerOfShopMessageReply({
        success: false,
        data: null,
        error: {
          ...error,
          message: formatCaughtError(error),
        },
      });
    }
  }

  @EventPattern(
    KAFKA_EVENTS.PROMOTION_EVENTS.lookForNearShopsPromotions('*', true),
  )
  async handleCurrentLocationChanged(
    @Payload() { value }: { value: LookForNearShopsPromotionsEvent },
  ) {
    const { lat, lon, userId } = value.input;

    const shops = await this.shopService.getNearShops(
      {
        distance: 50,
        lat,
        lon,
      },
      value.input.userlang,
    );

    if (shops.length < 1) return false;

    const getProducts = Promise.all(
      shops.map((v) =>
        this.querybus.execute<
          GetHeighestDiscountProductInShopQuery,
          GetHeighstDiscountProductInShopQueryRes
        >(new GetHeighestDiscountProductInShopQuery(v.id)),
      ),
    );

    const products = await getProducts;

    const mergedProdsAndShops: (GetHeighstDiscountProductInShopQueryRes &
      Shop)[] = products.reduce((acc, curr) => {
      if (!curr) return acc;

      const shop = shops.find((s) => s.id === curr.shopId);
      if (!shop) return acc;

      const mergeCurr = { ...curr, ...shop };

      return [...acc, mergeCurr];
    }, []);

    this.eventClient.emit(
      KAFKA_EVENTS.PROMOTION_EVENTS.nearUserShopsPromotionsResloved(),
      new ShopNearPromotionsResolvedEvent({
        userId,
        shops: mergedProdsAndShops.map((v: any) => ({
          id: v.id,
          promotions: {
            top: {
              amount: v.percent,
            },
          },
          sellerId: v.ownerId,
        })),
      }),
    );
  }
}
