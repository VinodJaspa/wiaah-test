import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Language } from './entities/language.entity';
import { PrismaService } from 'prismaService';
import { CreateLanguageInput, UpdateLanguageInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { AdminGetLanguagesInput } from './dto/admin-get-languages.input';
import { Prisma } from 'prismaClient';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Language])
  getLanguages() {
    return this.prisma.language.findMany({
      where: {
        enabled: true,
      },
    });
  }

  @Query(() => [Language])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetLanguages(@Args('args') args: AdminGetLanguagesInput) {
    let filters: Prisma.LanguageWhereInput[] = [];

    if (args.name) {
      filters.push({
        name: {
          contains: args.name,
        },
      });
    }

    if (args.code) {
      filters.push({
        code: {
          contains: args.code,
        },
      });
    }

    if (args.locale) {
      filters.push({
        locale: {
          contains: args.locale,
        },
      });
    }

    if (args.sortOrder) {
      filters.push({
        sortOrder: args.sortOrder,
      });
    }

    return this.prisma.language.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async createLanguage(@Args('args') args: CreateLanguageInput) {
    await this.prisma.language.create({
      data: args,
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async updateLanguage(@Args('args') args: UpdateLanguageInput) {
    const { id, ...rest } = args;
    await this.prisma.language.update({
      data: rest,
      where: {
        id,
      },
    });

    return true;
  }
}
