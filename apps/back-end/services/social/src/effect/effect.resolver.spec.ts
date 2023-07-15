import { Test, TestingModule } from '@nestjs/testing';
import { EffectResolver } from './effect.resolver';
import { EffectService } from './effect.service';

describe('EffectResolver', () => {
  let resolver: EffectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EffectResolver, EffectService],
    }).compile();

    resolver = module.get<EffectResolver>(EffectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
