import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ReviewSeeder implements Seeder {
  constructor(
    @Inject('wiaah-reviews')
    private readonly reviewsDb: Db,
  ) {}

  async seed(): Promise<any> {
    await this.reviewsDb.collection('ProductReview').insertMany([
      {
        sellerId: new ObjectId().toHexString(),
        productId: new ObjectId().toHexString(),
        reviewerId: new ObjectId().toHexString(),
        rate: 4,
        message: 'good product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  async drop(): Promise<any> {
    (await this.reviewsDb.collections()).forEach((v) => v.deleteMany());
  }
}
