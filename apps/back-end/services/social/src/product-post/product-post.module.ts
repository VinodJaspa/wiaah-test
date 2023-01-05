import { Module } from '@nestjs/common';
import { ProductPostResolver } from './product-post.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductPostRepository } from './repository';
import { productPostCommandHandlers } from './commands';
// import { productPostEventHandlers } from './events';
import { productPostQueryHandlers } from './queries';
import { ProductPostController } from './product-post.controller';
import { kafkaModule } from '@kafkaModule';

@Module({
  imports: [CqrsModule, kafkaModule],
  providers: [
    ProductPostResolver,
    ProductPostRepository,
    ...productPostCommandHandlers,
    ...productPostQueryHandlers,
    // ...productPostEventHandlers,
  ],
  controllers: [ProductPostController],
})
export class ProductPostModule {}
