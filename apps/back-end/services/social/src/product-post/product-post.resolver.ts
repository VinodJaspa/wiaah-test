import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductPost } from './entities/product-post.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  GqlPaginationInput,
} from 'nest-utils';
import { GetUserProductPostsQuery } from './queries';
import { CreateProductPostInput, GetUserProductPostsInput } from './dto';
import { CreateProductPostCommand } from './commands';

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

  @Mutation(() => Boolean)
  async createProductPost(
    @Args('args') args: CreateProductPostInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(new CreateProductPostCommand(args, user.id));
    return true;
  }
}
