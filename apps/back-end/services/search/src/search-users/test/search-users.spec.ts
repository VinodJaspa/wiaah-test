import { Test, TestingModule } from '@nestjs/testing';

import { SearchUsers } from '../entities';
import { UserElasticModel } from '../model';
import { SearchUserElasticRepository } from '../repository';
import { SearchUsersController } from '../search-users.controller';
import { SearchUsersModule } from '../search-users.module';
import { SearchUsersResolver } from '../search-users.resolver';

describe('SearchUsersResolver', () => {
  let resolver: SearchUsersResolver;
  let controller: SearchUsersController;
  let mockElasticSearchUsersIds: jest.Mock;
  let mockElasticIndexUser: jest.Mock;

  beforeEach(async () => {
    mockElasticSearchUsersIds = jest.fn();
    mockElasticIndexUser = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [SearchUsersModule],
    })
      .overrideProvider(SearchUserElasticRepository)
      .useValue({
        searchUsersIds: mockElasticSearchUsersIds,
        indexUser: mockElasticIndexUser,
      })
      .compile();

    await module.init();

    controller = module.get(SearchUsersController);
    resolver = module.get(SearchUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should search users', async () => {
    await resolver.searchUsers({
      query: 'user',
    });

    expect(mockElasticSearchUsersIds).toBeCalledTimes(1);
    expect(mockElasticSearchUsersIds).toBeCalledWith('user');
  });

  it('should return users ids from the recived obj', () => {
    const ids = resolver.resloveUsers({
      usersIds: ['test1', 'test2', 'test3'],
    } as SearchUsers);

    expect(ids).toStrictEqual(['test1', 'test2', 'test3']);
  });

  it('should index a new user into elastic on the account created kafka event', async () => {
    await controller.handleUserDataUpdate({
      input: {
        email: 'testemail@email.com',
        id: 'testid',
        username: 'user',
        accountType: 'buyer',
        firstName: 'first',
        lastName: 'last',
      },
    });

    expect(mockElasticIndexUser).toBeCalledTimes(1);
    expect(mockElasticIndexUser).toBeCalledWith({
      dbId: 'testid',
      firstName: 'first',
      lastName: 'last',
      username: 'user',
    } as UserElasticModel);
  });
});
