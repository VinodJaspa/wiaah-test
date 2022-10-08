import { Test, TestingModule } from '@nestjs/testing';
import { CategoryResolver } from '@category';
import { CategoryService } from '@category';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as nestUtils from 'nest-utils';
import { GqlAuthorizationGuard } from 'nest-utils';

describe('CategoryResolver unit testing', () => {
  let resolver: CategoryResolver;
  let mockGetCategoryById: jest.Mock;
  let mockCreate: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockRemove: jest.Mock;
  let app: INestApplication;

  beforeEach(async () => {
    mockGetCategoryById = jest.fn();
    mockCreate = jest.fn();
    mockUpdate = jest.fn();
    mockRemove = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryResolver, CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue({
        getCategoryById: mockGetCategoryById,
        create: mockCreate,
        update: mockUpdate,
        remove: mockRemove,
      })
      .overrideGuard(GqlAuthorizationGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    app = module.createNestApplication();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defiend', () => {
    expect(resolver).toBeDefined();
  });

  it('should get category by id', async () => {
    const getCategoryQuery = () => `
    query getServiceCategoryById(
      $id:ID!
    ) {
       getServiceCategoryById(
        categoryId:$id
      ){
          id
          name
      }
    }
    `;

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getCategoryQuery(),
        variables: {
          id: 'test id 134545343112',
        },
      });

    expect(mockGetCategoryById).toBeCalled();
  });
});
