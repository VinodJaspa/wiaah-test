import { Account, Profile } from '@entities';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@Resolver(() => Account)
export class AccountProfileResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Profile)
  profile(account: Account) {
    return this.prisma.profile.findUnique({
      where: {
        ownerId: account.id,
      },
    });
  }
}
