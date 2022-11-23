import { MongoMemoryReplSet, MongoMemoryServer } from 'mongodb-memory-server';
import { config } from '../config/index';

export = async function globalSetup() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite

    const instance = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ storageEngine: 'wiredTiger' }],
    });

    const uri = instance.getUri('testDb');
    (global as any).__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = uri;
  } else {
    process.env.DATABASE_URL = `mongodb://${config.IP}:${config.Port}`;
  }
};
