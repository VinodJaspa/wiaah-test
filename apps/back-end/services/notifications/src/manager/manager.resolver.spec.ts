import { Test, TestingModule } from '@nestjs/testing';
import { MangerResolver } from './manager.resolver';
import { MangerService } from './manager.service';

describe('MangerResolver', () => {
  let resolver: MangerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MangerResolver, MangerService],
    }).compile();

    resolver = module.get<MangerResolver>(MangerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
