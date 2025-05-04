import { execSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_DIR = '../apps/back-end/services';

const services = readdirSync(BASE_DIR);

for (const service of services) {
  const schemaPath = join(BASE_DIR, service, 'prisma', 'schema.prisma');
  if (existsSync(schemaPath)) {
    // eslint-disable-next-line no-undef
    console.log(`🛠  Generating Prisma Client for ${service}`);
    execSync(`npx prisma generate --schema=${schemaPath}`, { stdio: 'inherit' });
  }
}
