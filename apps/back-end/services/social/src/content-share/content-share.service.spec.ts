import { Test, TestingModule } from '@nestjs/testing';
import { ContentShareService } from './content-share.service';

describe('ContentShareService', () => {
  let service: ContentShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentShareService],
    }).compile();

    service = module.get<ContentShareService>(ContentShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
