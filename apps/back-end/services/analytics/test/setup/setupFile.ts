import { PrismaClient } from '@prisma-client';
import { config } from 'dotenv';
config();

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.activityScore.deleteMany();
  await prisma.userActivityStats.deleteMany();
  await prisma.usersInteractions.deleteMany();
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
