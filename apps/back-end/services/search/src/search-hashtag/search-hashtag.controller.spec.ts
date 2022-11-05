import { Test, TestingModule } from '@nestjs/testing';
import { SearchHashtagController } from './search-hashtag.controller';

describe('SearchHashtagController', () => {
  let controller: SearchHashtagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchHashtagController],
    }).compile();

    controller = module.get<SearchHashtagController>(SearchHashtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
