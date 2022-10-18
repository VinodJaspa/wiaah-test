import { Test, TestingModule } from '@nestjs/testing';
import { HealthCenterResolver } from './health-center.resolver';
import { HealthCenterService } from './health-center.service';

describe('HealthCenterResolver', () => {
  let resolver: HealthCenterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCenterResolver, HealthCenterService],
    }).compile();

    resolver = module.get<HealthCenterResolver>(HealthCenterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
