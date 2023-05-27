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
@Directive('@keys(fields:"ownerId")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  ownerId: string;
}

@Resolver(() => Product)
export class ProductExtendedResolver {
  constructor(private readonly service: MembershipService) {}

  @ResolveField(() => Boolean)
  isExternalShopping(@Parent() prod: Product) {
    // TODO: compare user membership id and check if it falls under pay per click plans

    return this.service.isPayPerClick(prod.ownerId);
  }
}
