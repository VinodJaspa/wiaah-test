import {
  Resolver,
  Query,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { RegisterDto } from './dto/register.dto';
import { ExecutionContext, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { KAFKA_EVENTS } from 'src/KafkaEvents';
import { LoginDto, VerifyEmailDto } from './dto';
import { LoginResponse } from './responses/LoginResponse';

@Resolver((of) => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
  ) {}

  @Mutation(() => String)
  register(@Args('RegisterInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('LoginInput') loginInput: LoginDto,
    @Context() ctx: ExecutionContext,
  ): Promise<LoginResponse> {
    //@ts-ignore
    ctx.res.cookie('test-cookie', 'test cookie value', { httpOnly: true });

    const { access_token } = await this.authService.login(loginInput);

    return { access_token };
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
