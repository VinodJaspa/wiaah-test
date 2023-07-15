import { Inject, Injectable } from '@nestjs/common';
import { accountType } from 'nest-utils';
import { Seeder } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
import { Db } from 'mongodb';
import { DatabaseConnections } from '../seeder';

@Injectable()
export class AccountsSeeder implements Seeder {
  constructor(
    @Inject(DatabaseConnections.accounts)
    private readonly accountsClient: Db,
  ) {}

  async seed(): Promise<any> {
    await this.accountsClient.collection('Account').insertMany([
      {
        accountType: accountType.ADMIN,
        birthDate: new Date().toString(),
        email: 'admin@wiaah.com',
        firstName: 'admin',
        lastName: 'admin',
        password: bcrypt.hashSync('admin', 12),
      },
      {
        accountType: accountType.SELLER,
        birthDate: new Date().toString(),
        email: 'seller@wiaah.com',
        firstName: 'seller',
        lastName: 'seller',
        password: bcrypt.hashSync('seller', 12),
      },
      {
        accountType: accountType.BUYER,
        birthDate: new Date().toString(),
        email: 'buyer@wiaah.com',
        firstName: 'buyer',
        lastName: 'buyer',
        password: bcrypt.hashSync('buyer', 12),
      },
    ]);
  }

  async drop(): Promise<any> {
    (await this.accountsClient.collections()).forEach((v) => v.deleteMany());
  }
}
