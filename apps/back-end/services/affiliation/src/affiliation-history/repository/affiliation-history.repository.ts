import { CreateAffiliationPurchaseInput } from '@affiliation-history/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class AffiliationPurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllBySellerId(id: string) {
    return this.prisma.affiliationPurchase.findMany({
      where: {
        sellerId: id,
      },
    });
  }

  async create(input: CreateAffiliationPurchaseInput) {
    const res = await this.prisma.affiliationPurchase.create({
      data: {
        ...input,
      },
    });
    return res;
  }
}
