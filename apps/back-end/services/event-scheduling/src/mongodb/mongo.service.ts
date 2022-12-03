import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import {
  MONGO_CLIENT_INJECTION_TOKEN,
  MONGO_MODULE_OPTIONS_TOKEN,
} from './const';
import { MongoModuleForRootOptions } from './types';

@Injectable()
export class MongoService {
  db: Db;
  constructor(
    @Inject(MONGO_CLIENT_INJECTION_TOKEN)
    client: MongoClient,
    @Inject(MONGO_MODULE_OPTIONS_TOKEN)
    opts: MongoModuleForRootOptions,
  ) {
    this.db = client.db(opts.dbName);
  }

  getAll(collName: string) {
    return this.db.collection(collName).find();
  }

  create(collName: string, data: any) {
    this.db.collection(collName).insertOne(data);
  }

  delete(collName: string, id: string) {
    this.db.collection(collName).deleteOne({
      $where: { _id: id },
    });
  }
}
