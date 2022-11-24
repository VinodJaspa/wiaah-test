import { CreateActionInput } from '@action/dto';
import { Injectable } from '@nestjs/common';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class ActionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateActionInput, userId: string) {
    return this.prisma.action.create({
      data: {
        ...input,
        userId,
      },
    });
  }

  getAllByUserId(userId: string, pagination: GqlPaginationInput) {
    const { take, skip } = ExtractPagination(pagination);
    return this.prisma.action.findMany({
      where: {
        userId,
      },
      take,
      skip,
    });
  }

  getOneById(id: string) {
    return this.prisma.action.findUnique({
      where: {
        id,
      },
    });
  }

  updateReactionCount(id: string, count: number, decrease: boolean = false) {
    return this.prisma.action.update({
      where: {
        id,
      },
      data: {
        reactionNum: decrease ? { decrement: count } : { increment: count },
      },
    });
  }

  updateCommentsCount(id: string, count: number, decrease: boolean = false) {
    return this.prisma.action.update({
      where: {
        id,
      },
      data: {
        comments: decrease ? { decrement: count } : { increment: count },
      },
    });
  }
}
