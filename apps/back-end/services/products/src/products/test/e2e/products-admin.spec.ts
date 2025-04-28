import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient, ProdcutType, ProductStatus } from '@prisma-client';
import { GetFilteredProductsAdminInput } from '@products/dto';
import { ProductsAdminModule } from '@products/products-admin.module';
import { ObjectId } from 'mongodb';
import {
  AuthorizationDecodedUser,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
} from 'nest-utils';

describe('products admin', () => {
  let app: INestApplication;
  const prisma: PrismaClient = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsAdminModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  describe('should get filtered products', () => {
    beforeEach(async () => {
      await prisma.product.create({
        data: {
          brand: 'test',
          categoryId: new ObjectId().toHexString(),
          description: 'test desc',
          price: 25,
          sellerId: mockedUser.id,
          shopId: mockedUser.shopId,
          stock: 30,
          title: 'test1 title',
          type: 'goods',
          vat: 16,
          attributes: [{ name: 'test', values: ['test'] }],
        },
      });
      await prisma.product.create({
        data: {
          brand: 'test',
          categoryId: new ObjectId().toHexString(),
          description: 'test desc',
          price: 20,
          sellerId: secendMockedUser.id,
          shopId: secendMockedUser.shopId,
          stock: 30,
          title: 'test2 title',
          type: 'digital',
          vat: 16,
          attributes: [{ name: 'test', values: ['test'] }],
        },
      });
    });

    const getProductsQuery = `
    query get(
        $input:GetFilteredProductsAdminInput
    ){
        getAllProducts(
            args:$input
        ){
            
        }
    }`;

    it('title', async () => {
      const updateInput: GetFilteredProductsAdminInput = {
        title: 'test',
        pagination: {
          page: 1,
          take: 10,
        },
      };

      const res = await reqGql(getProductsQuery, updateInput, MockedAdminUser);

      expect(res.body.errors).not.toBeCalled();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.getAllProducts).toHaveLength(2);
    });

    it('price', async () => {
      const updateInput: GetFilteredProductsAdminInput = {
        price: 25,
        pagination: {
          page: 1,
          take: 10,
        },
      };

      const res = await reqGql(getProductsQuery, updateInput, MockedAdminUser);

      expect(res.body.errors).not.toBeCalled();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.getAllProducts).toHaveLength(2);
    });

    it('qty', async () => {
      const updateInput: GetFilteredProductsAdminInput = {
        price: 25,
        pagination: {
          page: 1,
          take: 10,
        },
      };

      const res = await reqGql(getProductsQuery, updateInput, MockedAdminUser);

      expect(res.body.errors).not.toBeCalled();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.getAllProducts).toHaveLength(1);
    });

    it('status', async () => {
      const updateInput: GetFilteredProductsAdminInput = {
        status: ProductStatus.active,
        pagination: {
          page: 1,
          take: 10,
        },
      };

      const res = await reqGql(getProductsQuery, updateInput, MockedAdminUser);

      expect(res.body.errors).not.toBeCalled();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.getAllProducts).toHaveLength(2);
    });
    it('type', async () => {
      const updateInput: GetFilteredProductsAdminInput = {
        type: ProdcutType.goods,
        pagination: {
          page: 1,
          take: 10,
        },
      };

      const res = await reqGql(getProductsQuery, updateInput, MockedAdminUser);

      expect(res.body.errors).not.toBeCalled();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.getAllProducts).toHaveLength(1);
    });
  });
});
