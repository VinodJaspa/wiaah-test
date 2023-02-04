import { Controller } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { KafkaPayload, NewAccountCreatedEvent } from 'nest-dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  createWishlist(@Payload() payload: KafkaPayload<NewAccountCreatedEvent>) {
    return this.wishlistService.createWishlist(payload.value.input.id);
  }
}
