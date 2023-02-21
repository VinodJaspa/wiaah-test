import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VouchersManagementService } from './vouchers-management.service';
import { Account, Voucher, VoucherCluster } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  CreateVoucherInput,
  DeactivateVoucherInput,
  DeleteVoucherInput,
  GetFilteredVouchers,
  GetVouchersInput,
} from '@dto';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';

@Resolver(() => Voucher)
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class VouchersManagementResolver {
  constructor(
    private readonly vouchersManagementService: VouchersManagementService,
    private readonly prisma: PrismaService,
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
  async deActivateVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('deActivateVoucherArgs') input: DeactivateVoucherInput,
  ): Promise<Voucher> {
    const voucher = await this.vouchersManagementService.deactivateVoucher(
      user.id,
      input.code,
    );
    console.log(voucher);
    return voucher;
  }

  @Mutation((type) => Boolean)
  async clearVouchers() {
    try {
      await this.vouchersManagementService.clear();
      return true;
    } catch {
      return false;
    }
  }

  @Query(() => [Voucher])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getFilteredVouchers(@Args('args') args: GetFilteredVouchers) {
    let filters: Prisma.VoucherWhereInput[] = [];

    if (args.currency) {
      filters.push({
        currency: args.currency,
      });
    }

    if (args.name) {
      filters.push({
        code: args.name,
      });
    }
    if (args.date) {
      const targetDate = new Date(args.date);
      filters.push({
        createdAt: {
          gte: new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate(),
          ),
        },
      });

      filters.push({
        createdAt: {
          lte: new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate() + 1,
          ),
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    return this.prisma.voucher.findMany({
      where: {},
    });
  }

  @ResolveField(() => Account)
  user(@Parent() voucher: Voucher) {
    return {
      __typename: 'Account',
      id: voucher.ownerId,
    };
  }

  // @Mutation(() => Voucher)
  // activateVoucher(
  //   @GqlCurrentUser() user: AuthorizationDecodedUser,
  //   @Args('activateVoucherArgs') input: ActivateVoucherInput,
  // ): Promise<Voucher> {
  //   return this.vouchersManagementService.activateVoucher(user.id, input.code);
  // }

  // @Query(() => [Voucher])
  // @UseGuards(GqlAuthorizationGuard)
  // getVouchersByShopId(
  //   @Args('getVouchersByShopIdArgs')
  //   { shopId, ...rest }: GetVouchersByShopIdInput,
  // ): Promise<Voucher[]> {
  //   return this.vouchersManagementService.getVouchersByShopId(shopId, rest);
  // }

  @Mutation(() => Boolean)
  deleteVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('deleteVoucherArgs') input: DeleteVoucherInput,
  ): Promise<boolean> {
    return this.vouchersManagementService.deleteVoucher(user.id, input);
  }
}
