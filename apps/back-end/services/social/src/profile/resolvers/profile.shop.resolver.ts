import { Profile } from '@entities';
import {
  Directive,
  Field,
  ID,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "ownerId")')
export class Shop {
  @Field(() => String)
  @Directive('@external')
  ownerId: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

@Resolver(() => Shop)
export class ShopProfileResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Profile)
  sellerProfile(@Parent() shop: Shop) {
    return this.prisma.profile.findUnique({
      where: {
        ownerId: shop.ownerId,
      },
    });
  }
}
