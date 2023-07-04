import { Test, TestingModule } from '@nestjs/testing';
import { CameraFilterResolver } from './camera-filter.resolver';
import { CameraFilterService } from './camera-filter.service';

describe('CameraFilterResolver', () => {
  let resolver: CameraFilterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraFilterResolver, CameraFilterService],
    }).compile();

    resolver = module.get<CameraFilterResolver>(CameraFilterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
