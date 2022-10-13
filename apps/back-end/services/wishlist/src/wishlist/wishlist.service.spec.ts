import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WisherslistService } from '@wishersList';
import { mockedUser, secendMockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let service: WishlistService;
  let mockAddWisherListItem: jest.Mock;
  let mockRemoveWisherListItem: jest.Mock;

  beforeEach(async () => {
    mockAddWisherListItem = jest.fn();
    mockRemoveWisherListItem = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistService, PrismaService, WisherslistService],
    })
      .overrideProvider(WisherslistService)
      .useValue({
        addWisherListItem: mockAddWisherListItem,
        removeWisherListItem: mockRemoveWisherListItem,
      })
      .compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create only one wishlist per account', async () => {
    expect((await service.getAll()).length).toBe(0);
    const createdWishlist = await service.createWishlist(mockedUser.id);
    expect((await service.getAll()).length).toBe(1);

    let duplicationTested = false;
    try {
      await service.createWishlist(mockedUser.id);
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      duplicationTested = true;
    }

    expect(duplicationTested).toBe(true);
  });

  it('should get wishlist by owner id if exists', async () => {
    await service.createWishlist(mockedUser.id);

    const wishlist = await service.getWishlist(mockedUser.id);

    expect(wishlist.ownerId).toBe(mockedUser.id);
    expect(wishlist.wishedItems.length).toBe(0);
    expect(wishlist.wishedItemsCount).toBe(0);

    let notFoundTested = false;
    try {
      await service.getWishlist(secendMockedUser.id);
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      notFoundTested = true;
    }

    expect(notFoundTested).toBe(true);
  });

  it('should add item to wishlist', async () => {
    const mockItemId = secendMockedUser.shopId;
    await service.createWishlist(mockedUser.id);

    await service.addWishlistItem(mockedUser.id, {
      itemId: mockItemId,
      sellerId: secendMockedUser.id,
    });

    expect(mockAddWisherListItem).toBeCalledTimes(1);
    expect(mockAddWisherListItem).toBeCalledWith(
      mockItemId,
      secendMockedUser.id,
      mockedUser.id,
    );

    const wishlist = await service.getWishlist(mockedUser.id);

    expect(wishlist.wishedItems).toStrictEqual([{ itemId: mockItemId }]);
    expect(wishlist.wishedItemsCount).toBe(1);
  });

  it('should remove item from wishlist and decrement wished items count by one only if its exists', async () => {
    const created = await service.createWishlist(mockedUser.id);

    await service.addWishlistItem(mockedUser.id, {
      itemId: mockedUser.shopId,
      sellerId: secendMockedUser.id,
    });

    expect((await service.getAll()).at(0).wishedItems.length).toBe(1);
    expect((await service.getAll()).at(0).wishedItemsCount).toBe(1);

    await service.removeWishlistItem(mockedUser.id, {
      itemId: secendMockedUser.shopId,
    });

    expect((await service.getAll()).at(0).wishedItems.length).toBe(1);
    expect((await service.getAll()).at(0).wishedItemsCount).toBe(1);

    await service.removeWishlistItem(mockedUser.id, {
      itemId: mockedUser.shopId,
    });

    expect((await service.getAll()).at(0).wishedItems.length).toBe(0);
    expect((await service.getAll()).at(0).wishedItemsCount).toBe(0);
  });
});
