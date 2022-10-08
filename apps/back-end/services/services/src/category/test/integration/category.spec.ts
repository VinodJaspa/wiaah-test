import { CategoryResolver } from '@category';
import { CategoryService } from '@category';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prismaService';
import { mockedUser, SERVICES } from 'nest-utils';

describe('Category tests', () => {
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

  function createCategory() {
    return resolver.createServiceCategory(
      {
        filters: [
          {
            filterGroupName: 'group 1',
            filterValues: [
              {
                name: 'value 1',
                sortOrder: 1,
              },
            ],
            sortOrder: 2,
          },
        ],
        name: 'hotel',
      },
      mockedUser,
    );
  }

  it('should create category', async () => {
    const { filters, id, name } = await createCategory();

    expect(await resolver.getServiceCategoryById(id, mockedUser)).toBeDefined();
    expect((await resolver.getServiceCategories()).length).toBe(1);

    const categories = await resolver.getServiceCategories();
    const createdCategory = categories[0];

    expect(createdCategory.name).toBe('hotel');
    expect(createdCategory.filters.length).toBe(1);
    expect(createdCategory.filters.at(0).filterGroupName).toBe('group 1');
    expect(createdCategory.filters.at(0).filterValues.length).toBe(1);
    expect(createdCategory.filters.at(0).filterValues.at(0).name).toBe(
      'value 1',
    );
  });

  it('should update service category', async () => {
    const createdCategory = await createCategory();

    await resolver.updateServiceCategory(
      {
        id: createdCategory.id,
        name: 'updated Cate name',
        filters: [
          {
            filterGroupName: 'updated group',
            filterValues: [
              {
                name: 'updated value',
                sortOrder: 1,
              },
            ],
            sortOrder: 1,
          },
        ],
      },
      mockedUser,
    );

    const cate = await resolver.getServiceCategoryById(
      createdCategory.id,
      mockedUser,
    );

    expect(cate.name).toBe('updated Cate name');
    expect(cate.filters.at(0).filterGroupName).toBe('updated group');
    expect(cate.filters.at(0).filterValues.at(0).name).toBe('updated value');
  });

  it('should remove category', async () => {
    const created = await createCategory();

    expect(
      await resolver.getServiceCategoryById(created.id, mockedUser),
    ).toBeDefined();

    await resolver.removeServiceCategory(created.id, mockedUser);

    const cates = await resolver.getServiceCategories();

    expect(cates.length).toBe(0);

    expect(
      await resolver.getServiceCategoryById(created.id, mockedUser),
    ).toBeNull();
  });
});
