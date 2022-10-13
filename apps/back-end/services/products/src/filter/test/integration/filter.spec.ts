import { FilterService, FilterResolver, UpdateFilterInput } from '@filter';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

describe('filter fnctionality testing', () => {
  let service: FilterService;
  let resolver: FilterResolver;
  let mockKafkaEmit: jest.Mock;

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterService,
        FilterResolver,
        PrismaService,
        {
          provide: SERVICES.SERVICES_SERIVCE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<FilterService>(FilterService);
    resolver = module.get<FilterResolver>(FilterResolver);
  });

  function createFilter() {
    return resolver.createFilter(
      {
        name: 'filterType',
        sortOrder: 2,
        values: [
          {
            name: 'value 1',
            sortOrder: 2,
          },
          {
            name: 'value 2',
            sortOrder: 2,
          },
        ],
      },
      mockedUser,
    );
  }

  function getFilters() {
    return resolver.getProductsFilters();
  }

  it('should create filter', async () => {
    let filters = await getFilters();

    expect(filters.length).toBe(0);

    await createFilter();

    filters = await getFilters();

    expect(filters.length).toBe(1);

    expect(filters.at(0).name).toBe('filterType');
    expect(filters.at(0).values.length).toBe(2);
    expect(filters.at(0).values.at(0).name).toBe('value 1');
    expect(filters.at(0).values.at(1).name).toBe('value 2');
  });

  it('should update filter', async () => {
    const created = await createFilter();
    const updateValues: Omit<UpdateFilterInput, 'id'> = {
      name: 'updatedName',
      sortOrder: 15,
      values: [
        {
          name: 'updated value 1',
          sortOrder: 10,
        },
      ],
    };

    const updated = await resolver.updateFilter(
      {
        id: created.id,
        ...updateValues,
      },
      mockedUser,
    );

    let filters = await getFilters();

    expect(filters.find((f) => f.id === updated.id)).toEqual(
      expect.objectContaining(updateValues),
    );
  });

  it('should delete filter', async () => {
    const created = await createFilter();

    expect((await getFilters()).length).toBe(1);

    await resolver.deleteFilter(created.id, mockedUser);

    expect((await getFilters()).length).toBe(0);
  });
});
