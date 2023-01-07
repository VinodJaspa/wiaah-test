import { Test, TestingModule } from '@nestjs/testing';
import { RequiredActionsService } from './required-actions.service';

describe('RequiredActionsService', () => {
  let service: RequiredActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequiredActionsService],
    }).compile();

    service = module.get<RequiredActionsService>(RequiredActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
