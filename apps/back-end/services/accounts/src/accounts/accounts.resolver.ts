import { BadGatewayException, Inject, UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveReference,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_EVENTS,
  NoEditPremissionPublicError,
  NoReadPremissionPublicError,
  SERVICES,
  StripeService,
  accountType,

} from 'nest-utils';
import { AccountsService } from './accounts.service';
import { CreateAccountInput, DeleteAccountRequestInput } from '@accounts/dto';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities';
import { PrismaService } from 'prismaService';
import { AccountDeletionRequestStatus } from '@prisma-client';
import { EventBus } from '@nestjs/cqrs';
import { AccountDeletionRequestCreatedEvent } from './events';
import { NewAccountCreatedEvent } from 'nest-dto';
import { Shop } from './entities/shop.extends.entity';
import {
  ConfirmPasswordDoesNotMatchException,
  EmailAlreadyExistsException,
} from './exceptions';
import { AccountCreationFailedException } from './exceptions/accountCreationFailed.exception';
import { StripeAccountCreationException } from './exceptions/stripeAccountCreation.exception';
import { FileTypeEnum, UploadService } from '@wiaah/upload';
import { Readable } from 'stream';
@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
    private readonly eventbus: EventBus,
    private readonly uploadService: UploadService,
    private readonly stripe: StripeService,
  ) { }

  @Mutation(() => String)
  async register(
    @Args('RegisterInput')
    {
      accountType,
      email,
      firstName,
      lastName,
      password,
      birthDate,
      confirmPassword,
      gender,
      phone,
      photo

    }: CreateAccountInput,
  ) {
    // Check if the email already exists in the system
    const emailExists = await this.prisma.account.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      console.log("is it ikkkk`");
      
      throw new EmailAlreadyExistsException(); // Custom exception
    }

    // Check if confirmPassword matches password
    if (confirmPassword !== password) {
      throw new ConfirmPasswordDoesNotMatchException(); // Custom exception
    }

    // Hash the password
    const hashedPassword = await this.accountsService.hashPassword(password);

    // Handle potential errors during Stripe account creation
    let Sacc, Cacc;
    try {
      Sacc = await this.stripe.createConnectedAccount(); // Create Stripe connected account
      Cacc = await this.stripe.createCustomerAccount(); // Create Stripe customer account
    } catch (error) {
      console.error("Stripe error:", error);
      // throw new StripeAccountCreationException(); // Custom exception to handle Stripe errors
    }
    // Create the account record in the database
    const createdAccount = await this.accountsService.createAccountRecord({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      birthDate: new Date(birthDate),
      accountType,
      gender,
      phone,
      stripeCustomerId: Cacc?.id,
      stripeId: Sacc?.id,
      photo
    });
    

    if (!createdAccount) {
      throw new AccountCreationFailedException(); // Handle possible failure during account creation
    }

 
    

    return true;
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

  @Query(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  getMyAccount(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.accountsService.findOne(user.id);
  }

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  async editAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.validateEditPremissions(user, input.id);
    return this.accountsService.updateProtected(input, user.id);
  }

  @Query(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getUserAccount(
    @Args('userId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.validateReadPremissions(user, id);
    return this.accountsService.findOne(id);
  }

  // @ResolveField(() => Shop, { nullable: true })
  // shop(@Parent() acc: Account) {
  //   if (!acc?.id) return null;
  //   return {
  //     __typename: 'Shop',
  //     ownerId: acc?.id,
  //   };
  // }

  @ResolveReference()
  async resolveReference(ref: {
    __typename: string;
    id: string;
  }): Promise<Account | null> {
    try {
      const res = await this.accountsService.findOne(ref.id);
      return res;
    } catch (error) {
      return null;
    }
  }

  async validateEditPremissions(
    user: AuthorizationDecodedUser,
    userId: string,
  ) {
    const valid = user.id === userId || user.accountType === accountType.ADMIN;

    if (!valid) throw new NoEditPremissionPublicError();
  }

  async validateReadPremissions(
    user: AuthorizationDecodedUser,
    userId: string,
  ) {
    const valid = user.id === userId || user.accountType === accountType.ADMIN;

    if (!valid) throw new NoReadPremissionPublicError();
  }
}
