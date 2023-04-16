import { CreateInsuranceInput } from '@insurance/dto';
import { Injectable } from '@nestjs/common';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { ServiceInsuranceStatusEnum } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class InsuranceRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneByBookId(id: string) {
    return this.prisma.serviceInsurance.findUnique({
      where: {
        id,
      },
    });
  }

  getAllByStatus(
    pagination: GqlPaginationInput,
    status: ServiceInsuranceStatusEnum,
  ) {
    const { skip, take } = ExtractPagination(pagination);
    return this.prisma.serviceInsurance.findMany({
      where: {
        status,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createOne({ amount, buyerId, bookId, sellerId }: CreateInsuranceInput) {
    return this.prisma.serviceInsurance.create({
      data: {
        sellerId,
        amount,
        buyerId,
        bookId,
        status: 'pending',
        id: bookId,
      },
    });
  }

  updateStatus(id: string, status: ServiceInsuranceStatusEnum) {
    return this.prisma.serviceInsurance.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
