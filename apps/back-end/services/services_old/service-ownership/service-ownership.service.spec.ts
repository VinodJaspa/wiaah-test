import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOwnershipService } from './service-ownership.service';

describe('ServiceOwnershipService', () => {
  let service: ServiceOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceOwnershipService],
    }).compile();

    service = module.get<ServiceOwnershipService>(ServiceOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
