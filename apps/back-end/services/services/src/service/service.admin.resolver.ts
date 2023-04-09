import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service } from './entities/service.entity';

@Resolver(() => Service)
export class AdminServiceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Service)
  adminGetAccountService(@Args('accountId') id: string) {
    return this.prisma.service.findUnique({
      where: {
        sellerId: id,
      },
    });
  }

  @Mutation(() => Boolean)
  async adminUpdateServiceById(@Args('args') args: UpdateServiceInput) {
    try {
      await this.prisma.service.update({
        where: {
          id: args.id,
        },
        //@ts-ignore TODO: UPDATE SERVICE
        data: args,
      });

      return true;
    } catch {
      return false;
    }
  }
}
