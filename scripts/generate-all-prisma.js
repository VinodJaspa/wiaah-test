const { execSync } = require('child_process');
const { readdirSync, existsSync } = require('fs');
const { join } = require('path');

const BASE_DIR = '../apps/back-end/services';

const services = readdirSync(BASE_DIR);

for (const service of services) {
  const schemaPath = join(BASE_DIR, service, 'prisma', 'schema.prisma');
  if (existsSync(schemaPath)) {
    console.log(`🛠  Generating Prisma Client for ${service}`);
    execSync(`npx prisma generate --schema=${schemaPath}`, { stdio: 'inherit' });
  }
}
