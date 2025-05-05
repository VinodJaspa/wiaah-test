import { Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { BillingAddressService } from './billing-address.service';
import { BillingAddress } from '@entities';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  CreateBillingAddressInput,
  DeleteBillingAddressInput,
  UpdateBillingAddressInput,
} from '@dto';

@Resolver(() => BillingAddress)
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class BillingAddressResolver {
  constructor(private readonly billingAddressService: BillingAddressService) {}

  @Query(() => [BillingAddress])
  getMyBillingAddresses(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<BillingAddress[]> {
    return this.billingAddressService.getBillingAddressesByUserId(user.id);
  }

  @Mutation(() => Boolean)
  async addNewBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: CreateBillingAddressInput,
  ): Promise<boolean> {
    await this.validateRequest(user, input.id);

    try {
      await this.billingAddressService.createBillingAddress(user.id, input);

      return true;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: DeleteBillingAddressInput,
  ): Promise<boolean> {
    await this.validateRequest(user, input.addressId);

    try {
      await this.billingAddressService.removeBillingAddress(input.addressId);

      return true;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: UpdateBillingAddressInput,
  ) {
    await this.validateRequest(user, input.id);

    try {
      await this.billingAddressService.updateBillingAddress(input);

      return true;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  async validateRequest(user: AuthorizationDecodedUser, addressId: string) {
    const address =
      await this.billingAddressService.getBillingAddressById(addressId);

    if (address.userId !== user.id && user.accountType !== accountType.ADMIN)
      throw new UnauthorizedException();

    return address;
  }

  @ResolveReference()
  resloveReferance({ __typename, id }: { __typename: string; id: string }) {
    if (!id) return null;
    return this.billingAddressService.getBillingAddressById(id);
  }
}
