import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import {
  formatCaughtError,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { CreateShoppingCartEvent, KafkaPayload } from 'nest-dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller()
export class ShoppingCartController implements OnModuleInit {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
  ) {}

  @EventPattern(KAFKA_EVENTS.SHOPPING_CART_EVENTS.createShoppingCart)
  async createShoppingCart(
    @Payload() payload: KafkaPayload<CreateShoppingCartEvent>,
  ) {
    console.log('creating shopping cart', payload);
    try {
      await this.shoppingCartService.createShoppingCart(
        payload.value.input.ownerId,
      );
    } catch (err) {
      console.log('error creating shoppingcart', formatCaughtError(err));
    }
  }
  async onModuleInit() {
    this.productsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
    );
    await this.productsClient.connect();
  }
}
