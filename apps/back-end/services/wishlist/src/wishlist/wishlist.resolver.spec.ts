import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser } from 'nest-utils';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

import { AppModule } from '../app.module';
import { AddWishlistItemInput, CreateWishlistInput } from './dto';

describe('WishlistResolver', () => {
  let resolver: WishlistResolver;
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

    resolver = module.get(WishlistResolver);
  });

  it('should get my wishlist', async () => {
    await resolver.MyWishlist(mockedUser);

    expect(mockGetWishlist).toBeCalledWith(mockedUser.id);
  });

  it('should remove wishlist', async () => {
    await resolver.RemoveWishlistItem(mockedUser, { itemId: 'id' });
    expect(mockRemoveWishlistItem).toBeCalledWith(mockedUser.id, {
      itemId: 'id',
    });
  });

  it('should add wishlist', async () => {
    const input: AddWishlistItemInput = {
      itemId: 'testid',
      itemType: 'product',
      sellerId: 'sellerid',
    };
    await resolver.AddWishlistItem(mockedUser, input);
  });
});
