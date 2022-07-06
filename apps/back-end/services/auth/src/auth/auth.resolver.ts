import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { RegisterDto } from './dto/register.dto';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { LoginDto, VerifyEmailDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { KAFKA_EVENTS, KAFKA_MESSAGES, KAFKA_SERVICE_TOKEN } from 'nest-utils';
import { ForgotPasswordEmailInput } from './dto/forgotPasswordEmail.input';
import { ConfirmPasswordChangeInput } from './dto/confirmPasswordChange.input';
import { NoSchemaIntrospectionCustomRule } from 'graphql';

@Resolver((of) => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,

    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
    private readonly config: ConfigService,
  ) {}

  @Mutation(() => String)
  register(@Args('RegisterInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => Boolean)
  async login(
    @Args('LoginInput') loginInput: LoginDto,
    @Context() ctx: any,
  ): Promise<boolean> {
    const cookiesKey = this.config.get('COOKIES_KEY');
    if (typeof cookiesKey !== 'string') return false;

    const data = await this.authService.login(loginInput);

    if (ctx && ctx.res && ctx.res.cookie) {
      ctx.res.cookie(cookiesKey, data.access_token, { httpOnly: true });
    }

    return true;
  }

  @Mutation(() => Boolean)
  verifyEmail(
    @Args('EmailVerificationInput') verififactionInput: VerifyEmailDto,
  ) {
    return this.authService.verifyEmail(verififactionInput);
  }
  @Mutation(() => Boolean)
  removeAll() {
    return this.authService.removeAll();
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
