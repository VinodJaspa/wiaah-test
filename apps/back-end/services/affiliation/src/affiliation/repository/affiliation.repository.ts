import { CreateAffiliationInput } from '@affiliation/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { AddToDate, ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class AffiliationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFiltered() {}

  async create(input: CreateAffiliationInput, sellerId: string) {
    const res = await this.prisma.affiliation.create({
      data: {
        ...input,
        expireAt: AddToDate(new Date(), {
          days: input.validFor,
        }),
        sellerId,
      },
    });
    return res;
  }

  async update(id: string, input: Prisma.AffiliationUpdateInput) {
    const res = await this.prisma.affiliation.update({
      where: {
        id,
      },
      data: input,
    });

    return res;
  }

  async getAllByUserId(userId: string, pagination: GqlPaginationInput) {
    const { take, skip } = ExtractPagination(pagination);
    return this.prisma.affiliation.findMany({
      where: {
        sellerId: userId,
      },
      take,
      skip,
    });
  }
  async getOneById(id: string) {
    return this.prisma.affiliation.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteOne(id: string) {
    return this.prisma.affiliation.delete({
      where: {
        id,
      },
    });
  }
}
