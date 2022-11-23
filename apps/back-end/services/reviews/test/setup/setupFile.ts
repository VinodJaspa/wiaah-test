import { PrismaClient } from '@prisma-client';
import { Client } from '@elastic/elasticsearch';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.detailedRatings.deleteMany();
  await prisma.productRating.deleteMany();
  await prisma.productReview.deleteMany();
  await prisma.ratingCategory.deleteMany();
  await prisma.serviceReview.deleteMany();
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
