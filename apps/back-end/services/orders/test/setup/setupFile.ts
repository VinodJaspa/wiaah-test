import { PrismaClient } from '@prisma-client';
import { Client } from '@elastic/elasticsearch';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.order.deleteMany();
  await prisma.buyerOrdersCluster.deleteMany();
  await prisma.sellerOrdersCluster.deleteMany();
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
