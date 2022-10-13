import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser, secendMockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let mockKafkaEmit: jest.Mock;
  let mockKafkaSend: jest.Mock;

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockKafkaSend = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        PrismaService,
        {
          provide: SERVICES.SHOPPING_CART_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
            send: mockKafkaSend,
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create only one shoppingCart record per account', async () => {
    await service.createShoppingCart(mockedUser.id);

    const shoppingcarts = await service.getShoppingCarts();
    expect(shoppingcarts.length).toBe(1);
    expect(shoppingcarts.at(0).ownerId).toBe(mockedUser.id);

    let duplicationTested = false;
    try {
      await service.createShoppingCart(mockedUser.id);
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      duplicationTested = true;
    }

    expect(duplicationTested).toBe(true);

    expect(shoppingcarts.length).toBe(1);
    expect(shoppingcarts.at(0).ownerId).toBe(mockedUser.id);
  });

  it('tell if a user has a shopping cart', async () => {
    let has = await service.ownerCartExists(mockedUser.id);
    expect(has).toBe(false);

    await service.createShoppingCart(mockedUser.id);
    has = await service.ownerCartExists(mockedUser.id);
    expect(has).toBe(true);
  });

  it('should get a shopping cart by its owner id', async () => {
    const mockIds = [mockedUser.id, mockedUser.shopId, secendMockedUser.id];

    for (const id of mockIds) {
      await service.createShoppingCart(id);
    }

    const targetCart = await service.getShoppingCartByOwnerId(
      mockedUser.shopId,
    );

    expect(targetCart.ownerId).toBe(mockedUser.shopId);

    let notFoundTested = false;

    try {
      await service.getShoppingCartByOwnerId(secendMockedUser.shopId);
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      notFoundTested = true;
    }

    expect(notFoundTested).toBe(true);
  });

  it('should add item of type product to shopping cart', async () => {});
});
