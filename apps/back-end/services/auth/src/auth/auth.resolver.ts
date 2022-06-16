import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Registeration } from './entities/regiseration.entity';
import { CreateRegisterationDto } from './dto/create-registartion.dto';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { KAFKA_EVENTS } from 'src/KafkaEvents';
@Resolver((of) => Registeration)
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
  ) {}

  @Mutation(() => String)
  register(@Args('RegisterInput') registerInput: CreateRegisterationDto) {
    return this.authService.register(registerInput);
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
  }
}
