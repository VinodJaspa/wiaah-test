import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SiteInformation } from '@site-informations/entities';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { SiteModes, SocialLink } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { AdminGetSiteInformationsInput } from './dto/admin-get-site-informations.input';
import { CreateSiteInformationInput } from './dto/create-site-information.input';
import { UpdateSiteInformationInput } from './dto/update-site-information.input';
import { UpdateSiteSocialInput } from './dto/update-site-social.input';

@Resolver(() => SiteInformation)
export class SiteInformationsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [SiteInformation])
  getSiteInfomrationsOfPlacement(@Args('placement') placement: string) {
    return this.prisma.information.findMany({
      where: {
        placements: {
          has: placement,
        },
      },
    });
  }

  @Query(() => [SiteInformation])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetSiteInformations(@Args('args') args: AdminGetSiteInformationsInput) {
    const { take, skip } = ExtractPagination(args.pagination);
    return this.prisma.information.findMany({
      where: {
        AND: [
          {
            title: {
              contains: args.name,
            },
          },
          {
            sortOrder: args.sortOrder,
          },
        ],
      },
      take,
      skip,
    });
  }

  @Mutation(() => SiteInformation)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createSiteInformations(@Args('args') args: CreateSiteInformationInput) {
    return this.prisma.information.create({
      data: args,
    });
  }

  @Mutation(() => SiteInformation)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateSiteInformations(@Args('args') args: UpdateSiteInformationInput) {
    const { id, ...rest } = args;
    return this.prisma.information.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async updateSocialLinks(@Args('args') input: UpdateSiteSocialInput) {
    const settings = await this.getSiteSettings();
    const updateLinks: SocialLink[] = [];
    const createLinks: SocialLink[] = [];

    input.socialLinks.forEach(({ label, link, placements }) => {
      if (settings.socialLinks.some((v) => v.label === label)) {
        updateLinks.push({
          label,
          link,
          placement: placements,
        });
      } else {
        createLinks.push({
          label,
          link,
          placement: placements,
        });
      }
    });

    const concatenated = updateLinks.concat(createLinks).map((v) => v.label);
    const rest = settings.socialLinks.filter((v) =>
      concatenated.includes(v.label),
    );

    await this.prisma.siteSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        socialLinks: [...rest, ...updateLinks, ...createLinks],
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async enableMaintenanceMode() {
    const settings = await this.getSiteSettings();

    await this.prisma.siteSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        mode: SiteModes.maintenance,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async disableMaintenanceMode() {
    const settings = await this.getSiteSettings();

    await this.prisma.siteSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        mode: SiteModes.up,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async enableComingSoon() {
    const settings = await this.getSiteSettings();

    await this.prisma.siteSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        mode: 'comingsoon',
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async disableComingSoon() {
    const settings = await this.getSiteSettings();

    await this.prisma.siteSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        mode: 'up',
      },
    });

    return true;
  }

  async getSiteSettings() {
    let settings = await this.prisma.siteSettings.findMany();
    if (settings.length !== 1) {
      await this.prisma.siteSettings.deleteMany();
      const res = await this.prisma.siteSettings.create({
        data: {},
      });

      settings = [res];
    }

    return settings[0];
  }
}
