import { config } from 'dotenv';
config();

async function clearDB() {}

beforeAll(async () => {
  await clearDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await clearDB();
});
