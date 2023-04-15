import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';

import { Account, Hashtag } from './entities';
import { GetAddableHashtagsInput, GetTopHashtagsInput } from './dto';
import {
  GetAllHashtagsQuery,
  GetHashtagByIdCommand,
  GetHashtagByNameCommand,
} from './queries';
import { PrismaService } from 'prismaService';
import { ExtractPagination } from 'nest-utils';
import { UpdateHashtagInput } from './dto/update-hashtag.input';

@Resolver(() => Hashtag)
export class HashtagResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  // @Mutation(() => Hashtag)
  // createHashtag(@Args('createHashtagInput') args: CreateHashtagInput) {
  //   return this.commandBus.execute<CreateHashtagCommand, Hashtag>(
  //     new CreateHashtagCommand(args.name),
  //   );
  // }

  // @Mutation(() => Hashtag)
  // removeHashtag(@Args('id', { type: () => ID }) id: string) {
  //   return this.commandBus.execute<DeleteHashTagCommand, Hashtag>(
  //     new DeleteHashTagCommand(id),
  //   );
  // }

  @Query(() => [Hashtag])
  getTopHashtags(@Args('args') args: GetTopHashtagsInput): Promise<Hashtag[]> {
    return this.queryBus.execute<GetAllHashtagsQuery, Hashtag[]>(
      new GetAllHashtagsQuery(args),
    );
  }

  @Query(() => [Hashtag])
  async getAddableHashtags(
    @Args('args') args: GetAddableHashtagsInput,
  ): Promise<Hashtag[]> {
    const { take, cursor } = args.pagination;

    const res = await this.prisma.hashtag.findMany({
      where: {
        status: 'active',
        tag: args.q
          ? {
              contains: args.q,
            }
          : null,
      },
      take,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });

    return res;
  }

  @Mutation(() => Hashtag)
  async updateHashtag(@Args('args') args: UpdateHashtagInput) {
    const res = await this.prisma.hashtag.update({
      where: {
        tag: args.tag,
      },
      data: {
        status: args.status,
      },
    });

    return res;
  }

  @ResolveReference()
  resloveRef(ref: { __typename: string; id: string; name: string }) {
    if (ref.id) {
      return this.queryBus.execute<GetHashtagByIdCommand, Hashtag[]>(
        new GetHashtagByIdCommand(ref.id),
      );
    }
    if (ref.name) {
      return this.queryBus.execute<GetHashtagByNameCommand, Hashtag[]>(
        new GetHashtagByNameCommand(ref.name),
      );
    }
  }

  @ResolveField(() => Account)
  createdBy(@Parent() tag: Hashtag) {
    return {
      __typename: 'Account',
      id: tag.createdById,
    };
  }
}
