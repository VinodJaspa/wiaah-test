import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';

import {
  MONGO_CLIENT_INJECTION_TOKEN,
  MONGO_MODULE_OPTIONS_TOKEN,
} from './const';
import { MongoModuleForRootOptions } from './types';

@Module({})
@Global()
export class MongoModule {
  static forRoot(opts: MongoModuleForRootOptions): DynamicModule {
    return {
      module: MongoModule,
      providers: [
        {
          provide: MONGO_MODULE_OPTIONS_TOKEN,
          useValue: opts,
        },
        {
          provide: MONGO_CLIENT_INJECTION_TOKEN,
          useValue: new MongoClient(
            `mongodb+srv://${opts.username}:${opts.password}@cluster0.4voto.mongodb.net/?retryWrites=true&w=majority`,
            { serverApi: ServerApiVersion.v1 },
          ),
        },
      ],
    };
  }
}
