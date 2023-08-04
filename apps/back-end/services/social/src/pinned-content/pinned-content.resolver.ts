import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PinnedContent } from './entities/pinned-content.entity';
import { PrismaService } from 'prismaService';
import { CreatePinnedContentInput } from './dto/create-pinned-content.input';

@Resolver(() => PinnedContent)
export class PinnedContentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Boolean)
  async createPinnedContent(
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
}
