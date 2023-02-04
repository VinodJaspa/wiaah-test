import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { Treatment } from './entities';

@Resolver(() => Treatment)
export class TreatmentResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return this.prisma.beautyCenterTreatment.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
