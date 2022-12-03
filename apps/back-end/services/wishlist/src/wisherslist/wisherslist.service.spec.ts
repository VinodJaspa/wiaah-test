import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser, secendMockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { WisherslistService } from './wisherslist.service';

describe('WisherslistService', () => {
  let service: WisherslistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WisherslistService, PrismaService],
    }).compile();

    service = module.get<WisherslistService>(WisherslistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create one wisherList per item', async () => {
    const mockItemId = mockedUser.shopId;
    const mockSellerId = mockedUser.id;
    const created = await service.createWisherList(mockItemId, mockSellerId);

    expect((await service.getAll()).length).toBe(1);

    let duplicationTested = false;
    try {
      await service.createWisherList(mockItemId, mockSellerId);
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      duplicationTested = true;
    }

    expect(duplicationTested).toBe(true);
  });

  it('should should get wishers lists by seller id', async () => {
    const mockItemsIds = [
      '62b8c8cb69e68f34eb948b3f',
      '62b8c8cb69e68f34eb948b4f',
      '62b8c8cb69e68f34eb948b5f',
      '62b8c8cb69e68f34eb948b6f',
      '62b8c8cb69e68f34eb948b7f',
    ];

    const otherMockedId = '62b8c8cb69e68f34eb948b8f';

    for (const id of mockItemsIds) {
      await service.createWisherList(id, mockedUser.id);
    }

    await service.createWisherList(otherMockedId, secendMockedUser.id);

    const lists = await service.getItemsWishersListsBySellerId(mockedUser.id);

    expect(lists.every((v) => v.itemId !== otherMockedId)).toBe(true);
  });

  it('should add wisher to a item wishers list', async () => {
    const mockItemId = mockedUser.shopId;
    const mockSellerId = secendMockedUser.id;

    const createdList = await service.createWisherList(
      mockItemId,
      mockSellerId,
    );

    await service.addWisherListItem(mockItemId, mockSellerId, mockedUser.id);

    const list = await service.getItemWishersList(
      {
        itemId: mockItemId,
      },
      mockSellerId,
    );

    expect(list.wishers.length).toBe(1);
    expect(list.wishers.at(0).userId).toBe(mockedUser.id);
    expect(list.wishersCount).toBe(1);
  });

  it('should remove from wishers list', async () => {
    const mockItemId = mockedUser.shopId;
    const mockSellerId = secendMockedUser.id;
    await service.createWisherList(mockItemId, mockSellerId);

    await service.addWisherListItem(mockItemId, mockSellerId, mockedUser.id);

    let list = await service.getItemWishersList(
      {
        itemId: mockItemId,
      },
      mockSellerId,
    );

    expect(list.wishers.length).toBe(1);
    expect(list.wishers.at(0).userId).toBe(mockedUser.id);
    expect(list.wishersCount).toBe(1);

    let removeTested = false;

    try {
      await service.removeWisherListItem(mockItemId, mockedUser.shopId);
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      removeTested = true;
    }

    expect(removeTested).toBe(true);

    list = await service.getItemWishersList(
      {
        itemId: mockItemId,
      },
      mockSellerId,
    );

    expect(list.wishers.length).toBe(1);
    expect(list.wishers.at(0).userId).toBe(mockedUser.id);
    expect(list.wishersCount).toBe(1);

    await service.removeWisherListItem(mockItemId, mockedUser.id);

    list = await service.getItemWishersList(
      {
        itemId: mockItemId,
      },
      mockSellerId,
    );

    expect(list.wishers.length).toBe(0);
    expect(list.wishersCount).toBe(0);
  });
});
