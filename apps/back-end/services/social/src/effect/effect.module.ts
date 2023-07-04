import { Module } from '@nestjs/common';
import { EffectService } from './effect.service';
import { EffectResolver } from './effect.resolver';

@Module({
  providers: [EffectResolver, EffectService]
})
export class EffectModule {}
