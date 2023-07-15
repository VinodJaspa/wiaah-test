import { Injectable } from '@nestjs/common';
import { UserPreferedLang, getTranslatedResource } from 'nest-utils';
import { ContentEffect } from 'prismaClient';
import { Effect } from './entities/effect.entity';
import { PrismaService } from 'prismaService';

@Injectable()
export class EffectService {
  constructor(private readonly prisma: PrismaService) {}

  async getEffect(id: string, langId: UserPreferedLang): Promise<Effect> {
    const effect = await this.prisma.contentEffect.findUnique({
      where: {
        id,
      },
    });

    if (effect.status !== 'active') return null;

    return this.formatEffect(effect, langId);
  }

  formatEffect(effect: ContentEffect, langId: UserPreferedLang): Effect {
    return {
      ...effect,
      name: getTranslatedResource({
        langId,
        resource: effect.name,
      }),
    };
  }
}
