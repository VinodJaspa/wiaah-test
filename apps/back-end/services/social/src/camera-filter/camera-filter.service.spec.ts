import { Test, TestingModule } from '@nestjs/testing';
import { CameraFilterService } from './camera-filter.service';

describe('CameraFilterService', () => {
  let service: CameraFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraFilterService],
    }).compile();

    service = module.get<CameraFilterService>(CameraFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
