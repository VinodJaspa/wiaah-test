import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ProductsService,
  UpdateProdutctInput,
  CreateProdutctInput,
} from '@products';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, secendMockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

describe('products services unit tests', () => {
  let service: ProductsService;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;

  let createProductInput: CreateProdutctInput = {
    attributes: [{ name: 'colors', values: ['red', 'yellow'] }],
    brand: 'nike',
    cashback: {
      type: 'cash',
      amount: 15,
      units: 2,
    },
    category: 'test',
    description: 'description',
    discount: {
      amount: 10,
      units: 12,
    },
    presentations: [{ src: 'test', type: 'image' }],
    price: 156,
    stock: 15,
    thumbnail: '/test.jpeg',
    title: 'title',
    type: 'goods',
    visibility: 'hidden',
    hostCategories: ['cate', 'category'],
  };

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
        ProductsService,
        PrismaService,
        {
          provide: SERVICES.PRODUCTS_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  function createProduct() {
    return service.createNewProduct(createProductInput, mockedUser);
  }

  it('Should create product', async () => {
    expect((await service.getAll()).length).toBe(0);
    await createProduct();
    expect((await service.getAll()).length).toBe(1);
  });

  it('Should create updating product data only if im the owner of it', async () => {
    const product = await createProduct();

    const updateData: UpdateProdutctInput = {
      id: product.id,
      attributes: [{ name: 'updated', values: ['file 1', 'file 2'] }],
      brand: 'updated brand',
      cashback: {
        amount: 10,
        type: 'cash',
        units: 3,
      },
      category: 'updated',
      hostCategories: ['update', 'updated'],
      description: 'updated desc',
      discount: {
        amount: 26,
        units: 5,
      },
      presentations: [
        {
          src: 'updated src',
          type: 'image',
        },
        {
          src: 'updated vid',
          type: 'video',
        },
      ],
      price: 300,
      stock: 650,
      title: 'title',
      type: 'digital',
      visibility: 'hidden',
    };

    let foundTested = false;
    try {
      await service.updateProduct(mockedUser.id, {
        ...updateData,
        id: updateData.id.slice(0, updateData.id.length - 2) + `65`,
      });
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      foundTested = true;
    }

    expect(foundTested).toBe(true);

    let authTested = false;
    try {
      await service.updateProduct(secendMockedUser.id, updateData);
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      authTested = true;
    }

    expect(authTested).toBe(true);

    await service.updateProduct(mockedUser.id, updateData);

    expect((await service.getAll()).at(0)).toEqual(
      expect.objectContaining(updateData),
    );
  });

  it('should remove product only if the user owns it', async () => {
    const created = await createProduct();

    let authTested = false;
    try {
      await service.removeProduct(created.id, secendMockedUser.id);
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      authTested = true;
    }

    expect(authTested).toBe(true);

    expect((await service.getAll()).length).toBe(1);

    await service.removeProduct(created.id, mockedUser.id);

    expect((await service.getAll()).length).toBe(0);

    let findTested = false;
    try {
      await service.removeProduct(created.id, mockedUser.id);
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      findTested = true;
    }

    expect(findTested).toBe(true);
  });

  it('should get product by id regerdless of its visibility', async () => {
    const created = await createProduct();

    expect(await service.getProductById(created.id)).toBeDefined();
    expect(await service.getProductById(created.id)).toEqual(
      expect.objectContaining(createProductInput),
    );
  });

  it('should search on products with the given filters', async () => {
    for (const v of ProductsPh) {
      await service.createNewProduct(v, mockedUser);
    }

    // filter by brand
    let products = await service.getFilteredProducts({
      pagination: {
        page: 1,
        take: 10,
      },
      filters: {
        brands: ['nike'],
      },
    });

    expect(products.data.every((v) => v.brand === 'nike')).toBe(true);

    // filter by title
    products = await service.getFilteredProducts({
      pagination: {
        page: 1,
        take: 10,
      },
      filters: {
        title: 'sofa',
      },
    });

    expect(products.data.every((v) => v.title.includes('sofa'))).toBe(true);

    // filter by stock status
    products = await service.getFilteredProducts({
      pagination: {
        page: 1,
        take: 10,
      },
      filters: {
        stockStatus: 'available',
      },
    });

    expect(products.data.every((v) => v.stock > 0)).toBe(true);

    products = await service.getFilteredProducts({
      pagination: {
        page: 1,
        take: 10,
      },
      filters: {
        rating: [3],
      },
    });

    expect(products.data.every((v) => v.rate >= 3 && v.rate < 4)).toBe(true);
  });
});

const ProductsPh: CreateProdutctInput[] = [
  {
    type: 'goods',
    category: 'shoes',
    description: 'test product description',
    stock: 13,
    title: 'cutting board',
    brand: 'nike',
    price: 16,
    thumbnail: '',
    attributes: [],
    cashback: {
      amount: 5,
      type: 'cash',
      units: 5,
    },
    discount: {
      amount: 15,
      units: 20,
    },
    hostCategories: ['fashion', 'clothes'],
    presentations: [],
    visibility: 'public',
  },
  {
    type: 'goods',
    category: 'test',
    description: 'test product description',
    stock: 0,
    title: 'cup',
    brand: 'or',
    price: 18,
    thumbnail: '',
    attributes: [],
    cashback: {
      amount: 5,
      type: 'cash',
      units: 5,
    },
    discount: {
      amount: 15,
      units: 20,
    },
    hostCategories: ['fashion', 'accsicories'],
    presentations: [],
    visibility: 'public',
  },
  {
    type: 'goods',
    category: 'test',
    description: 'test product description',
    stock: 13,
    title: 'sofa',
    brand: 'zara',
    price: 30,
    thumbnail: '',
    attributes: [],
    cashback: {
      amount: 5,
      type: 'cash',
      units: 5,
    },
    discount: {
      amount: 15,
      units: 20,
    },
    hostCategories: ['fashion', 'clothes'],
    presentations: [],
    visibility: 'public',
  },
  {
    type: 'digital',
    category: 'test',
    description: 'test product description',
    stock: 13,
    title: 'sofa',
    brand: 'zake',
    price: 5,
    thumbnail: '',
    attributes: [],
    cashback: {
      amount: 5,
      type: 'cash',
      units: 5,
    },
    discount: {
      amount: 15,
      units: 20,
    },
    hostCategories: ['fashion', 'clothes'],
    presentations: [],
    visibility: 'public',
  },
  {
    type: 'digital',
    category: 'test',
    description: 'test product description',
    stock: 13,
    title: 'vase',
    brand: 'dior',
    price: 98,
    thumbnail: '',
    attributes: [],
    cashback: {
      amount: 5,
      type: 'cash',
      units: 5,
    },
    discount: {
      amount: 15,
      units: 20,
    },
    hostCategories: ['fashion', 'clothes'],
    presentations: [],
    visibility: 'public',
  },
];
