import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { HiddenContent } from '@hidden-content/entities';
import { HideContentCommand } from '@hidden-content/commands';
import { HideContentInput } from '@hidden-content/dto';

@Resolver(() => HiddenContent)
export class HiddenContentResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Mutation(() => Boolean)
  async hideContent(
    @Args('args') args: HideContentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(new HideContentCommand(args, user.id));
    return true;
  }
}
