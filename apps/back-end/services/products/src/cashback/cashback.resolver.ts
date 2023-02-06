import { Resolver, ResolveReference } from '@nestjs/graphql';
import { Cashback } from '@products';
import { PrismaService } from 'prismaService';

@Resolver(() => Cashback)
export class CashbackResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return this.prisma.cashBack.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
