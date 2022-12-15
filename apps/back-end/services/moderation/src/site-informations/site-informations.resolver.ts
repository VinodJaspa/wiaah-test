import { Args, Query, Resolver } from '@nestjs/graphql';
import { SiteInformation } from '@site-informations/entities';
import { PrismaService } from 'prismaService';

@Resolver(() => SiteInformation)
export class SiteInformationsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [SiteInformation])
  getsiteInfomrations(@Args('placement') placement: string) {
    return this.prisma.information.findMany({
      where: {
        placements: {
          has: placement,
        },
      },
    });
  }
}
