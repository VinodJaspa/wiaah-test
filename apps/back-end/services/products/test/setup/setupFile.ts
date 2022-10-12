import { PrismaClient } from '@prisma-client';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.shop.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productFilterGroup.deleteMany();
  await prisma.shippingRule.deleteMany();
  await prisma.shippingSettings.deleteMany();
}

const prisma = new PrismaService();
beforeAll(async () => {
  await clearDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await clearDB();
  prisma.$disconnect();
});
