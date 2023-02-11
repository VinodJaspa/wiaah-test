import { MarketingTag, Product } from '@entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MarketingTagType } from 'prismaClient';
import { Service } from '../service-post/entities/service-post.entity';

@Resolver(() => MarketingTag)
export class MarketingTagResolver {
  @ResolveField(() => Product)
  product(@Parent() tag: MarketingTag) {
    if (tag.type === MarketingTagType.product) {
      return {
        __typename: 'Product',
        id: tag.id,
      };
    }
    return null;
  }

  @ResolveField(() => Service)
  service(@Parent() tag: MarketingTag) {
    if (tag.type === MarketingTagType.service) {
      return {
        __typename: 'Service',
        id: tag.id,
      };
    }

    return null;
  }
}
