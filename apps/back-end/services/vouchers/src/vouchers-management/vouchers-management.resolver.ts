import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VouchersManagementService } from './vouchers-management.service';
import { Voucher, VoucherCluster } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  ActivateVoucherInput,
  CreateVoucherInput,
  DeactivateVoucherInput,
  GetVouchersInput,
} from '@dto';
@Resolver(() => VoucherCluster)
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class VouchersManagementResolver {
  constructor(
    private readonly vouchersManagementService: VouchersManagementService,
  ) {}

  @Query(() => [Voucher])
  getMyVouchers(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('getMyVouchersInput', { nullable: true }) input: GetVouchersInput,
  ): Promise<Voucher[]> {
    return this.vouchersManagementService.getMyVouchers(user, input);
  }

  @Mutation(() => Voucher)
  createVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('createVoucherArgs') input: CreateVoucherInput,
  ): Promise<Voucher> {
    return this.vouchersManagementService.createVoucher(user.id, input);
  }

  @Mutation(() => Voucher)
  deActivateVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('deActivateVoucherArgs') input: DeactivateVoucherInput,
  ): Promise<Voucher> {
    return this.vouchersManagementService.deactivateVoucher(
      user.id,
      input.code,
    );
  }

  @Mutation(() => Voucher)
  activateVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('activateVoucherArgs') input: ActivateVoucherInput,
  ): Promise<Voucher> {
    return this.vouchersManagementService.activateVoucher(user.id, input.code);
  }
}
