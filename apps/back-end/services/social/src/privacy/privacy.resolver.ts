import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { PrivacySettings } from '@privacy-settings/entities';
import { UpdateUserPrivacySettingsCommand } from '@privacy-settings/commands';
import { UpdateMyPrivacyInput } from '@privacy-settings/dto';
import { GetUserPrivacySettingsQuery } from '@privacy-settings/queries';

@Resolver(() => PrivacySettings)
export class PrivacyResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => PrivacySettings)
  updateMyPrivacySettings(
    @Args('args') input: UpdateMyPrivacyInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<UpdateUserPrivacySettingsCommand>(
      new UpdateUserPrivacySettingsCommand(input, user),
    );
  }

  @Query(() => PrivacySettings)
  getMyPrivacySettings(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.queryBus.execute<GetUserPrivacySettingsQuery>(
      new GetUserPrivacySettingsQuery(user.id),
    );
  }
}
