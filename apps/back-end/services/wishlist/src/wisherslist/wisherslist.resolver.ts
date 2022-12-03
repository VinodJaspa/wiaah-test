import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { WisherslistService } from './wisherslist.service';
import { Wisherslist } from './entities/wisherslist.entity';

@Resolver(() => Wisherslist)
export class WisherslistResolver {
  constructor(private readonly wisherslistService: WisherslistService) {}

  @Query(() => [Wisherslist])
  getWisherslist() {
    return this.wisherslistService.getAll();
  }
}
