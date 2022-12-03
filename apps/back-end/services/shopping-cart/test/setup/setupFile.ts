import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

async function clearDB() {
  await prisma.cart.deleteMany();
  await prisma.bookedService.deleteMany();
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
