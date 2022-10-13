import { Controller, Inject, OnModuleInit } from '@nestjs/common';
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
import {
  CreateShoppingCartEvent,
  GetShoppingCartItemsMessage,
  GetShoppingCartItemsMessageReply,
  KafkaPayload,
  NewAccountCreatedEvent,
} from 'nest-dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller()
export class ShoppingCartController implements OnModuleInit {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENT.accountCreated)
  async createShoppingCart(
    @Payload() payload: KafkaPayload<NewAccountCreatedEvent>,
  ) {
    try {
      await this.shoppingCartService.createShoppingCart(payload.value.input.id);
    } catch (err) {
      console.log('error creating shoppingcart', formatCaughtError(err));
    }
  }

  @MessagePattern(KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems)
  async getShoppingCartItems(
    @Payload() payload: KafkaPayload<GetShoppingCartItemsMessage>,
  ): Promise<GetShoppingCartItemsMessageReply> {
    try {
      const { cartItems, appliedVoucher } =
        await this.shoppingCartService.getShoppingCartByOwnerId(
          payload.value.input.ownerId,
        );

      return new GetShoppingCartItemsMessageReply({
        success: true,
        error: null,
        data: {
          items: cartItems.map(({ itemId, name, price, providerId }) => ({
            id: itemId,
            name,
            price,
            shopId: providerId,
          })),
          voucher: appliedVoucher,
        },
      });
    } catch (err) {
      return new GetShoppingCartItemsMessageReply({
        success: false,
        error: 'something went wrong',
        data: null,
      });
    }
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
    );
    await this.eventsClient.connect();
  }
}
