import { Inject, NotAcceptableException, UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveReference,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';

import { AccountsService } from './accounts.service';
import {
  CreateAccountInput,
  GetBuyersAccountsInput,
  GetFilteredSellersAccountsInput,
} from '@accounts/dto';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities';
import { PrismaService } from 'prismaService';
import { AccountDeletionRequestStatus, AccountType } from '@prisma-client';
import { EventBus } from '@nestjs/cqrs';
import { AccountDeletionRequestCreatedEvent } from './events';
import * as bcrypt from 'bcrypt';
import { NewAccountCreatedEvent } from 'nest-dto';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
    private readonly eventbus: EventBus,
  ) {}

  @Mutation(() => String)
  async register(
    @Args('RegisterInput')
    {
      accountType,
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
    }: CreateAccountInput,
  ) {
    const emailExists = await this.prisma.account.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new NotAcceptableException('this email is already used');
    }

    if (confirmPassword !== password) {
      throw new NotAcceptableException(
        'confirm password and password fields must match',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const acc = await this.prisma.account.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        type: accountType,
      },
    });

    this.eventsClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType),
      new NewAccountCreatedEvent({
        email: acc.email,
        id: acc.id,
        username: '',
        accountType: acc.type,
        firstName: acc.firstName,
        lastName: acc.lastName,
        profession: acc.profession,
      }),
    );
    return true;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  @Mutation(() => Boolean)
  async requestAccountDeletion(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const created = await this.prisma.accountDeletionRequest.create({
      data: {
        accountId: user.id,
        status: AccountDeletionRequestStatus.pending,
      },
    });

    this.eventbus.publish(new AccountDeletionRequestCreatedEvent(created));

    return true;
  }

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  getMyAccount(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.accountsService.findOne(user.id);
  }

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  editAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.accountsService.updateProtected(input, user.id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
