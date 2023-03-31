import { Injectable } from '@nestjs/common';
import { CreateBillingAddressInput, UpdateBillingAddressInput } from '@dto';
import { PrismaService } from 'prismaService';
import { BillingAddress, BillingAddressCollection } from '@entities';

@Injectable()
export class BillingAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getBillingAddressesByUserId(
    ownerId: string,
  ): Promise<BillingAddress[]> {
    const res = await this.prisma.billingAddress.findMany({
      where: {
        userId: ownerId,
      },
    });

    return res;
  }

  async getBillingAddressById(addressId: string): Promise<BillingAddress> {
    const res = await this.prisma.billingAddress.findUnique({
      where: {
        id: addressId,
      },
    });

    return res;
  }

  async updateBillingAddress({
    id,
    ...rest
  }: UpdateBillingAddressInput): Promise<BillingAddress> {
    const res = await this.prisma.billingAddress.update({
      where: {
        id,
      },
      data: rest,
    });

    return res;
  }

  async removeBillingAddress(addressId: string): Promise<BillingAddress> {
    const res = await this.prisma.billingAddress.delete({
      where: {
        id: addressId,
      },
    });

    return res;
  }

  async createBillingAddress(userId: string, input: CreateBillingAddressInput) {
    const res = await this.prisma.billingAddress.create({
      data: {
        userId,
        ...input,
      },
    });

    return res;
  }
}
