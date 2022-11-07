import { Test, TestingModule } from '@nestjs/testing';
import { HashtagCreatedEvent } from 'nest-dto';
import { SearchHashtagElasticModel } from '../models';
import { SearchHashtagElasticRepository } from '../repository';
import { SearchHashtagController } from '../search-hashtag.controller';
import { SearchHashtagModule } from '../search-hashtag.module';
import { SearchHashtagResolver } from '../search-hashtag.resolver';

describe('SearchHashtagResolver', () => {
  let resolver: SearchHashtagResolver;
  let controller: SearchHashtagController;
  let mockElasticIndexHashtag: jest.Mock;
  let mockElasticSearchHashtags: jest.Mock;

  beforeEach(async () => {
    mockElasticIndexHashtag = jest.fn();
    mockElasticSearchHashtags = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SearchHashtagModule],
    })
      .overrideProvider(SearchHashtagElasticRepository)
      .useValue({
        indexHashtag: mockElasticIndexHashtag,
        searchHashtags: mockElasticSearchHashtags,
      })
      .compile();

    await module.init();

    controller = module.get(SearchHashtagController);
    resolver = module.get<SearchHashtagResolver>(SearchHashtagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should search for hashtags', async () => {
    await resolver.searchHashtags('test');

    expect(mockElasticSearchHashtags).toBeCalledTimes(1);
    expect(mockElasticSearchHashtags).toBeCalledWith('test');
  });

  it('should create elastic hashtag document on hashtag created kafka evnet', async () => {
    await controller.handleHashtagCreated(
      new HashtagCreatedEvent({
        id: 'testid1',
        name: 'tagname',
      }),
    );

    expect(mockElasticIndexHashtag).toBeCalledTimes(1);
    expect(mockElasticIndexHashtag).toBeCalledWith({
      dbId: 'testid1',
      name: 'tagname',
    } as SearchHashtagElasticModel);
  });
});
