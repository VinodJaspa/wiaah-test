import { Test, TestingModule } from '@nestjs/testing';
import { ContentShareResolver } from './content-share.resolver';
import { ContentShareService } from './content-share.service';

describe('ContentShareResolver', () => {
  let resolver: ContentShareResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentShareResolver, ContentShareService],
    }).compile();

    resolver = module.get<ContentShareResolver>(ContentShareResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
