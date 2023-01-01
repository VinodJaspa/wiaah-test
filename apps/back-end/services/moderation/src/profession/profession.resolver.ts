import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { CreateProfessionInput } from './dto/create-profession.input';
import { UpdateProfessionInput } from './dto/update-profession.input';
import { Profession } from './entities/profession.entity';

@Resolver(() => Profession)
export class ProfessionResolver {
  constructor(private readonly prisma: PrismaService) {}

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
