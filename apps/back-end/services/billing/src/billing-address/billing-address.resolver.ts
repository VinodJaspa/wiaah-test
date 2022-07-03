import { Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { BillingAddressService } from './billing-address.service';
import { BillingAddress, BillingAddressCollection } from '@entities';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import {
  CreateBillingAddressInput,
  DeleteBillingAddressInput,
  UpdateBillingAddressInput,
} from '@dto';

@Resolver(() => BillingAddress)
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class BillingAddressResolver {
  constructor(private readonly billingAddressService: BillingAddressService) {}

  @Query(() => BillingAddressCollection)
  getMyBillingAddressCollection(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<BillingAddressCollection> {
    return this.billingAddressService.getBillingCollectionByOwnerId(user.id);
  }

  @Mutation(() => BillingAddress)
  addNewBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: CreateBillingAddressInput,
  ): Promise<BillingAddress> {
    return this.billingAddressService.addNewBillingAddress(user.id, input);
  }

  @Mutation(() => BillingAddress)
  deleteBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: DeleteBillingAddressInput,
  ): Promise<BillingAddress> {
    return this.billingAddressService.removeBillingAddress(
      user.id,
      input.addressId,
    );
  }

  @Mutation(() => BillingAddress)
  updateBillingAddress(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    input: UpdateBillingAddressInput,
  ) {
    return this.billingAddressService.updateBillingAddress(user.id, input);
  }

  @ResolveReference()
  resloveReferance({
    __typename,
    id,
    ownerId,
  }: {
    __typename: string;
    id: string;
    ownerId: string;
  }) {
    if (!id || !ownerId) return null;
    return this.billingAddressService.getBillingAddressById(ownerId, id);
  }
}
