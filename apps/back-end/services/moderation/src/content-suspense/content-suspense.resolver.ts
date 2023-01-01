import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuspenseContentInput } from '@content-suspense/dto';
import { SuspenseContentCommand } from './commands/impl';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ContentSuspenseResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Mutation(() => Boolean)
  suspenseContent(
    @Args('suspenseContentArgs') args: SuspenseContentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    this.commandbus.execute(new SuspenseContentCommand(args, user.id));
  }
}
