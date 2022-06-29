import { Controller } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { WisherslistService } from 'src/wisherslist/wisherslist.service';
import {
  CreatWisherListPayload,
  KafkaPayload,
  NewAccountCreatedEvent,
} from 'nest-dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENT.accountCreated)
  createWishlist(@Payload() payload: KafkaPayload<NewAccountCreatedEvent>) {
    return this.wishlistService.createWishlist(payload.value.input.id);
  }
}
