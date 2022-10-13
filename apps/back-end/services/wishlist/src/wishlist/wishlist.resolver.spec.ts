import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { getUserFromRequest, mockedUser } from 'nest-utils';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

import * as request from 'supertest';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AppModule } from '../app.module';

describe('WishlistResolver', () => {
  let resolver: WishlistResolver;
  let app: INestApplication;
  let mockGetWishlist: jest.Mock;
  let mockAddWishListItem: jest.Mock;
  let mockRemoveWishlistItem: jest.Mock;

  beforeEach(async () => {
    mockGetWishlist = jest.fn().mockReturnValue('tested');
    mockAddWishListItem = jest.fn().mockReturnValue('tested');
    mockRemoveWishlistItem = jest.fn().mockReturnValue('tested');

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WishlistService)
      .useValue({
        getWishlist: mockGetWishlist,
        addWishlistItem: mockAddWishListItem,
        removeWishlistItem: mockRemoveWishlistItem,
      })
      .compile();

    app = module.createNestApplication();
    app.init();
  });

  it('should get my wishlist', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query myWishlist{
    MyWishlist{
        id
        ownerId
        wishedItems {
            itemId
        }
    }
}`,
        variables: {},
      });

    expect(mockGetWishlist).toBeCalled();
    expect(mockGetWishlist).toBeCalledWith(mockedUser.id);
    expect(res.body.data).toBe('tested');
  });
});
