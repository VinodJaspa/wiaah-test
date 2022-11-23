import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product, ProductPost } from '@product-post/entities';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetUserProductPostsQuery } from '@product-post/queries';
import { GetUserProductPostsInput } from './dto';

@Resolver(() => ProductPost)
export class ProductPostResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Query(() => [ProductPost])
  getUserProductPosts(
    @Args('args') args: GetUserProductPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetUserProductPostsQuery(args.authorId, user?.id, args.pagination),
    );
  }

  @ResolveField(() => Product)
  product(@Parent() post: ProductPost) {
    return { __typename: 'Product', id: post.productId };
  }
}
