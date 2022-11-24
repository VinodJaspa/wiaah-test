import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  GqlAuthorizationGuard,
  GqlStatusResponse,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';

import {
  ChangePasswordInput,
  LoginDto,
  LoginWithOtpInput,
  VerifyEmailDto,
} from './dto';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordEmailInput } from './dto/forgotPasswordEmail.input';
import { ConfirmPasswordChangeInput } from './dto/confirmPasswordChange.input';
import { ResponseCodes } from './const';
import { ValidateLoginSecurityFeaturesQuery } from './queries';
import { AuthOtpRequestedEvent } from '@auth/events';
import { ValidateLoginOtpCommand } from './commands';

@Resolver((of) => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
    @Inject(SERVICES.AUTH_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}
  cookiesKey = this.config.get('COOKIES_KEY');

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  changePassword(@Args('changePasswordInput') input: ChangePasswordInput) {
    this.commandBus.execute;
  }

  @Mutation(() => String)
  register(@Args('RegisterInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => Boolean)
  async login(
    @Args('LoginInput') loginInput: LoginDto,
    @Context() ctx: any,
  ): Promise<GqlStatusResponse> {
    if (typeof this.cookiesKey !== 'string')
      return { success: false, code: ResponseCodes.InternalServiceError };

    const { email, accountType, id } =
      await this.authService.validateCredentials(
        loginInput.email,
        loginInput.password,
      );

    const code = await this.querybus.execute<
      ValidateLoginSecurityFeaturesQuery,
      number | null
    >(new ValidateLoginSecurityFeaturesQuery(email));

    if (code) {
      if (
        code === ResponseCodes.RequireEmailOTP ||
        code === ResponseCodes.RequireSmsOTP
      ) {
        this.eventbus.publish(new AuthOtpRequestedEvent(email, code));
      }

      return {
        success: false,
        code,
      };
    }

    const data = await this.authService.generateAccessToken(
      id,
      email,
      accountType,
    );

    if (ctx && ctx.res && ctx.res.cookie) {
      ctx.res.cookie(this.cookiesKey, data.access_token, { httpOnly: true });
    }

    return {
      success: true,
      code: ResponseCodes.TokenInjected,
    };
  }

  @Mutation(() => GqlStatusResponse)
  async verifyLoginOTP(
    @Args('args') args: LoginWithOtpInput,
    @Context() ctx: any,
  ): Promise<GqlStatusResponse> {
    if (typeof this.cookiesKey !== 'string')
      return { success: false, code: ResponseCodes.InternalServiceError };

    const isValid = await this.commandBus.execute<
      ValidateLoginOtpCommand,
      boolean
    >(new ValidateLoginOtpCommand(args.email, args.otp));

    if (!isValid) throw new BadRequestException('wrong otp');

    const {
      results: { data: user, success },
    } = await this.authService.getAccountMetaDataByEmail(args.email);
    if (!success) throw new InternalServerErrorException();

    const { accountType, email, id } = user;
    const data = await this.authService.generateAccessToken(
      id,
      email,
      accountType,
    );

    if (ctx && ctx.res && ctx.res.cookie) {
      ctx.res.cookie(this.cookiesKey, data.access_token, { httpOnly: true });
    }

    return {
      success: true,
      code: ResponseCodes.TokenInjected,
    };
  }

  @Mutation(() => Boolean)
  verifyEmail(
    @Args('EmailVerificationInput') verififactionInput: VerifyEmailDto,
  ) {
    return this.authService.verifyEmail(verififactionInput);
  }

  @Mutation(() => Boolean)
  resendRegisterationCode(@Args('email') email: string) {
    return this.authService.resendRegisterationToken(email);
  }

  @Mutation((type) => Boolean)
  async resetPassword(
    @Args('ResetPasswordArgs') inputs: ForgotPasswordEmailInput,
  ): Promise<boolean> {
    try {
      await this.authService.requestPasswordChange(inputs);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation((type) => Boolean)
  async verifyNewPassword(
    @Args('verifyNewPassword') inputs: ConfirmPasswordChangeInput,
  ): Promise<boolean> {
    try {
      await this.authService.confirmPasswordChange(inputs);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query((type) => [Registeration])
  getRegistrations() {
    return this.authService.getAll();
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountByEmail,
    );
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists,
    );
    await this.eventsClient.connect();
  }
}
