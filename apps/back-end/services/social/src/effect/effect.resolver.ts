import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  Effect,
  EffectCursorPaginationResponse,
} from './entities/effect.entity';
import { PrismaService } from 'prismaService';
import { GetTopEffectsInput } from './dto/get-effect-top-used-actions.input';
import { GetLang, UserPreferedLang } from 'nest-utils';
import { EffectService } from './effect.service';

@Resolver(() => Effect)
export class EffectResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly effectService: EffectService,
  ) {}

  @Query(() => Effect, { nullable: true })
  async getEffect(@Args('id') id: string) {
    const effect = await this.prisma.contentEffect.findUnique({
      where: {
        id,
      },
    });

    if (effect.status !== 'active') return null;

    return effect;
  }

  @Query(() => EffectCursorPaginationResponse)
  async getTopEffects(
    @Args('args') args: GetTopEffectsInput,
    @GetLang() langId: UserPreferedLang,
  ): Promise<EffectCursorPaginationResponse> {
    const res = await this.prisma.contentEffect.findMany({
      cursor: args.cursor ? { id: args.cursor } : undefined,
      where: {
        status: 'active',
        name: {
          some: {
            value: {
              contains: args.search,
            },
          },
        },
      },
      take: args.take + 1,
      orderBy: {
        usage: 'desc',
      },
    });

    return {
      data: res
        .slice(0, args.take)
        .map((effect) => this.effectService.formatEffect(effect, langId)),
      hasMore: res.length > args.take,
      cursor: args.cursor,
      nextCursor: res.at(args.take - 1)?.id,
    };
  }
}
