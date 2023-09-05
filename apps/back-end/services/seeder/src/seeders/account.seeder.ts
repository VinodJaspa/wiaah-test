import { Inject, Injectable } from '@nestjs/common';
import { accountType } from 'nest-utils';
import { Seeder } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
import { Db } from 'mongodb';

@Injectable()
export class AccountsSeeder implements Seeder {
  constructor(
    @Inject('wiaah-accounts')
    private readonly accountsClient: Db,
  ) {}

  async seed(): Promise<any> {
    await this.accountsClient.collection('Account').insertMany([
      {
        accountType: accountType.ADMIN,
        birthDate: new Date(),
        email: 'admin@wiaah.com',
        firstName: 'admin',
        lastName: 'admin',
        password: bcrypt.hashSync('admin', 12),
        lastActiveAt: new Date(),
        gender: 'male',
        verified: false,
        status: 'pending',
        idVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lang: 'en',
        currency: 'usd',
        phoneVerified: false,
        emailVerified: false,
      },
      {
        accountType: accountType.SELLER,
        birthDate: new Date(),
        email: 'seller@wiaah.com',
        firstName: 'seller',
        lastName: 'seller',
        password: bcrypt.hashSync('seller', 12),
        lastActiveAt: new Date(),
        gender: 'male',
        verified: false,
        status: 'pending',
        idVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lang: 'en',
        currency: 'usd',
        phoneVerified: false,
        emailVerified: false,
      },
      {
        accountType: accountType.BUYER,
        birthDate: new Date(),
        email: 'buyer@wiaah.com',
        firstName: 'buyer',
        lastName: 'buyer',
        password: bcrypt.hashSync('buyer', 12),
        lastActiveAt: new Date(),
        gender: 'male',
        verified: false,
        status: 'pending',
        idVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lang: 'en',
        currency: 'usd',
        phoneVerified: false,
        emailVerified: false,
      },
    ]);
  }

  async drop(): Promise<any> {
    (await this.accountsClient.collections()).forEach((v) => v.deleteMany());
  }
}
