import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { AdminGetProfessionInput } from './dto/admin-get-professions.input';
import { CreateProfessionInput } from './dto/create-profession.input';
import { UpdateProfessionInput } from './dto/update-profession.input';
import { Profession } from './entities/profession.entity';

@Resolver(() => Profession)
export class ProfessionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Profession])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetProfessions(@Args('args') args: AdminGetProfessionInput) {
    let filters: Prisma.ProfessionWhereInput[] = [];

    if (args.name) {
      filters.push({
        title: args.name,
      });
    }

    if (args.accounts) {
      filters.push({
        usage: args.accounts,
      });
    }

    return this.prisma.profession.findMany({
      where: {
        AND: filters,
      },
      orderBy: {
        sortOrder: 'desc',
      },
    });
  }

  @Query(() => [Profession])
  getProfessions() {
    return this.prisma.profession.findMany({
      where: {
        status: 'active',
      },
      orderBy: {
        sortOrder: 'desc',
      },
    });
  }

  @Mutation(() => Boolean)
  async createProfession(@Args('args') args: CreateProfessionInput) {
    await this.prisma.profession.create({
      data: args,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateProfession(@Args('args') args: UpdateProfessionInput) {
    await this.prisma.profession.update({
      where: {
        id: args.id,
      },
      data: args,
    });

    return true;
  }

  @ResolveReference()
  resloveReferance({ id }: { __typename: string; id: string }) {
    if (!id) return null;
    return this.prisma.profession.findUnique({
      where: {
        id,
      },
    });
  }
}
