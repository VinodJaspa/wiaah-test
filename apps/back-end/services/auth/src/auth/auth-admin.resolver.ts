import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => GqlStatusResponse)
  async loginAs(
    @Args('userId') id: string,
    @Context() ctx: any,
  ): Promise<GqlStatusResponse> {
    const res = await this.service.loginAs(id);

    if (ctx && ctx.res && ctx.res.cookie && res?.access_token) {
      ctx.res.cookie(this.cookiesKey, res.access_token, { httpOnly: true });
    }

    return {
      success: true,
      code: ResponseCodes.TokenInjected,
    };
  }
}
