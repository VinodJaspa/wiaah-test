import { Test, TestingModule } from '@nestjs/testing';
import { RequiredActionsResolver } from './required-actions.resolver';
import { RequiredActionsService } from './required-actions.service';

describe('RequiredActionsResolver', () => {
  let resolver: RequiredActionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequiredActionsResolver, RequiredActionsService],
    }).compile();

    resolver = module.get<RequiredActionsResolver>(RequiredActionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
