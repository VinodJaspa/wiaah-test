import { Query, Resolver } from '@nestjs/graphql';
import { ContentView } from './entities/content-view.entity';
import { PrismaService } from 'prismaService';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SubtractFromDate,
} from 'nest-utils';
import { ContentHostType } from 'prismaClient';

@Resolver(() => ContentView)
export class ContentViewResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ContentView])
  @UseGuards(new GqlAuthorizationGuard([]))
  async getAudienceTrendingHour(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ContentView[]> {
    const views = await this.prisma.contentView.findMany({
      where: {
        contentType: {
          in: [ContentHostType.post_newsfeed, ContentHostType.action],
        },
        contentOnwerId: user.id,
        createdAt: {
          gte: SubtractFromDate(new Date(), { days: 7 }),
        },
      },
      include: {
        viewer: {
          select: {
            gender: true,
          },
        },
      },
    });

    return views;
  }
}
