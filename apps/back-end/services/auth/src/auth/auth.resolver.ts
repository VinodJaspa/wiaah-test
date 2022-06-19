import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { RegisterDto } from './dto/register.dto';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { LoginDto, VerifyEmailDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { KAFKA_MESSAGES } from 'nest-utils';

@Resolver((of) => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
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

  @Query((type) => [Registeration])
  getRegistrations() {
    return this.authService.getAll();
  }

  async onModuleInit() {
    this.accountsClient.subscribeToResponseOf(KAFKA_MESSAGES.emailExists);
    this.accountsClient.subscribeToResponseOf(KAFKA_MESSAGES.getAccountByEmail);
    await this.accountsClient.connect();
  }
}
