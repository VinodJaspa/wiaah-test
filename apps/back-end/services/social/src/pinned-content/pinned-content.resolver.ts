import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PinnedContent } from './entities/pinned-content.entity';
import { PrismaService } from 'prismaService';
import { CreatePinnedContentInput } from './dto/create-pinned-content.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthorizationGuard } from 'nest-utils';

@Resolver(() => PinnedContent)
@UseGuards(new GqlAuthorizationGuard([]))
export class PinnedContentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Boolean)
  async pinContent(
    @Args('args') args: CreatePinnedContentInput,
  ): Promise<boolean> {
    try {
      await this.prisma.pinnedContent.create({
        data: {
          contentId: args.contentId,
          userId: args.userId,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async unPinContent(
    @Args('args') args: CreatePinnedContentInput,
  ): Promise<boolean> {
    try {
      const pinnedContent = await this.prisma.pinnedContent.findUnique({
        where: {
          userId_contentId: {
            contentId: args.contentId,
            userId: args.userId,
          },
        },
      });

      if (pinnedContent) {
        await this.prisma.pinnedContent.deleteMany({
          where: {
            id: pinnedContent.id,
          },
        });
      } else return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
