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
import * as bcrypt from 'bcrypt';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlStatusResponse,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
  ResourceNotFoundPublicError,
  WrongInputPublicError,
} from 'nest-utils';

import {
  ChangePasswordInput,
  LoginDto,
  LoginWithOtpInput,
  RegisterDto,
  VerifyEmailDto,
} from './dto';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { ForgotPasswordEmailInput } from './dto/forgotPasswordEmail.input';
import { ConfirmPasswordChangeInput } from './dto/confirmPasswordChange.input';
import { ResponseCodes } from './const';
import { ValidateLoginSecurityFeaturesQuery } from './queries';
import { AuthOtpRequestedEvent } from '@auth/events';
import { ChangePasswordCommand, ValidateLoginOtpCommand } from './commands';
import {
  GetAdminAccountByEmailMessageReply,
  GetAdminAccountByEmailMesssage,
} from 'nest-dto';
import { LoginResponse } from './dto/login-respnose.input';

@Resolver(() => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
    @Inject(SERVICES.AUTH_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
  ) { }
  cookiesKey = this.config.get('COOKIES_KEY');

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  changePassword(
    @Args('changePasswordInput') input: ChangePasswordInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    this.commandBus.execute(new ChangePasswordCommand(input, user));
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('LoginInput') loginInput: LoginDto,
    @Context() ctx: any,
  ): Promise<LoginResponse> {
    try {
      const { email, password } = loginInput;

      // Authenticate user
      const data = await this.authService.simpleLogin({ email, password });

      // Set the JWT in an HttpOnly, Secure cookie
      ctx.res.cookie('authToken', data.accessToken, {
        secure: false, // Only secure in production
        httpOnly: true, // Prevent client-side JavaScript from accessing the token
        sameSite: 'None', // Adjust based on cross-origin requirements
        path: '/',
      });

      // Return success response without the token in the body (it's already in the cookie)
      return {
        success: true,
        code: ResponseCodes.TokenInjected,
        accessToken: data.accessToken as string,
      };
    } catch (error) {
      return {
        success: false,
        code: ResponseCodes.InternalServiceError,
        message: error.message || 'An error occurred during login',
      };
    }
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
  @UseGuards(new GqlAuthorizationGuard([]))
  verifyEmail(
    @Args('EmailVerificationInput') { verificationCode }: VerifyEmailDto,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.authService.verifyEmail({
      code: verificationCode,
      email: user.email,
    });
  }

  @Mutation(() => Boolean)
  resendRegisterationCode(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.authService.resendRegisterationToken(user.email);
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

  @Mutation(() => GqlStatusResponse)
  async adminLogin(
    @Args('args') args: LoginDto,
    @Context() ctx: any,
  ): Promise<GqlStatusResponse> {
    const acc = await KafkaMessageHandler<
      string,
      GetAdminAccountByEmailMesssage,
      GetAdminAccountByEmailMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAdminAccountByEmail,
      new GetAdminAccountByEmailMesssage({ email: args.email }),
    );

    console.log({ acc });
    if (!acc?.results?.data)
      throw new ResourceNotFoundPublicError('Account not found');

    const compere = await bcrypt.compare(
      args.password,
      acc.results.data.password,
    );

    if (!compere) throw new WrongInputPublicError('wrong password');

    const { accountType, email, id } = acc.results.data;

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
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAdminAccountByEmail,
    );
    await this.eventsClient.connect();
  }
}
