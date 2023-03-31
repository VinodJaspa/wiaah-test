import { Inject, NotAcceptableException, UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveReference,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_EVENTS,
  SERVICES,
  StripeService,
} from 'nest-utils';
import { AccountsService } from './accounts.service';
import { CreateAccountInput, DeleteAccountRequestInput } from '@accounts/dto';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account, Balance } from './entities';
import { PrismaService } from 'prismaService';
import { AccountDeletionRequestStatus } from '@prisma-client';
import { EventBus } from '@nestjs/cqrs';
import { AccountDeletionRequestCreatedEvent } from './events';
import * as bcrypt from 'bcrypt';
import { NewAccountCreatedEvent } from 'nest-dto';
import { Shop } from './entities/shop.extends.entity';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
    private readonly eventbus: EventBus,
    private readonly stripe: StripeService,
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
      birthDate,
      gender,
      phone,
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

    const Sacc = await this.stripe.createConnectedAccount();
    const Cacc = await this.stripe.createCustomerAccount();
    const acc = await this.prisma.account.create({
      data: {
        stripeCustomerId: Cacc.id,
        stripeId: Sacc.id,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        accountType: accountType,
        birthDate,
        gender,
        phone,
      },
    });

    this.eventsClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType),
      new NewAccountCreatedEvent({
        email: acc.email,
        id: acc.id,
        username: '',
        accountType: acc.accountType,
        firstName: acc.firstName,
        lastName: acc.lastName,
        profession: acc.profession,
        birthDate,
      }),
    );
    return true;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  @Mutation(() => Boolean)
  async requestAccountDeletion(
    @Args('args') args: DeleteAccountRequestInput,
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

  @ResolveField(() => Shop)
  shop(@Parent() acc: Account) {
    return {
      __typename: 'Shop',
      ownerId: acc.id,
    };
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }

  // @ResolveField(() => Membership)
  // membership(@Parent() acc: Account) {
  //   return {
  //     __typename: 'Membership',
  //     id: acc.membershipId,
  //   };
  // }

  @ResolveField(() => Balance)
  balance(@Parent() acc: Account) {
    return {
      __typename: 'Membership',
      ownerId: acc.id,
    };
  }
}
