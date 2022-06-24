import { Controller } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { WisherslistService } from 'src/wisherslist/wisherslist.service';
import { CreatWisherListPayload } from 'nest-dto';

@Controller()
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly wishersService: WisherslistService,
  ) {}

  @EventPattern(KAFKA_EVENTS.createWishlist)
  createWishlist(@Payload() payload: { value: { ownerId: string } }) {
    return this.wishlistService.createWishlist(payload.value.ownerId);
  }
}
