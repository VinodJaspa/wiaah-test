import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { Doctor } from './entities';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveReference()
  resloveRef(ref: { __typename: string; id: string }) {
    return this.prisma.healthCenterDoctor.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
