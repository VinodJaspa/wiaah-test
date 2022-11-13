import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { ChangeMyNewsletterSettingsCommand } from './commands';
import { UpdateNewsletterInput } from './dto';
import { NewsletterSettings } from './entities/newsletter.entity';

@Resolver(() => NewsletterSettings)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsletterResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  changeMyNewsletterSettings(
    @Args('args') args: UpdateNewsletterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<ChangeMyNewsletterSettingsCommand, boolean>(
      new ChangeMyNewsletterSettingsCommand(args, user),
    );
  }
}
