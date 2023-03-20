import { Account } from '@entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ServiceDetails } from '@service/entities/service.entity';
import { PrismaService } from 'prismaService';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => ServiceDetails)
  service(@Parent() account: Account) {
    return this.prisma.service.findUnique({
      where: {
        ownerId: account.id,
      },
    });
  }
}
