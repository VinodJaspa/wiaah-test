import { PrismaClient } from 'prismaClient';

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.hotelRoom.deleteMany();
  await prisma.hotelService.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.serviceWorkingSchedule.deleteMany();
  await prisma.restaurantService.deleteMany();
  await prisma.restaurantEstablishmentType.deleteMany();
  await prisma.restaurantCuisinesType.deleteMany();
  await prisma.restaurnatSettingAndAmbiance.deleteMany();
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
