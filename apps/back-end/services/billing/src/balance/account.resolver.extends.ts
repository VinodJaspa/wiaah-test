import { Account, Balance } from '@entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Balance)
  balance(@Parent() acc: Account) {
    return this.prisma.balance.findUnique({
      where: {
        ownerId: acc.id,
      },
    });
  }
}
