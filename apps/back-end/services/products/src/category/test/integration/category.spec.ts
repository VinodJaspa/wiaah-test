import { CategoryService, CategoryResolver } from '@category';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

describe('Category Testing', () => {
  let service: CategoryService;
  let resolver: CategoryResolver;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;

  afterEach(async () => await mockMongo.stop());

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockMongo = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ storageEngine: 'wiredTiger' }],
    });
    process.env.DATABASE_URL = mockMongo.getUri('testDB');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        CategoryResolver,
        PrismaService,
        {
          provide: SERVICES.SERVICES_SERIVCE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  function createCategory(parantId?: string) {
    return resolver.createCategory(
      {
        name: 'cameras',
        parantId,
      },
      mockedUser,
    );
  }

  function getCates() {
    return resolver.getCategories();
  }

  it('should create product category', async () => {
    const created = await createCategory();

    let cates = await getCates();

    expect(cates.length).toBe(1);

    expect(cates.at(0).name).toBe('cameras');
  });

  it('should create sub category', async () => {
    const created = await createCategory();

    const sub = await createCategory(created.id);

    let cates = await getCates();

    expect(cates.length).toBe(2);
    expect(cates.find((c) => c.id === sub.id).parantId).toBe(created.id);
  });

  it("should remove category and remove all it's sub categories", async () => {
    const created = await createCategory();
    const sub = await createCategory(created.id);

    let cates = await getCates();
    expect(cates.length).toBe(2);

    await resolver.deleteCategory(created.id, mockedUser);

    cates = await getCates();
    expect(cates.length).toBe(0);
  });

  it('should update category', async () => {
    const created = await createCategory();

    await resolver.updateCategory(
      {
        name: 'phones',
        id: created.id,
      },
      mockedUser,
    );

    expect((await getCates()).at(0).name).toBe('phones');
  });
});
