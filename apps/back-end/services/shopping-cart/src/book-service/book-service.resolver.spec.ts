import { Test, TestingModule } from '@nestjs/testing';
import { BookServiceResolver } from './book-service.resolver';
import { BookServiceService } from './book-service.service';

describe('BookServiceResolver', () => {
  let resolver: BookServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookServiceResolver, BookServiceService],
    }).compile();

    resolver = module.get<BookServiceResolver>(BookServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
