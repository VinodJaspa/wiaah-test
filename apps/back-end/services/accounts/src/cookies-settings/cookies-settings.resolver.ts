import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CookiesSetting } from './entities/cookies-setting.entity';
import { PrismaService } from 'prismaService';
import { UserCookiesSettings } from './entities/user-cookies-settings.entity';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { UpdateUserCookiesSettingsInput } from './dto';

@Resolver(() => CookiesSetting)
export class CookiesSettingsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [CookiesSetting])
  getCookiesSettings() {
    return this.prisma.cookies.findMany();
  }

  @Query(() => UserCookiesSettings)
  @UseGuards(new GqlAuthorizationGuard([]))
  getMyCookiesSettings(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.userCookiesSettings.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async updateMyCookiesSettings(
    @Args('args') args: UpdateUserCookiesSettingsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const requiredCookies = await this.prisma.cookies.findMany({
      where: {
        required: true,
      },
    });

    const userAcceptedRequired = requiredCookies.every((v) =>
      args.ids.includes(v.id),
    );

    return this.prisma.userCookiesSettings.update({
      where: {
        userId: user.id,
      },
      data: {
        acceptedCookiesIds: args.ids,
        acceptedRequired: userAcceptedRequired,
      },
    });
  }
}
