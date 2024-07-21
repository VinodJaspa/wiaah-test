import { MembershipService } from '@membership/membership.service';
import {
  Directive,
  Field,
  ID,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"sellerId")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  sellerId: string;
}

@Resolver(() => Product)
export class ProductExtendedResolver {
  constructor(private readonly service: MembershipService) { }

  @ResolveField(() => Boolean)
  isExternalShopping(@Parent() prod: Product) {
    // TODO: compare user membership id and check if it falls under pay per click plans

    return this.service.isPayPerClick(prod.sellerId);
  }
}
