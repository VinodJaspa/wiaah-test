import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SiteInformation } from '@site-informations/entities';
import { PrismaService } from 'prismaService';
import { CreateSiteInformationInput } from './dto/create-site-information.input';
import { UpdateSiteInformationInput } from './dto/update-site-information.input';

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

  @Mutation(() => SiteInformation)
  createSiteInformations(@Args('args') args: CreateSiteInformationInput) {
    return this.prisma.information.create({
      data: args,
    });
  }

  @Mutation(() => SiteInformation)
  updateSiteInformations(@Args('args') args: UpdateSiteInformationInput) {
    const { id, ...rest } = args;
    return this.prisma.information.update({
      where: {
        id,
      },
      data: rest,
    });
  }
}
