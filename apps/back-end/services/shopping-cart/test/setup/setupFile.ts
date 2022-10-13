import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

async function clearDB() {
  await prisma.cart.deleteMany();
}

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
