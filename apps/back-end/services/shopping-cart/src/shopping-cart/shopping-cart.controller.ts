import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_EVENTS } from 'nest-utils';
import { CreateShoppingCartEvent } from 'nest-dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller()
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @EventPattern(KAFKA_EVENTS.createShoppingCart)
  async createShoppingCart(@Payload() payload: CreateShoppingCartEvent) {
    try {
      await this.shoppingCartService.createShoppingCart(payload.input.ownerId);
    } catch (err) {
      console.log('error creating shoppingcart', formatCaughtError(err));
    }
  }
}
