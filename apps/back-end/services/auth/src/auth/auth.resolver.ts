import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { RegisterDto } from './dto/register.dto';
import { ExecutionContext, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { KAFKA_EVENTS } from 'src/KafkaEvents';
import { LoginDto, VerifyEmailDto } from './dto';
import { LoginResponse } from './responses/LoginResponse';
import { ConfigService } from '@nestjs/config';

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
    @Context() ctx: GraphQLExecutionContext,
  ): Promise<boolean> {
    const cookiesKey = this.config.get('COOKIES_KEY');
    if (typeof cookiesKey !== 'string') return false;

    const { access_token } = await this.authService.login(loginInput);

    //@ts-ignore
    ctx.res.cookie(cookiesKey, access_token, { httpOnly: true });

    return true;
  }

  @Mutation(() => Registeration)
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
    this.accountsClient.subscribeToResponseOf(KAFKA_EVENTS.emailExists);
    this.accountsClient.subscribeToResponseOf(KAFKA_EVENTS.getAccountByEmail);
    await this.accountsClient.connect();
  }
}
