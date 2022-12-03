import { Test, TestingModule } from '@nestjs/testing';
import { ContentDiscoveryService } from './content-discovery.service';

describe('ContentDiscoveryService', () => {
  let service: ContentDiscoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDiscoveryService],
    }).compile();

    service = module.get<ContentDiscoveryService>(ContentDiscoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
