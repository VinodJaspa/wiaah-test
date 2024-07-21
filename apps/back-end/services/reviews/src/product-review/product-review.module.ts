import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ProductReviewCommandHanders } from './commands';
import { ProductReviewEventHandlers } from './events';
import { ProductRatingResolver } from './product-rating.resolver';
import { ProductReviewResolver } from './product-review.resolver';
import { ProductReviewsQueryHandlers } from './queries';
import { ProductRatingRepository, ProductReviewRepository } from './repository';
import { ProductReviewController } from './product-review.controller';
import { SellerProductsRatingResolver } from './seller-product-rating.resolver';
import { PrismaService } from 'src/Prisma.service';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.REVIEWS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.REVIEWS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.REVIEWS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    SellerProductsRatingResolver,
    ProductReviewResolver,
    ProductRatingResolver,
    ProductReviewRepository,
    ProductRatingRepository,
    ...ProductReviewEventHandlers,
    ...ProductReviewCommandHanders,
    ...ProductReviewsQueryHandlers,
    PrismaService,
  ],
  controllers: [ProductReviewController],
})
export class ProductReviewModule { }
