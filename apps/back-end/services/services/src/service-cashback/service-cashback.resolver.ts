import { ServiceCashback } from '@entities';
import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@Resolver(() => ServiceCashback)
export class ServiceCashbackResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return {};
  }
}
