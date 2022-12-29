import { PrismaClient } from 'prismaClient';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.transaction.deleteMany();
  await prisma.balance.deleteMany();
  await prisma.billingAddressCollection.deleteMany();
  await prisma.invoiceRecord.deleteMany();
  await prisma.withdrawalRequest.deleteMany();
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
