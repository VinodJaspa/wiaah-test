import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Language } from './entities/language.entity';
import { PrismaService } from 'prismaService';
import { CreateLanguageInput, UpdateLanguageInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Language])
  getLanguages() {
    return this.prisma.language.findMany();
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
