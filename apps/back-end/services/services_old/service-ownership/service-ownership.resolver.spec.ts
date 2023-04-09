import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipResolver } from './service-ownership.resolver';
import { ServiceOwnershipService } from './service-ownership.service';

describe('ServiceOwnershipResolver', () => {
  let resolver: ServiceOwnershipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceOwnershipResolver,
        ServiceOwnershipService,
        PrismaService,
      ],
    }).compile();

    resolver = module.get<ServiceOwnershipResolver>(ServiceOwnershipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
