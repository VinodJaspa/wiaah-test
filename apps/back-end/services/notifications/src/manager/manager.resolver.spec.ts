import { Test, TestingModule } from '@nestjs/testing';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';

describe('MangerResolver', () => {
  let resolver: ManagerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerResolver, ManagerService],
    }).compile();

    resolver = module.get<ManagerResolver>(ManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
