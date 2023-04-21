import { PrismaClient } from 'prismaClient';
import { Client } from '@elastic/elasticsearch';
import { config } from 'dotenv';
config();

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}

async function clearDB() {
  await prisma.hotelRoom.deleteMany();
  await prisma.hotelService.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.restaurantService.deleteMany();
  await prisma.restaurantEstablishmentType.deleteMany();
  await prisma.restaurantCuisinesType.deleteMany();
  await prisma.restaurnatSettingAndAmbiance.deleteMany();
  await prisma.serviceOwnerShip.deleteMany();
  await prisma.healthCenterDoctor.deleteMany();
  await prisma.healthCenterService.deleteMany();
  await prisma.healthCenterSpecialty.deleteMany();
  await prisma.beautyCenterService.deleteMany();
  await prisma.beautyCenterTreatmentCategory.deleteMany();
  await prisma.serviceWorkingSchedule.deleteMany();

  //   client.deleteByQuery({
  //     index: '*',
  //     query: {
  //       match_all: {},
  //     },
  //   });
}

// const client = new Client({
//   node: process.env.ELASTIC_HOST_TEST,
//   auth: {
//     username: process.env.ELASTIC_USERNAME_TEST,
//     password: process.env.ELASTIC_PASSWORD_TEST,
//   },
// });
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
