import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ID,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Hashtag } from './entities';
import { CreateHashtagInput } from './dto';
import { CreateHashtagCommand, DeleteHashTagCommand } from './commands';
import {
  GetAllHashtagsQuery,
  GetHashtagByIdCommand,
  GetHashtagByNameCommand,
} from './queries';

@Resolver(() => Hashtag)
export class HashtagResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Hashtag)
  createHashtag(@Args('createHashtagInput') args: CreateHashtagInput) {
    return this.commandBus.execute<CreateHashtagCommand, Hashtag>(
      new CreateHashtagCommand(args.name),
    );
  }

  @Query(() => [Hashtag])
  getHashtags(): Promise<Hashtag[]> {
    return this.queryBus.execute<GetAllHashtagsQuery, Hashtag[]>(
      new GetAllHashtagsQuery(),
    );
  }

  @Mutation(() => Hashtag)
  removeHashtag(@Args('id', { type: () => ID }) id: string) {
    return this.commandBus.execute<DeleteHashTagCommand, Hashtag>(
      new DeleteHashTagCommand(id),
    );
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
}
