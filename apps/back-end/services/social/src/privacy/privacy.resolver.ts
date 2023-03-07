import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrivacySettings } from '@privacy-settings/entities';
import { UpdateUserPrivacySettingsCommand } from '@privacy-settings/commands';
import { UpdateMyPrivacyInput } from '@privacy-settings/dto';
import { GetUserPrivacySettingsQuery } from '@privacy-settings/queries';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Resolver(() => PrivacySettings)
@UseGuards(new GqlAuthorizationGuard([]))
export class PrivacyResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => PrivacySettings)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async updateAccountPrivacySettings(
    @Args('args') input: UpdateMyPrivacyInput,
    @Args('id') id: string,
  ) {
    try {
      await this.prisma.privacySettings.update({
        where: {
          userId: id,
        },
        data: input,
      });

      return true;
    } catch {
      return false;
    }
  }

  @Query(() => PrivacySettings)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountPrivacySettings(@Args('id') id: string) {
    return this.prisma.privacySettings.findUnique({
      where: {
        userId: id,
      },
    });
  }

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
