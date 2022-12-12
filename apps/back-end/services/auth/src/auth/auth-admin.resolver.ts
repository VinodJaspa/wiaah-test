import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  GqlAuthorizationGuard,
  GqlStatusResponse,
} from 'nest-utils';
import { AuthService } from './auth.service';
import { ResponseCodes } from './const';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AuthAdminResolver {
  constructor(
    private readonly service: AuthService,
    private readonly config: ConfigService,
  ) {}

  cookiesKey = this.config.get('COOKIES_KEY');

  @Query(() => GqlStatusResponse)
  async loginAs(
    @Args('userId') id: string,
    @Context() ctx: any,
  ): Promise<GqlStatusResponse> {
    const { access_token } = await this.service.loginAs(id);

    if (ctx && ctx.res && ctx.res.cookie) {
      ctx.res.cookie(this.cookiesKey, access_token, { httpOnly: true });
    }

    return {
      success: true,
      code: ResponseCodes.TokenInjected,
    };
  }
}
